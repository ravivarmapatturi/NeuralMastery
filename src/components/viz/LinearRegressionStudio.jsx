import React, { useEffect, useMemo, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { scaleLinear } from 'd3-scale';
import { useVizTokens, SPACING, RADIUS, FONT_FAMILY } from '@site/src/theme/vizTokens';
import VizCard from './primitives/VizCard';
import VizCanvas from './primitives/VizCanvas';
import { Slider, PillSelect, VizButton, ControlRow } from './primitives/VizControls';
import { X_DOMAIN, Y_DOMAIN, W_DOMAIN, B_DOMAIN, OUTLIER_POINT, generateData, computeStats, gradientStep } from './lib/linreg';

const MODE_OPTIONS = [
  { value: 'fit', label: 'Fit It Yourself' },
  { value: 'gd', label: 'Gradient Descent Lab' },
];

function hexToRgb(hex) {
  const v = hex.replace('#', '');
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function blendColor(c0, c1, t) {
  const [r0, g0, b0] = c0;
  const [r1, g1, b1] = c1;
  return `rgb(${lerp(r0, r1, t) | 0}, ${lerp(g0, g1, t) | 0}, ${lerp(b0, b1, t) | 0})`;
}

/** Scatter + fitted line + residuals, shared between both modes. */
function DataSpacePanel({ points, w, b, t }) {
  return (
    <VizCanvas aspect={16 / 10} minHeight={260} maxHeight={340}>
      {({ width, height }) => {
        const margin = 30;
        const xScale = scaleLinear().domain(X_DOMAIN).range([margin, width - margin]);
        const yScale = scaleLinear().domain(Y_DOMAIN).range([height - margin, margin]);
        const lineX0 = X_DOMAIN[0];
        const lineX1 = X_DOMAIN[1];

        return (
          <svg width={width} height={height} style={{ display: 'block' }}>
            <rect x={0} y={0} width={width} height={height} fill={t.background} />
            {points.map((p, i) => {
              const pred = w * p.x + b;
              const isOutlier = p === OUTLIER_POINT;
              return (
                <line
                  key={`r${i}`}
                  x1={xScale(p.x)}
                  y1={yScale(p.y)}
                  x2={xScale(p.x)}
                  y2={yScale(pred)}
                  stroke={isOutlier ? t.accentDanger : t.accentWarn}
                  strokeWidth={1.5}
                  opacity={0.6}
                  style={{ transition: 'y1 150ms ease, y2 150ms ease' }}
                />
              );
            })}
            <line
              x1={xScale(lineX0)}
              y1={yScale(w * lineX0 + b)}
              x2={xScale(lineX1)}
              y2={yScale(w * lineX1 + b)}
              stroke={t.accentSecondary}
              strokeWidth={2.5}
              style={{ transition: 'y1 150ms ease, y2 150ms ease' }}
            />
            {points.map((p, i) => (
              <circle
                key={`p${i}`}
                cx={xScale(p.x)}
                cy={yScale(p.y)}
                r={p === OUTLIER_POINT ? 6 : 4.5}
                fill={p === OUTLIER_POINT ? t.accentDanger : t.accentPrimary}
                stroke={t.background}
                strokeWidth={1.5}
              />
            ))}
          </svg>
        );
      }}
    </VizCanvas>
  );
}

/** MSE(w, b) landscape over the real dataset, with the GD path drawn on top. */
function LossLandscapePanel({ points, path, t }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [size, setSize] = useState(340);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((entries) => setSize(Math.min(420, entries[0].contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const GRID = 36;

    const wScale = scaleLinear().domain(W_DOMAIN).range([0, w]);
    const bScale = scaleLinear().domain(B_DOMAIN).range([h, 0]);
    const wInv = scaleLinear().domain([0, w]).range(W_DOMAIN);
    const bInv = scaleLinear().domain([0, h]).range(B_DOMAIN);

    const costs = [];
    let maxCost = 0;
    for (let gx = 0; gx < GRID; gx++) {
      const row = [];
      for (let gy = 0; gy < GRID; gy++) {
        const wv = wInv((gx + 0.5) * (w / GRID));
        const bv = bInv((gy + 0.5) * (h / GRID));
        const { mse } = computeStats(points, wv, bv);
        row.push(mse);
        if (mse > maxCost) maxCost = mse;
      }
      costs.push(row);
    }
    // Compress dynamic range with sqrt so the basin near the minimum stays visible.
    const norm = Math.sqrt(maxCost) || 1;

    const low = hexToRgb(t.accentPrimary);
    const high = hexToRgb(t.accentDanger);
    const cell = w / GRID;
    for (let gx = 0; gx < GRID; gx++) {
      for (let gy = 0; gy < GRID; gy++) {
        const tNorm = Math.min(1, Math.sqrt(costs[gx][gy]) / norm);
        ctx.fillStyle = blendColor(low, high, tNorm);
        ctx.globalAlpha = 0.55;
        ctx.fillRect(gx * cell, gy * cell, cell + 1, cell + 1);
      }
    }
    ctx.globalAlpha = 1;

    if (path.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = t.textPrimary;
      ctx.lineWidth = 2;
      path.forEach((s, i) => {
        const px = wScale(s.w);
        const py = bScale(s.b);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }
    const last = path[path.length - 1];
    if (last && isFinite(last.w) && isFinite(last.b)) {
      ctx.beginPath();
      ctx.arc(wScale(last.w), bScale(last.b), 5, 0, 2 * Math.PI);
      ctx.fillStyle = t.textPrimary;
      ctx.fill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, path, size, t.mode]);

  return (
    <div ref={wrapRef} style={{ width: '100%' }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size * 0.68}
        style={{ width: '100%', height: size * 0.68, borderRadius: RADIUS.md, border: `1px solid ${t.border}`, display: 'block' }}
      />
      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>
        MSE surface over real (w, b) -- x-axis w [{W_DOMAIN[0]}, {W_DOMAIN[1]}], y-axis b [{B_DOMAIN[0]}, {B_DOMAIN[1]}], green = low cost, red = high cost.
      </div>
    </div>
  );
}

function LinearRegressionStudioInner() {
  const t = useVizTokens();
  const [mode, setMode] = useState('fit');
  const [seed, setSeed] = useState(3);
  const [noise, setNoise] = useState(6);
  const [outlierOn, setOutlierOn] = useState(false);

  const basePoints = useMemo(() => generateData(16, noise, seed), [noise, seed]);
  const points = useMemo(() => (outlierOn ? [...basePoints, OUTLIER_POINT] : basePoints), [basePoints, outlierOn]);

  // --- Fit It Yourself state ---
  const [w, setW] = useState(3);
  const [b, setB] = useState(45);
  const fitStats = useMemo(() => computeStats(points, w, b), [points, w, b]);

  // --- Gradient Descent Lab state ---
  const [lr, setLr] = useState(0.012);
  const [path, setPath] = useState([{ w: 0, b: 0, dw: 0, db: 0 }]);
  const [playing, setPlaying] = useState(false);
  const [diverged, setDiverged] = useState(false);
  const stateRef = useRef({ w: 0, b: 0 });

  const resetGD = () => {
    setPlaying(false);
    setDiverged(false);
    stateRef.current = { w: 0, b: 0 };
    setPath([{ w: 0, b: 0, dw: 0, db: 0 }]);
  };

  useEffect(() => {
    resetGD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const stepGD = (times = 1) => {
    let cur = stateRef.current;
    let last = null;
    for (let i = 0; i < times; i++) {
      const next = gradientStep(points, cur.w, cur.b, lr);
      if (!isFinite(next.w) || !isFinite(next.b) || Math.abs(next.w) > 1e6 || Math.abs(next.b) > 1e6) {
        setDiverged(true);
        setPlaying(false);
        return;
      }
      cur = { w: next.w, b: next.b };
      last = next;
    }
    stateRef.current = cur;
    setPath((p) => (p.length > 600 ? p : [...p, last]));
  };

  useEffect(() => {
    if (!playing) return undefined;
    // Multiple real gradient-descent steps per animation tick -- each one is
    // the exact same update rule the manual Step button uses, just fast-
    // forwarded a few steps per frame so convergence is watchable in real
    // time on a real (not synthetic) dataset instead of taking minutes.
    const id = setInterval(() => stepGD(4), 80);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, lr, points]);

  const gdLast = path[path.length - 1];
  const gdStats = computeStats(points, gdLast.w, gdLast.b);

  return (
    <VizCard
      eyebrow="Interactive"
      title="Linear Regression Studio"
      footer="A real dataset (noisy study-hours-vs-exam-score), real MSE, and real batch gradient descent -- the exact formulas from Sections 2-6 above, running live as you drag, play, and step."
    >
      <ControlRow>
        <PillSelect label="Mode" value={mode} onChange={setMode} options={MODE_OPTIONS} />
        <div style={{ minWidth: 160 }}>
          <Slider label="Noise" value={noise} onChange={setNoise} min={0} max={18} step={1} />
        </div>
        <PillSelect
          label="Outlier"
          value={outlierOn}
          onChange={setOutlierOn}
          options={[
            { value: false, label: 'Off' },
            { value: true, label: 'On' },
          ]}
        />
        <VizButton variant="secondary" onClick={() => setSeed((s) => s + 1)}>
          New Dataset
        </VizButton>
      </ControlRow>

      {mode === 'fit' && (
        <>
          <ControlRow>
            <div style={{ minWidth: 220 }}>
              <Slider label="w (slope)" value={w} onChange={setW} min={W_DOMAIN[0]} max={W_DOMAIN[1]} step={0.1} format={(v) => v.toFixed(1)} />
            </div>
            <div style={{ minWidth: 220 }}>
              <Slider label="b (intercept)" value={b} onChange={setB} min={B_DOMAIN[0]} max={B_DOMAIN[1]} step={0.5} format={(v) => v.toFixed(1)} />
            </div>
          </ControlRow>
          <DataSpacePanel points={points} w={w} b={b} t={t} />
          <div style={{ display: 'flex', gap: SPACING.md, fontSize: 14, marginTop: 8 }}>
            <span style={{ fontWeight: 700, color: t.textPrimary }}>MSE {fitStats.mse.toFixed(2)}</span>
            <span style={{ color: t.textSecondary }}>ŷ = {w.toFixed(1)}x + {b.toFixed(1)}</span>
            {outlierOn && <span style={{ color: t.accentDanger }}>outlier included -- watch MSE jump</span>}
          </div>
        </>
      )}

      {mode === 'gd' && (
        <>
          <ControlRow>
            <div style={{ minWidth: 220 }}>
              <Slider label="Learning rate" value={lr} onChange={setLr} min={0.0005} max={0.03} step={0.0005} format={(v) => v.toFixed(4)} />
            </div>
            <VizButton onClick={() => setPlaying((p) => !p)} disabled={diverged}>
              {playing ? 'Pause' : 'Play'}
            </VizButton>
            <VizButton variant="secondary" onClick={() => stepGD(1)} disabled={diverged}>
              Step
            </VizButton>
            <VizButton variant="secondary" onClick={resetGD}>
              Reset
            </VizButton>
          </ControlRow>

          {diverged && (
            <div style={{ color: t.accentDanger, fontSize: 13, marginBottom: 8, fontWeight: 600 }}>
              Diverged -- the learning rate is too large and the steps overshot the minimum. Reset and try a smaller value.
            </div>
          )}

          <div style={{ display: 'flex', gap: SPACING.md, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px', minWidth: 260 }}>
              <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>Data space</div>
              <DataSpacePanel points={points} w={diverged ? 0 : gdLast.w} b={diverged ? 0 : gdLast.b} t={t} />
            </div>
            <div style={{ flex: '1 1 300px', minWidth: 260 }}>
              <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>Loss landscape</div>
              <LossLandscapePanel points={points} path={path} t={t} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: SPACING.md, fontSize: 14, margin: '8px 0' }}>
            <span>Step {path.length - 1}</span>
            <span style={{ fontWeight: 700, color: t.textPrimary }}>MSE {isFinite(gdStats.mse) ? gdStats.mse.toFixed(2) : '—'}</span>
            <span style={{ color: t.textSecondary }}>w = {gdLast.w.toFixed(3)}, b = {gdLast.b.toFixed(3)}</span>
          </div>

          <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>Step log -- watch the algorithm think</div>
          <div style={{ maxHeight: 140, overflowY: 'auto', fontFamily: 'monospace', fontSize: 11.5 }}>
            {path.slice(-30).map((s, i) => {
              const stepNum = path.length - Math.min(30, path.length) + i;
              return (
                <div key={stepNum} style={{ color: t.textSecondary, padding: '2px 0', borderBottom: `1px solid ${t.border}` }}>
                  step {stepNum}: w={s.w.toFixed(3)} b={s.b.toFixed(3)} dw={s.dw.toFixed(2)} db={s.db.toFixed(2)}
                </div>
              );
            })}
          </div>
        </>
      )}
    </VizCard>
  );
}

export default function LinearRegressionStudio(props) {
  return (
    <BrowserOnly fallback={<VizCard title="Linear Regression Studio">Loading…</VizCard>}>
      {() => <LinearRegressionStudioInner {...props} />}
    </BrowserOnly>
  );
}
