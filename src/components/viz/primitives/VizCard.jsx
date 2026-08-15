import React from 'react';
import { useVizTokens, RADIUS, SPACING, FONT_FAMILY } from '@site/src/theme/vizTokens';

/**
 * The standard container every interactive visualization renders inside --
 * matches the look of the static card.html.j2 template (dark/light surface,
 * border, radius, shadow) so an interactive component reads as native next
 * to the site's generated charts, not bolted on.
 */
export default function VizCard({ title, eyebrow, children, footer }) {
  const t = useVizTokens();

  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        margin: `${SPACING.md}px 0`,
        boxShadow:
          t.mode === 'dark'
            ? '0 8px 24px rgba(0, 0, 0, 0.35)'
            : '0 8px 24px rgba(20, 22, 26, 0.08)',
        fontFamily: FONT_FAMILY,
        color: t.textPrimary,
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: t.accentPrimary,
            marginBottom: 4,
          }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: SPACING.sm }}>
          {title}
        </div>
      )}
      {children}
      {footer && (
        <div
          style={{
            marginTop: SPACING.sm,
            paddingTop: SPACING.sm,
            borderTop: `1px solid ${t.border}`,
            fontSize: 13,
            color: t.textSecondary,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
