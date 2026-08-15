import React, { useEffect, useRef, useState } from 'react';

/**
 * A responsive mount point for D3/canvas visualizations. Tracks its own
 * container width via ResizeObserver and hands {width, height} to a
 * render-prop child, so every visualization is responsive (desktop docs
 * layout down to a narrow mobile viewport) without re-deriving this logic
 * per component.
 *
 * Usage:
 *   <VizCanvas aspect={16 / 9}>
 *     {({ width, height }) => <svg ref={svgRef} width={width} height={height} />}
 *   </VizCanvas>
 *
 * Must be rendered client-side only (wrap the component that uses this in
 * <BrowserOnly>) since it reads layout via ResizeObserver.
 */
export default function VizCanvas({ aspect = 16 / 9, minHeight = 280, maxHeight = 560, children }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 600, height: Math.max(minHeight, 600 / aspect) });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const height = Math.min(maxHeight, Math.max(minHeight, width / aspect));
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [aspect, minHeight, maxHeight]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {children(size)}
    </div>
  );
}
