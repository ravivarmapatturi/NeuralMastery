import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import { useVizTokens, SPACING, RADIUS, FONT_FAMILY } from '@site/src/theme/vizTokens';
import VizCard from './primitives/VizCard';
import { VizButton } from './primitives/VizControls';
import { TREE, RESULTS } from '@site/src/data/algorithmSelectorTree';

const ROOT_ICONS = {
  'Predict a number (regression)': '📈',
  'Predict a category (classification)': '🏷️',
  'Find groups in unlabeled data (clustering)': '🌀',
  'Reduce/compress the number of features': '📉',
};

function AlgorithmSelectorInner() {
  const t = useVizTokens();
  const [path, setPath] = useState([{ nodeId: 'root', choice: null }]);

  const current = path[path.length - 1];
  const node = TREE[current.nodeId];
  const trail = path.slice(1).map((p) => p.choice);

  const choose = (option) => {
    if (option.result) {
      setPath((p) => [...p, { nodeId: null, choice: option.label, result: option.result }]);
    } else {
      setPath((p) => [...p, { nodeId: option.next, choice: option.label }]);
    }
  };

  const goBack = () => setPath((p) => p.slice(0, -1));
  const reset = () => setPath([{ nodeId: 'root', choice: null }]);

  const result = current.result ? RESULTS[current.result] : null;

  return (
    <VizCard
      eyebrow="Interactive Decision Tool"
      title="Which Algorithm Should I Use?"
      footer="Answer a few questions about your problem; every recommendation links to this site's own deep-dive page for that algorithm."
    >
      {trail.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: SPACING.sm }}>
          {trail.map((label, i) => (
            <span
              key={i}
              style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 999,
                background: t.surfaceAlt,
                border: `1px solid ${t.border}`,
                color: t.textSecondary,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {!result && (
        <>
          <div style={{ fontSize: 19, fontWeight: 700, color: t.textPrimary, marginBottom: SPACING.sm }}>{node.question}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {node.options.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => choose(opt)}
                style={{
                  textAlign: 'left',
                  padding: '14px 16px',
                  borderRadius: RADIUS.md,
                  border: `1px solid ${t.border}`,
                  background: t.surfaceAlt,
                  color: t.textPrimary,
                  fontSize: 15,
                  fontFamily: FONT_FAMILY,
                  cursor: 'pointer',
                  transition: 'all 120ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accentPrimary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; }}
              >
                {ROOT_ICONS[opt.label] && <span style={{ fontSize: 20 }}>{ROOT_ICONS[opt.label]}</span>}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {result && (
        <div
          style={{
            border: `2px solid ${t.accentPrimary}`,
            borderRadius: RADIUS.md,
            padding: 20,
            background: t.surfaceAlt,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.accentPrimary, marginBottom: 6 }}>
            Recommendation
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.textPrimary, marginBottom: 8 }}>{result.label}</div>
          <p style={{ fontSize: 14.5, color: t.textSecondary, marginBottom: 16 }}>{result.reason}</p>
          <Link
            to={result.href}
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: RADIUS.sm,
              border: `1px solid ${t.accentPrimary}`,
              background: t.accentPrimary,
              color: t.background,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Read the full guide →
          </Link>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: SPACING.md }}>
        {path.length > 1 && (
          <VizButton variant="secondary" onClick={goBack}>
            ← Back
          </VizButton>
        )}
        {path.length > 1 && (
          <VizButton variant="secondary" onClick={reset}>
            Start Over
          </VizButton>
        )}
      </div>
    </VizCard>
  );
}

export default function AlgorithmSelector(props) {
  return (
    <BrowserOnly fallback={<VizCard title="Which Algorithm Should I Use?">Loading…</VizCard>}>
      {() => <AlgorithmSelectorInner {...props} />}
    </BrowserOnly>
  );
}
