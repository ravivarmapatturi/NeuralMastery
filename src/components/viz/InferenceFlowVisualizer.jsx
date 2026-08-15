import React, { useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useVizTokens, SPACING, RADIUS, FONT_FAMILY } from '@site/src/theme/vizTokens';
import VizCard from './primitives/VizCard';
import { Slider } from './primitives/VizControls';
import { CANDIDATES, computeDistribution } from './lib/sampling';

const STAGE_INFO = {
  text: 'The raw input string -- what the model actually starts from.',
  tokenizer: 'Splits text into subword tokens (BPE / WordPiece / SentencePiece) -- the practical middle ground between whole-word vocabularies (too large, can’t handle unseen words) and character vocabularies (too long, expensive under attention’s O(n²) cost).',
  tokenids: 'Each subword token is looked up as an integer ID in the model’s fixed vocabulary.',
  embeddings: 'A learned lookup table maps each token ID to a vector -- these start random and, through training, come to encode meaning (semantically related tokens end up with similar vectors).',
  posenc: 'Attention has no inherent sense of order, so a positional signal (RoPE / ALiBi) is added so the model knows which token came first, second, etc.',
  qkv: 'Each token’s vector is projected into Query, Key, and Value vectors -- what attention actually operates on. GQA/MQA/MLA variants change how many K/V projections are shared across heads, trading quality for a smaller KV cache.',
  attention: 'Every token’s Query is compared against every other token’s Key to produce attention weights, which then combine the Value vectors into a new representation for each token.',
  resid1: 'The attention output is added back to its input (a residual connection, so gradients and information can skip the block) and normalized (RMSNorm) for training stability.',
  mlp: 'A dense feed-forward layer (or, in a Mixture-of-Experts model, a router picking a small subset of expert sub-networks) processes each token’s representation independently.',
  resid2: 'A second residual-add-and-normalize step, closing out one Transformer block. This whole block repeats N times -- the loop-back arrow below.',
  lmhead: 'A final linear projection maps the last block’s output back up to vocabulary size -- one score per possible next token.',
  logits: 'The raw, unnormalized scores produced by the LM head -- higher means the model thinks that token is more likely to come next.',
  softmax: 'Converts logits into a valid probability distribution (all values between 0 and 1, summing to 1) via exponentiation and normalization.',
  sampling: 'Turns the probability distribution into one actual next token -- temperature, top-k, and top-p all shape exactly how. Try the playground below.',
  token: 'The chosen next token is appended to the sequence and fed back in as input for generating the token after it -- autoregressive generation, one token at a time.',
};

const NODE_ORDER = [
  ['text', 'Text'],
  ['tokenizer', 'Tokenizer'],
  ['tokenids', 'Token IDs'],
  ['embeddings', 'Embeddings'],
  ['posenc', '+ Positional Encoding'],
  ['qkv', 'QKV Projections'],
  ['attention', 'Self-Attention'],
  ['resid1', 'Residual + RMSNorm'],
  ['mlp', 'MLP / MoE'],
  ['resid2', 'Residual + RMSNorm'],
  ['lmhead', 'LM Head'],
  ['logits', 'Logits'],
  ['softmax', 'Softmax'],
  ['sampling', 'Sampling'],
  ['token', 'Token'],
];

function buildFlow(t, selected) {
  const nodes = NODE_ORDER.map(([id, label], i) => {
    const active = id === selected;
    const inBlock = ['qkv', 'attention', 'resid1', 'mlp', 'resid2'].includes(id);
    return {
      id,
      position: { x: inBlock ? 40 : 0, y: i * 58 },
      data: { label },
      style: {
        background: active ? t.accentPrimary : t.surface,
        color: active ? t.background : t.textPrimary,
        border: `1px solid ${active ? t.accentPrimary : inBlock ? t.accentSecondary : t.border}`,
        borderRadius: RADIUS.sm,
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        padding: 8,
        width: 168,
        textAlign: 'center',
      },
    };
  });

  const edges = [];
  for (let i = 0; i < NODE_ORDER.length - 1; i++) {
    edges.push({
      id: `e-${i}`,
      source: NODE_ORDER[i][0],
      target: NODE_ORDER[i + 1][0],
      style: { stroke: t.edge, strokeWidth: 1.5 },
    });
  }
  edges.push({
    id: 'e-loop-block',
    source: 'resid2',
    target: 'qkv',
    label: '× N layers',
    labelStyle: { fill: t.textMuted, fontSize: 10 },
    style: { stroke: t.accentSecondary, strokeWidth: 1.5, strokeDasharray: '4 3' },
    type: 'smoothstep',
  });
  edges.push({
    id: 'e-loop-token',
    source: 'token',
    target: 'embeddings',
    label: 'autoregressive feedback',
    labelStyle: { fill: t.textMuted, fontSize: 10 },
    style: { stroke: t.accentWarn, strokeWidth: 1.5, strokeDasharray: '4 3' },
    type: 'smoothstep',
    animated: true,
  });

  return { nodes, edges };
}

function SamplingBar({ label, prob, kept, t }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: kept ? t.textPrimary : t.textMuted, marginBottom: 2 }}>
        <span>{label}{!kept && ' (cut)'}</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{(prob * 100).toFixed(1)}%</span>
      </div>
      <div style={{ height: 8, background: t.surfaceAlt, borderRadius: RADIUS.sm, overflow: 'hidden' }}>
        <div
          style={{
            width: `${Math.min(prob * 100, 100)}%`,
            height: '100%',
            background: kept ? t.accentPrimary : t.border,
            transition: 'width 150ms ease',
          }}
        />
      </div>
    </div>
  );
}

function InferenceFlowVisualizerInner() {
  const t = useVizTokens();
  const [selected, setSelected] = useState('sampling');
  const [temperature, setTemperature] = useState(0.8);
  const [topK, setTopK] = useState(4);
  const [topP, setTopP] = useState(0.9);

  const { nodes, edges } = useMemo(() => buildFlow(t, selected), [t, selected]);
  const distribution = useMemo(() => computeDistribution(temperature, topK, topP), [temperature, topK, topP]);

  return (
    <VizCard
      eyebrow="Interactive"
      title="LLM Inference Flow Visualizer"
      footer="Click any stage of the pipeline for what it does, and use the sampling playground to see how temperature / top-k / top-p actually reshape a probability distribution -- real softmax and truncation math over a small fixed candidate set."
    >
      <div style={{ display: 'flex', gap: SPACING.md, flexWrap: 'wrap' }}>
        <div style={{ width: '100%', maxWidth: 300, height: 560, border: `1px solid ${t.border}`, borderRadius: RADIUS.md, overflow: 'hidden' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            proOptions={{ hideAttribution: true }}
            onNodeClick={(_, node) => setSelected(node.id)}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
          >
            <Background color={t.border} gap={16} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        <div style={{ flex: 1, minWidth: 260 }}>
          <div
            style={{
              fontSize: 13,
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`,
              borderRadius: RADIUS.sm,
              padding: 10,
              marginBottom: SPACING.sm,
            }}
          >
            <strong style={{ color: t.textPrimary }}>{NODE_ORDER.find(([id]) => id === selected)?.[1]}:</strong>{' '}
            <span style={{ color: t.textSecondary }}>{STAGE_INFO[selected]}</span>
          </div>

          <div style={{ fontSize: 13, color: t.textPrimary, fontWeight: 700, marginBottom: 6 }}>
            Sampling playground
          </div>
          <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 10, fontStyle: 'italic' }}>
            "the cat sat on the ___" -- next-token candidates and their logits
          </div>

          <Slider label="Temperature" value={temperature} onChange={setTemperature} min={0.1} max={2} step={0.1} format={(v) => v.toFixed(1)} />
          <Slider label="Top-k" value={topK} onChange={setTopK} min={1} max={CANDIDATES.length} step={1} />
          <Slider label="Top-p" value={topP} onChange={setTopP} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} />

          <div style={{ marginTop: SPACING.sm }}>
            {distribution.map((c) => (
              <SamplingBar key={c.token} label={c.token} prob={c.finalProb} kept={c.keptByTopK && c.keptByTopP} t={t} />
            ))}
          </div>
        </div>
      </div>
    </VizCard>
  );
}

export default function InferenceFlowVisualizer(props) {
  return (
    <BrowserOnly fallback={<VizCard title="LLM Inference Flow Visualizer">Loading…</VizCard>}>
      {() => <InferenceFlowVisualizerInner {...props} />}
    </BrowserOnly>
  );
}
