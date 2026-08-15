import React, { useEffect, useMemo, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useVizTokens, SPACING } from '@site/src/theme/vizTokens';
import VizCard from './primitives/VizCard';
import { Slider, PillSelect, VizButton, ControlRow } from './primitives/VizControls';
import { makeBlobs } from './lib/datasets';
import { knnPredict, buildTree, treePredict, kmeans } from './lib/decisionBoundary';

const DOMAIN = 1.3;
const GRID = 48;

const MODE_OPTIONS = [
  { value: 'knn', label: 'KNN' },
  { value: 'tree', label: 'Decision Tree' },
  { value: 'kmeans', label: 'K-Means' },
];

function seedPoints() {
  const { X, y } = makeBlobs(14, 3);
  return X.map(([x, y0], i) => ({ x, y: y0, label: y[i] }));
}

function DecisionBoundaryPlaygroundInner({ defaultMode = 'knn' }) {
  const t = useVizTokens();
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  const [mode, setMode] = useState(defaultMode);
  const [points, setPoints] = useState(seedPoints);
  const [currentClass, setCurrentClass] = useState(0);
  const [k, setK] = useState(3);
  const [maxDepth, setMaxDepth] = useState(3);
  const [kClusters, setKClusters] = useState(3);
  const [size, setSize] = useState(420);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((entries) => {
      setSize(Math.min(480, entries[0].contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tree = useMemo(() => {
    if (mode !== 'tree' || points.length === 0) return null;
    return buildTree(points, maxDepth);
  }, [mode, points, maxDepth]);

  const clusters = useMemo(() => {
    if (mode !== 'kmeans' || points.length === 0) return null;
    return kmeans(points, kClusters);
  }, [mode, points, kClusters]);

  const clusterColorAt = (x, y) => {
    if (!clusters || clusters.centroids.length === 0) return null;
    let best = 0;
    let bestD = Infinity;
    clusters.centroids.forEach((c, i) => {
      const d = (c.x - x) ** 2 + (c.y - y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };

  const classColors = [t.accentDanger, t.accentPrimary];
  const clusterColors = [t.accentPrimary, t.accentSecondary, t.accentWarn, t.accentDanger];

  const toPx = (x, y, w, h) => [((x + DOMAIN) / (2 * DOMAIN)) * w, ((DOMAIN - y) / (2 * DOMAIN)) * h];
  const toDomain = (px, py, w, h) => [(px / w) * (2 * DOMAIN) - DOMAIN, DOMAIN - (py / h) * (2 * DOMAIN)];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cell = w / GRID;
    if (points.length > 0) {
      for (let gx = 0; gx < GRID; gx++) {
        for (let gy = 0; gy < GRID; gy++) {
          const x = ((gx + 0.5) / GRID) * (2 * DOMAIN) - DOMAIN;
          const y = DOMAIN - ((gy + 0.5) / GRID) * (2 * DOMAIN);
          let color = null;
          if (mode === 'knn') {
            const label = knnPredict(points, k, x, y);
            color = label === null ? null : classColors[label];
          } else if (mode === 'tree') {
            const label = tree ? treePredict(tree, x, y) : null;
            color = label === null ? null : classColors[label];
          } else {
            const ci = clusterColorAt(x, y);
            color = ci === null ? null : clusterColors[ci % clusterColors.length];
          }
          if (color) {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.32;
            ctx.fillRect(gx * cell, gy * cell, cell + 1, cell + 1);
          }
        }
      }
    }
    ctx.globalAlpha = 1;

    points.forEach((p, i) => {
      const [px, py] = toPx(p.x, p.y, w, h);
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 2 * Math.PI);
      ctx.fillStyle = mode === 'kmeans' ? clusterColors[(clusters?.assignments[i] ?? 0) % clusterColors.length] : classColors[p.label];
      ctx.strokeStyle = t.background;
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    });

    if (mode === 'kmeans' && clusters) {
      clusters.centroids.forEach((c, i) => {
        const [px, py] = toPx(c.x, c.y, w, h);
        ctx.strokeStyle = clusterColors[i % clusterColors.length];
        ctx.lineWidth = 2.5;
        const s = 7;
        ctx.beginPath();
        ctx.moveTo(px - s, py - s);
        ctx.lineTo(px + s, py + s);
        ctx.moveTo(px + s, py - s);
        ctx.lineTo(px - s, py + s);
        ctx.stroke();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, mode, k, tree, clusters, size, t.mode]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const py = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const [x, y] = toDomain(px, py, canvas.width, canvas.height);
    setPoints((pts) => [...pts, { x, y, label: currentClass }]);
  };

  return (
    <VizCard
      eyebrow="Interactive"
      title="Decision Boundary Playground"
      footer="Real KNN, a real Gini-impurity decision tree, and real Lloyd's-algorithm k-means -- click the canvas to add points and watch the boundary recompute live."
    >
      <ControlRow>
        <PillSelect label="Algorithm" value={mode} onChange={setMode} options={MODE_OPTIONS} />
        {mode !== 'kmeans' && (
          <PillSelect
            label="Click adds class"
            value={currentClass}
            onChange={setCurrentClass}
            options={[
              { value: 0, label: 'A' },
              { value: 1, label: 'B' },
            ]}
          />
        )}
      </ControlRow>
      <ControlRow>
        {mode === 'knn' && (
          <div style={{ minWidth: 180 }}>
            <Slider label="k" value={k} onChange={setK} min={1} max={9} step={1} />
          </div>
        )}
        {mode === 'tree' && (
          <div style={{ minWidth: 180 }}>
            <Slider label="Max depth" value={maxDepth} onChange={setMaxDepth} min={1} max={6} step={1} />
          </div>
        )}
        {mode === 'kmeans' && (
          <div style={{ minWidth: 180 }}>
            <Slider label="Clusters (k)" value={kClusters} onChange={setKClusters} min={2} max={4} step={1} />
          </div>
        )}
        <VizButton variant="secondary" onClick={() => setPoints((pts) => pts.slice(0, -1))}>
          Undo Point
        </VizButton>
        <VizButton variant="secondary" onClick={() => setPoints(seedPoints())}>
          Reset Points
        </VizButton>
      </ControlRow>

      <div ref={wrapRef} style={{ width: '100%' }}>
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onClick={handleClick}
          style={{
            width: size,
            height: size,
            borderRadius: 12,
            border: `1px solid ${t.border}`,
            background: t.background,
            cursor: 'crosshair',
          }}
        />
        <div style={{ fontSize: 12, color: t.textMuted, marginTop: 6 }}>
          {points.length} points{mode === 'kmeans' ? '' : ` -- click to add class ${currentClass === 0 ? 'A' : 'B'}`}
        </div>
      </div>
    </VizCard>
  );
}

export default function DecisionBoundaryPlayground(props) {
  return (
    <BrowserOnly fallback={<VizCard title="Decision Boundary Playground">Loading…</VizCard>}>
      {() => <DecisionBoundaryPlaygroundInner {...props} />}
    </BrowserOnly>
  );
}
