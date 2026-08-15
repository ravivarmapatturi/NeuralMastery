import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TagsListInline from '@theme/TagsListInline';
import EditMetaRow from '@theme/EditMetaRow';
import { useProgress } from '@site/src/contexts/ProgressContext';

// Swizzled from @docusaurus/theme-classic's DocItem/Footer: renders the
// original tags/edit-meta row unchanged, plus a "Mark as understood" toggle
// backed by ProgressContext (local-only, no account) -- applies to every doc
// page in the site without touching any of the 200+ content files.
function MarkAsUnderstood() {
  const { metadata } = useDoc();
  const { isUnderstood, toggle } = useProgress();
  const done = isUnderstood(metadata.permalink);

  return (
    <div className={clsx('margin-top--lg', ThemeClassNames.docs.docFooterTagsRow)}>
      <button
        type="button"
        onClick={() => toggle(metadata.permalink)}
        style={{
          padding: '8px 16px',
          borderRadius: 8,
          border: `1px solid ${done ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)'}`,
          background: done ? 'var(--ifm-color-primary)' : 'transparent',
          color: done ? 'var(--ifm-background-color)' : 'var(--ifm-font-color-base)',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 120ms ease',
        }}
      >
        {done ? '✓ Marked as understood' : 'Mark as understood'}
      </button>
    </div>
  );
}

export default function DocItemFooter() {
  const { metadata } = useDoc();
  const { editUrl, lastUpdatedAt, lastUpdatedBy, tags } = metadata;

  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      {canDisplayTagsRow && (
        <div className={clsx('row margin-top--sm', ThemeClassNames.docs.docFooterTagsRow)}>
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        </div>
      )}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          className={clsx('margin-top--sm', ThemeClassNames.docs.docFooterEditMetaRow)}
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
      <MarkAsUnderstood />
      {!canDisplayFooter && <div style={{ height: 0 }} />}
    </footer>
  );
}
