import React, { useMemo } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useVizTokens, RADIUS, FONT_FAMILY } from '@site/src/theme/vizTokens';
import VizCard from './primitives/VizCard';
import { SECTION_META, timeEstimate } from '@site/src/data/sectionMeta';
import { useProgress } from '@site/src/contexts/ProgressContext';

// The 7 top-level groups from sidebars.js, laid out as a real dependency
// graph (not a flat list): Foundations feeds Models, which fans out into
// Agents & Applications and Systems & Infrastructure, both feeding Safety &
// Evaluation, then Research & Build, then Career.
const NODE_LAYOUT = [
  { key: '/docs/category/foundations', x: 40, y: 0 },
  { key: '/docs/category/models', x: 40, y: 110 },
  { key: '/docs/category/agents--applications', x: -140, y: 240 },
  { key: '/docs/category/systems--infrastructure', x: 220, y: 240 },
  { key: '/docs/category/safety--evaluation', x: 40, y: 370 },
  { key: '/docs/category/research--build', x: 40, y: 480 },
  { key: '/docs/category/career', x: 40, y: 590 },
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
    meta.folders.some((f) => permalink.includes(`/docs/${f}/`)),
  ).length;
  return Math.min(1, done / meta.pageCount);
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
        data: { label: `${meta.label}\n${Math.round(pct * 100)}% complete` },
        style: {
          background: pct > 0 ? `linear-gradient(90deg, ${t.accentPrimary} ${pct * 100}%, ${t.surface} ${pct * 100}%)` : t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: RADIUS.sm,
          color: t.textPrimary,
          fontFamily: FONT_FAMILY,
          fontSize: 12,
          fontWeight: 600,
          padding: 10,
          width: 190,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          cursor: 'pointer',
        },
      };
    });

    const edges = EDGES.map(([source, target]) => ({
      id: `${source}-${target}`,
      source,
      target,
      style: { stroke: t.edge, strokeWidth: 1.5 },
    }));

    return { nodes, edges };
  }, [t, understood]);

  return (
    <VizCard
      eyebrow="Learning Path"
      title="Where You Are, and What Comes Next"
      footer="Node fill reflects your own progress (Mark as understood, tracked locally in your browser). Click any section to go there."
    >
      <div style={{ width: '100%', height: 620, border: `1px solid ${t.border}`, borderRadius: RADIUS.md, overflow: 'hidden' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          onNodeClick={(_, node) => {
            window.location.href = `${baseUrl}${node.id.replace(/^\//, '')}`;
          }}
        >
          <Background color={t.border} gap={16} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12, fontSize: 13 }}>
        {NODE_LAYOUT.map(({ key }) => {
          const meta = SECTION_META[key];
          return (
            <Link key={key} to={key} style={{ color: t.accentSecondary }}>
              {meta.label} ({timeEstimate(meta.pageCount)})
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
