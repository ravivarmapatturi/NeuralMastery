import React, { useEffect, useMemo, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { scaleLinear } from 'd3-scale';
import { useVizTokens, SPACING, RADIUS, FONT_FAMILY } from '@site/src/theme/vizTokens';
import VizCard from './primitives/VizCard';
import VizCanvas from './primitives/VizCanvas';
import { Slider, PillSelect, VizButton, ControlRow } from './primitives/VizControls';
import { X_DOMAIN, W_DOMAIN, B_DOMAIN, sigmoid, generateData, statsFor, gradientStep } from './lib/logreg';

const MODE_OPTIONS = [
  { value: 'fit', label: 'Fit It Yourself' },
  { value: 'gd', label: 'Gradient Descent Lab' },
];
const LOSS_OPTIONS = [
  { value: 'ce', label: 'Cross-Entropy' },
  { value: 'mse', label: 'MSE (naive)' },
];

const BAD_START = { w: -1.5, b: 8 };

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

/** Points at y=0/1, the real sigmoid curve at (w, b), and the decision boundary. */
function SigmoidPanel({ points, w, b, t }) {
  return (
    <VizCanvas aspect={16 / 10} minHeight={260} maxHeight={340}>
      {({ width, height }) => {
        const margin = 30;
        const xScale = scaleLinear().domain(X_DOMAIN).range([margin, width - margin]);
        const yScale = scaleLinear().domain([0, 1]).range([height - margin, margin]);

        const N = 60;
        const curvePts = [];
        for (let i = 0; i <= N; i++) {
          const x = X_DOMAIN[0] + (i / N) * (X_DOMAIN[1] - X_DOMAIN[0]);
          curvePts.push(`${xScale(x)},${yScale(sigmoid(w * x + b))}`);
        }

        const boundaryX = w !== 0 ? -b / w : null;
        const boundaryInRange = boundaryX !== null && boundaryX >= X_DOMAIN[0] && boundaryX <= X_DOMAIN[1];

        return (
          <svg width={width} height={height} style={{ display: 'block' }}>
            <rect x={0} y={0} width={width} height={height} fill={t.background} />
            <line x1={margin} y1={yScale(0.5)} x2={width - margin} y2={yScale(0.5)} stroke={t.border} strokeWidth={1} strokeDasharray="3 3" />
            {boundaryInRange && (
              <line x1={xScale(boundaryX)} y1={margin} x2={xScale(boundaryX)} y2={height - margin} stroke={t.accentWarn} strokeWidth={1.5} strokeDasharray="4 3" />
            )}
            <polyline points={curvePts.join(' ')} fill="none" stroke={t.accentSecondary} strokeWidth={2.5} />
            {points.map((p, i) => {
              const phat = sigmoid(w * p.x + b);
              const pred = phat >= 0.5 ? 1 : 0;
              const correct = pred === p.label;
              return (
                <circle
                  key={i}
                  cx={xScale(p.x)}
                  cy={yScale(p.label)}
                  r={4.5}
                  fill={correct ? t.accentPrimary : t.accentDanger}
                  stroke={t.background}
                  strokeWidth={1.5}
                  opacity={0.9}
                />
              );
            })}
          </svg>
        );
      }}
    </VizCanvas>
  );
}

/** loss(w, b) landscape for the selected loss function, with the GD path drawn on top. */
function LossLandscapePanel({ points, path, lossType, t }) {
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
        const { loss } = statsFor(lossType, points, wv, bv);
        row.push(loss);
        if (loss > maxCost) maxCost = loss;
      }
      costs.push(row);
    }
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
    if (last) {
      ctx.beginPath();
      ctx.arc(wScale(last.w), bScale(last.b), 5, 0, 2 * Math.PI);
      ctx.fillStyle = t.textPrimary;
      ctx.fill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, path, lossType, size, t.mode]);

  return (
    <div ref={wrapRef} style={{ width: '100%' }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size * 0.68}
        style={{ width: '100%', height: size * 0.68, borderRadius: RADIUS.md, border: `1px solid ${t.border}`, display: 'block' }}
      />
      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>
        {lossType === 'mse' ? 'MSE-on-sigmoid' : 'Cross-entropy'} loss over real (w, b) -- green = low cost, red = high cost.
      </div>
    </div>
  );
}

function LogisticRegressionStudioInner() {
  const t = useVizTokens();
  const [mode, setMode] = useState('fit');
  const [seed, setSeed] = useState(3);
  const [noise, setNoise] = useState(4);

  const points = useMemo(() => generateData(24, noise, seed), [noise, seed]);

  // --- Fit It Yourself state ---
  const [w, setW] = useState(0.3);
  const [b, setB] = useState(-1);
  const fitStats = useMemo(() => statsFor('ce', points, w, b), [points, w, b]);

  // --- Gradient Descent Lab state ---
  const [lossType, setLossType] = useState('ce');
  const [lr, setLr] = useState(0.05);
  const [path, setPath] = useState([{ ...BAD_START, dw: 0, db: 0 }]);
  const [playing, setPlaying] = useState(false);
  const stateRef = useRef({ ...BAD_START });

  const resetGD = () => {
    setPlaying(false);
    stateRef.current = { ...BAD_START };
    setPath([{ ...BAD_START, dw: 0, db: 0 }]);
  };

  useEffect(() => {
    resetGD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, lossType]);

  const stepGD = (times = 1) => {
    let cur = stateRef.current;
    let last = null;
    for (let i = 0; i < times; i++) {
      const next = gradientStep(lossType, points, cur.w, cur.b, lr);
      cur = { w: next.w, b: next.b };
      last = next;
    }
    stateRef.current = cur;
    setPath((p) => (p.length > 600 ? p : [...p, last]));
  };

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => stepGD(4), 80);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, lr, points, lossType]);

  const gdLast = path[path.length - 1];
  const gdStats = statsFor(lossType, points, gdLast.w, gdLast.b);

  return (
    <VizCard
      eyebrow="Interactive"
      title="Logistic Regression Studio"
      footer="A real study-hours-vs-pass/fail dataset, a real sigmoid curve, real cross-entropy (and its non-convex MSE-on-sigmoid alternative), and real batch gradient descent -- the exact formulas above, running live."
    >
      <ControlRow>
        <PillSelect label="Mode" value={mode} onChange={setMode} options={MODE_OPTIONS} />
        <div style={{ minWidth: 160 }}>
          <Slider label="Noise" value={noise} onChange={setNoise} min={0} max={10} step={1} />
        </div>
        <VizButton variant="secondary" onClick={() => setSeed((s) => s + 1)}>
          New Dataset
        </VizButton>
      </ControlRow>

      {mode === 'fit' && (
        <>
          <ControlRow>
            <div style={{ minWidth: 220 }}>
              <Slider label="w (slope)" value={w} onChange={setW} min={W_DOMAIN[0]} max={W_DOMAIN[1]} step={0.05} format={(v) => v.toFixed(2)} />
            </div>
            <div style={{ minWidth: 220 }}>
              <Slider label="b (intercept)" value={b} onChange={setB} min={B_DOMAIN[0]} max={B_DOMAIN[1]} step={0.2} format={(v) => v.toFixed(1)} />
            </div>
          </ControlRow>
          <SigmoidPanel points={points} w={w} b={b} t={t} />
          <div style={{ display: 'flex', gap: SPACING.md, fontSize: 14, marginTop: 8 }}>
            <span style={{ fontWeight: 700, color: t.textPrimary }}>Cross-entropy loss {fitStats.loss.toFixed(3)}</span>
            <span style={{ color: t.textSecondary }}>accuracy {(fitStats.accuracy * 100).toFixed(0)}%</span>
          </div>
        </>
      )}

      {mode === 'gd' && (
        <>
          <ControlRow>
            <PillSelect label="Loss function" value={lossType} onChange={setLossType} options={LOSS_OPTIONS} />
            <div style={{ minWidth: 200 }}>
              <Slider label="Learning rate" value={lr} onChange={setLr} min={0.005} max={0.3} step={0.005} format={(v) => v.toFixed(3)} />
            </div>
            <VizButton onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</VizButton>
            <VizButton variant="secondary" onClick={() => stepGD(1)}>
              Step
            </VizButton>
            <VizButton variant="secondary" onClick={resetGD}>
              Reset
            </VizButton>
          </ControlRow>

          <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 8 }}>
            Starting from a deliberately bad initialization (w={BAD_START.w}, b={BAD_START.b}) so the difference between the two loss functions is visible, not just asserted.
          </div>

          <div style={{ display: 'flex', gap: SPACING.md, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px', minWidth: 260 }}>
              <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>Sigmoid fit</div>
              <SigmoidPanel points={points} w={gdLast.w} b={gdLast.b} t={t} />
            </div>
            <div style={{ flex: '1 1 300px', minWidth: 260 }}>
              <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>Loss landscape</div>
              <LossLandscapePanel points={points} path={path} lossType={lossType} t={t} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: SPACING.md, fontSize: 14, margin: '8px 0' }}>
            <span>Step {path.length - 1}</span>
            <span style={{ fontWeight: 700, color: t.textPrimary }}>Loss {gdStats.loss.toFixed(4)}</span>
            <span style={{ color: t.textSecondary }}>accuracy {(gdStats.accuracy * 100).toFixed(0)}%</span>
            <span style={{ color: t.textSecondary }}>w = {gdLast.w.toFixed(3)}, b = {gdLast.b.toFixed(3)}</span>
          </div>

          <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>Step log</div>
          <div style={{ maxHeight: 140, overflowY: 'auto', fontFamily: 'monospace', fontSize: 11.5 }}>
            {path.slice(-30).map((s, i) => {
              const stepNum = path.length - Math.min(30, path.length) + i;
              return (
                <div key={stepNum} style={{ color: t.textSecondary, padding: '2px 0', borderBottom: `1px solid ${t.border}` }}>
                  step {stepNum}: w={s.w.toFixed(3)} b={s.b.toFixed(3)} dw={s.dw.toFixed(4)} db={s.db.toFixed(4)}
                </div>
              );
            })}
          </div>
        </>
      )}
    </VizCard>
  );
}

export default function LogisticRegressionStudio(props) {
  return (
    <BrowserOnly fallback={<VizCard title="Logistic Regression Studio">Loading…</VizCard>}>
      {() => <LogisticRegressionStudioInner {...props} />}
    </BrowserOnly>
  );
}
