import React, { useMemo } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useCurrentSidebarCategory } from '@docusaurus/plugin-content-docs/client';
import { useProgress } from '@site/src/contexts/ProgressContext';

function collectDocLinks(items) {
  const links = [];
  items.forEach((item) => {
    if (item.type === 'link' || item.type === 'doc') {
      if (item.href) links.push(item.href);
    } else if (item.type === 'category' && item.items) {
      links.push(...collectDocLinks(item.items));
    }
  });
  return links;
}

/**
 * "X / Y pages marked understood" for the current top-level category --
 * drop this on a generated-index landing page. Must render under
 * BrowserOnly since it reads live progress state (SSR has no localStorage).
 */
function SectionProgressInner() {
  const category = useCurrentSidebarCategory();
  const { countWithin } = useProgress();

  const links = useMemo(() => collectDocLinks(category.items ?? []), [category]);
  if (links.length === 0) return null;

  const done = countWithin(links);
  const pct = Math.round((done / links.length) * 100);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 14,
        color: 'var(--ifm-color-emphasis-700)',
        margin: '8px 0 20px',
      }}
    >
      <div
        style={{
          width: 120,
          height: 6,
          borderRadius: 3,
          background: 'var(--ifm-color-emphasis-200)',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--ifm-color-primary)' }} />
      </div>
      <span>
        {done} / {links.length} pages marked understood
      </span>
    </div>
  );
}

export default function SectionProgress() {
  return <BrowserOnly>{() => <SectionProgressInner />}</BrowserOnly>;
}
