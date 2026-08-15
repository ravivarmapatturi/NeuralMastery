import React, { useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { scaleLinear } from 'd3-scale';
import { useVizTokens, SPACING, FONT_FAMILY } from '@site/src/theme/vizTokens';
import VizCard from './primitives/VizCard';
import VizCanvas from './primitives/VizCanvas';
import { Slider, VizButton, ControlRow } from './primitives/VizControls';
import { FEATURE_NAMES, LAMBDA_MAX, generateData, ridgeSolve, mse, regularizationPath } from './lib/ridge';

const FEATURE_COLORS = (t) => [t.accentPrimary, t.accentSecondary, t.accentWarn, t.accentDanger];

function RidgeRegressionStudioInner() {
  const t = useVizTokens();
  const [seed, setSeed] = useState(5);
  const [correlation, setCorrelation] = useState(0.9);
  const [noise, setNoise] = useState(1.5);
  const [lambda, setLambda] = useState(0);

  const rows = useMemo(() => generateData(40, correlation, noise, seed), [correlation, noise, seed]);
  const path = useMemo(() => regularizationPath(rows, 40), [rows]);
  const current = useMemo(() => ridgeSolve(rows, lambda), [rows, lambda]);
  const currentMse = useMemo(() => mse(rows, current.b, current.w), [rows, current]);

  const colors = FEATURE_COLORS(t);

  const yDomain = useMemo(() => {
    let min = 0;
    let max = 0;
    path.forEach((p) => {
      p.w.forEach((v) => {
        if (v < min) min = v;
        if (v > max) max = v;
      });
    });
    const pad = (max - min) * 0.15 || 1;
    return [min - pad, max + pad];
  }, [path]);

  return (
    <VizCard
      eyebrow="Interactive"
      title="Ridge Regression Studio"
      footer="A real 4-feature synthetic dataset (x1 and x2 deliberately correlated) and a real, from-scratch closed-form ridge solve -- w(lambda) = (X^TX + lambda*P)^-1 X^Ty -- recomputed live as you move lambda."
    >
      <ControlRow>
        <div style={{ minWidth: 200 }}>
          <Slider label="Correlation (x1, x2)" value={correlation} onChange={setCorrelation} min={0} max={0.98} step={0.02} format={(v) => v.toFixed(2)} />
        </div>
        <div style={{ minWidth: 160 }}>
          <Slider label="Noise" value={noise} onChange={setNoise} min={0.2} max={4} step={0.1} format={(v) => v.toFixed(1)} />
        </div>
        <VizButton variant="secondary" onClick={() => setSeed((s) => s + 1)}>
          New Dataset
        </VizButton>
      </ControlRow>
      <ControlRow>
        <div style={{ minWidth: 260, flex: 1 }}>
          <Slider label="λ (regularization strength)" value={lambda} onChange={setLambda} min={0} max={LAMBDA_MAX} step={0.05} format={(v) => v.toFixed(2)} />
        </div>
      </ControlRow>

      <VizCanvas aspect={16 / 8} minHeight={260} maxHeight={340}>
        {({ width, height }) => {
          const margin = 36;
          const xScale = scaleLinear().domain([0, LAMBDA_MAX]).range([margin, width - margin]);
          const yScale = scaleLinear().domain(yDomain).range([height - margin, margin]);

          return (
            <svg width={width} height={height} style={{ display: 'block' }}>
              <rect x={0} y={0} width={width} height={height} fill={t.background} />
              <line x1={margin} y1={yScale(0)} x2={width - margin} y2={yScale(0)} stroke={t.border} strokeWidth={1} />
              {FEATURE_NAMES.map((name, j) => {
                const pts = path.map((p) => `${xScale(p.lambda)},${yScale(p.w[j])}`).join(' ');
                return <polyline key={name} points={pts} fill="none" stroke={colors[j]} strokeWidth={2} opacity={0.9} />;
              })}
              <line x1={xScale(lambda)} y1={margin} x2={xScale(lambda)} y2={height - margin} stroke={t.textPrimary} strokeWidth={1} strokeDasharray="4 3" />
              {current.w.map((v, j) => (
                <circle key={j} cx={xScale(lambda)} cy={yScale(v)} r={4.5} fill={colors[j]} stroke={t.background} strokeWidth={1.5} />
              ))}
            </svg>
          );
        }}
      </VizCanvas>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12, marginTop: 6 }}>
        {FEATURE_NAMES.map((name, j) => (
          <span key={name} style={{ color: t.textSecondary }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: colors[j], marginRight: 4 }} />
            {name} = {current.w[j].toFixed(2)}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: SPACING.md, fontSize: 14, marginTop: 8, flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, color: t.textPrimary }}>MSE {currentMse.toFixed(3)}</span>
        <span style={{ color: t.textSecondary }}>x1 + x2 = {(current.w[0] + current.w[1]).toFixed(2)} (true combined effect ≈ 6.0)</span>
      </div>
      <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4, fontFamily: FONT_FAMILY }}>
        Drag λ to 0 (plain OLS) and push Correlation up -- watch x1 and x2 swing individually while their sum barely moves. Now increase λ and watch them settle toward each other, with MSE barely changing.
      </div>
    </VizCard>
  );
}

export default function RidgeRegressionStudio(props) {
  return (
    <BrowserOnly fallback={<VizCard title="Ridge Regression Studio">Loading…</VizCard>}>
      {() => <RidgeRegressionStudioInner {...props} />}
    </BrowserOnly>
  );
}
