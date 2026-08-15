import React from 'react';
import { useVizTokens, RADIUS, SPACING } from '@site/src/theme/vizTokens';

/** A labeled slider with its current value shown inline. */
export function Slider({ label, value, onChange, min, max, step = 1, format }) {
  const t = useVizTokens();
  const display = format ? format(value) : value;

  return (
    <label style={{ display: 'block', marginBottom: SPACING.xs, fontSize: 14 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 4,
          color: t.textSecondary,
        }}
      >
        <span>{label}</span>
        <span style={{ color: t.textPrimary, fontVariantNumeric: 'tabular-nums' }}>
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: t.accentPrimary,
          cursor: 'pointer',
        }}
      />
    </label>
  );
}

/** A row of mutually-exclusive pill buttons (radio-button style selection). */
export function PillSelect({ label, value, onChange, options }) {
  const t = useVizTokens();

  return (
    <div style={{ marginBottom: SPACING.xs, fontSize: 14 }}>
      {label && (
        <div style={{ marginBottom: 6, color: t.textSecondary }}>{label}</div>
      )}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                padding: '6px 12px',
                borderRadius: RADIUS.sm,
                border: `1px solid ${active ? t.accentPrimary : t.border}`,
                background: active ? t.accentPrimary : 'transparent',
                color: active ? t.background : t.textPrimary,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** A single primary action button, styled to the brand accent. */
export function VizButton({ children, onClick, variant = 'primary', disabled }) {
  const t = useVizTokens();
  const isPrimary = variant === 'primary';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        borderRadius: RADIUS.sm,
        border: `1px solid ${isPrimary ? t.accentPrimary : t.border}`,
        background: isPrimary ? t.accentPrimary : 'transparent',
        color: isPrimary ? t.background : t.textPrimary,
        fontSize: 14,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 120ms ease',
      }}
    >
      {children}
    </button>
  );
}

/** A row layout helper so control groups line up consistently. */
export function ControlRow({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: SPACING.md,
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        marginBottom: SPACING.sm,
      }}
    >
      {children}
    </div>
  );
}
