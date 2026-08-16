import React, { useMemo } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useVizTokens, RADIUS, FONT_FAMILY } from '@site/src/theme/vizTokens';
import VizCard from './primitives/VizCard';
import { SECTION_META, SECTION_ORDER, timeEstimate } from '@site/src/data/sectionMeta';
import { useProgress } from '@site/src/contexts/ProgressContext';

// The 7 top-level groups from sidebars.js, laid out as a real dependency
// graph (not a flat list): Foundations feeds Models, which fans out into
// Agents & Applications and Systems & Infrastructure, both feeding Safety &
// Evaluation, then Research & Build, then Career.
const NODE_LAYOUT = [
  { key: '/docs/category/foundations', x: 200, y: 0 },
  { key: '/docs/category/models', x: 200, y: 140 },
  { key: '/docs/category/agents--applications', x: 0, y: 320 },
  { key: '/docs/category/systems--infrastructure', x: 400, y: 320 },
  { key: '/docs/category/safety--evaluation', x: 200, y: 500 },
  { key: '/docs/category/research--build', x: 200, y: 640 },
  { key: '/docs/category/career', x: 200, y: 780 },
];

const EDGES = [
  ['/docs/category/foundations', '/docs/category/models'],
  ['/docs/category/models', '/docs/category/agents--applications'],
  ['/docs/category/models', '/docs/category/systems--infrastructure'],
  ['/docs/category/agents--applications', '/docs/category/safety--evaluation'],
  ['/docs/category/systems--infrastructure', '/docs/category/safety--evaluation'],
  ['/docs/category/safety--evaluation', '/docs/category/research--build'],
  ['/docs/category/research--build', '/docs/category/career'],
];

function completionFor(key, understood) {
  const meta = SECTION_META[key];
  const done = Object.keys(understood).filter((permalink) =>
    meta.folders ? meta.folders.some((f) => permalink.includes(`/docs/${f}/`)) : meta.subsections.some((s) => permalink.includes(`/docs/${s.dir}/`)),
  ).length;
  return Math.min(1, done / meta.pageCount);
}

function NodeLabel({ meta, pct, t }) {
  return (
    <div style={{ textAlign: 'left', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 18 }}>{meta.icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: t.textPrimary, lineHeight: 1.2 }}>{meta.label}</span>
      </div>
      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 6 }}>{timeEstimate(meta.pageCount)}</div>
      <div style={{ height: 5, borderRadius: 3, background: t.border, overflow: 'hidden' }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', background: meta.color, transition: 'width 200ms ease' }} />
      </div>
    </div>
  );
}

function LearningPathMapInner() {
  const t = useVizTokens();
  const { understood } = useProgress();
  const baseUrl = useBaseUrl('/');

  const { nodes, edges } = useMemo(() => {
    const nodes = NODE_LAYOUT.map(({ key, x, y }) => {
      const meta = SECTION_META[key];
      const pct = completionFor(key, understood);
      return {
        id: key,
        position: { x, y },
        data: { label: <NodeLabel meta={meta} pct={pct} t={t} /> },
        style: {
          background: t.surface,
          border: `2px solid ${meta.color}`,
          borderRadius: RADIUS.md,
          fontFamily: FONT_FAMILY,
          padding: 12,
          width: 230,
          boxShadow: t.mode === 'dark' ? '0 4px 14px rgba(0,0,0,0.35)' : '0 4px 14px rgba(20,22,26,0.08)',
          cursor: 'pointer',
        },
      };
    });

    const edges = EDGES.map(([source, target]) => ({
      id: `${source}-${target}`,
      source,
      target,
      style: { stroke: t.edge, strokeWidth: 2 },
      animated: false,
    }));

    return { nodes, edges };
  }, [t, understood]);

  return (
    <VizCard
      eyebrow="Learning Path"
      title="Where You Are, and What Comes Next"
      footer="Each bar reflects your own progress (Mark as understood, tracked locally in your browser — no account). Click any section to go there."
    >
      <div style={{ width: '100%', height: 720, border: `1px solid ${t.border}`, borderRadius: RADIUS.md, overflow: 'hidden', background: t.background }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          onNodeClick={(_, node) => {
            window.location.href = `${baseUrl}${node.id.replace(/^\//, '')}`;
          }}
        >
          <Background color={t.border} gap={20} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14, fontSize: 13 }}>
        {SECTION_ORDER.map((key) => {
          const meta = SECTION_META[key];
          return (
            <Link key={key} to={key} style={{ color: meta.color, fontWeight: 600, textDecoration: 'none' }}>
              {meta.icon} {meta.label}
            </Link>
          );
        })}
      </div>
    </VizCard>
  );
}

export default function LearningPathMap(props) {
  return (
    <BrowserOnly fallback={<VizCard title="Learning Path">Loading…</VizCard>}>
      {() => <LearningPathMapInner {...props} />}
    </BrowserOnly>
  );
}
