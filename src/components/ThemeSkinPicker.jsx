import React, { useEffect, useState, useRef } from 'react';

const STORAGE_KEY = 'neural-mastery-page-theme';

const SKINS = [
  { id: 'default', name: 'White', swatch: '#ffffff', border: '#d7dade' },
  { id: 'sepia', name: 'Sepia', swatch: '#f6eedd' },
  { id: 'rose', name: 'Rosé', swatch: '#fbeef3' },
  { id: 'sage', name: 'Sage', swatch: '#ebf4ec' },
  { id: 'lavender', name: 'Lavender', swatch: '#f1ecfa' },
  { id: 'sky', name: 'Sky', swatch: '#eaf2fb' },
];

function applySkin(id) {
  if (id && id !== 'default') {
    document.documentElement.setAttribute('data-page-theme', id);
  } else {
    document.documentElement.removeAttribute('data-page-theme');
  }
}

// Opt-in, study-friendly background skins -- alternatives to plain white.
// Independent of Docusaurus's own light/dark toggle: only meaningful in
// light mode, since the skins are tints of a light page (see custom.css).
export default function ThemeSkinPicker() {
  const [colorMode, setColorMode] = useState(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('default');
  const ref = useRef(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) || 'default';
    setActive(saved);
    applySkin(saved);

    const readMode = () =>
      setColorMode(document.documentElement.getAttribute('data-theme'));
    readMode();
    const observer = new MutationObserver(readMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  if (colorMode !== 'light') return null;

  function choose(id) {
    setActive(id);
    applySkin(id);
    window.localStorage.setItem(STORAGE_KEY, id);
    setOpen(false);
  }

  const activeSkin = SKINS.find((s) => s.id === active) || SKINS[0];

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        right: '1.25rem',
        bottom: '1.25rem',
        zIndex: 200,
      }}
    >
      {open && (
        <div
          role="menu"
          aria-label="Page background theme"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 0.5rem)',
            right: 0,
            background: 'var(--ifm-background-surface-color)',
            border: '1px solid var(--nm-border)',
            borderRadius: '10px',
            padding: '0.5rem',
            boxShadow: '0 8px 24px rgba(20,22,26,0.14)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.15rem',
            minWidth: '140px',
          }}
        >
          {SKINS.map((s) => (
            <button
              key={s.id}
              role="menuitemradio"
              aria-checked={active === s.id}
              onClick={() => choose(s.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: active === s.id ? 'var(--nm-surface-alt)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                padding: '0.4rem 0.5rem',
                cursor: 'pointer',
                font: 'inherit',
                fontSize: '0.82rem',
                color: 'var(--ifm-font-color-base)',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: s.swatch,
                  border: `1px solid ${s.border || 'rgba(20,22,26,0.15)'}`,
                  flexShrink: 0,
                }}
              />
              {s.name}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change page background color"
        aria-expanded={open}
        title="Page background color"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '1px solid var(--nm-border)',
          background: activeSkin.swatch,
          boxShadow: '0 2px 10px rgba(20,22,26,0.18)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: `1.5px solid ${activeSkin.border || 'rgba(20,22,26,0.35)'}`,
          }}
        />
      </button>
    </div>
  );
}
