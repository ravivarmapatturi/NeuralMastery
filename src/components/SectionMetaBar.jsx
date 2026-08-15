import React from 'react';
import { SECTION_META } from '@site/src/data/sectionMeta';

/** Time/difficulty/prerequisites badge row for a top-level category landing page. */
export default function SectionMetaBar({ href }) {
  // href includes the site's baseUrl prefix (e.g. /NeuralMastery/docs/category/foundations)
  // while SECTION_META is keyed by the un-prefixed path, so match by suffix.
  const key = Object.keys(SECTION_META).find((k) => href?.endsWith(k));
  const meta = key && SECTION_META[key];
  if (!meta) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 24px',
        fontSize: 14,
        color: 'var(--ifm-color-emphasis-700)',
        margin: '12px 0 4px',
        padding: '12px 16px',
        borderRadius: 8,
        border: '1px solid var(--ifm-color-emphasis-200)',
        background: 'var(--ifm-color-emphasis-100)',
      }}
    >
      <span>⏱ {meta.time}</span>
      <span>⭐ {meta.difficulty}</span>
      <span>Prerequisites: {meta.prerequisites}</span>
      <span>Leads to: {meta.leadsTo}</span>
    </div>
  );
}
