// Ported from visualize/design_tokens.yaml -- the same source of truth every
// generated static chart/diagram/animation on the site uses. Update both
// together if the palette ever changes; see src/css/custom.css for the
// Infima-variable-side port used by the site's own chrome.
//
// Interactive components should always read colors from useVizTokens(),
// never a hardcoded hex value, so they track the live light/dark toggle
// and stay pixel-consistent with the static assets on the same page.

import { useColorMode } from '@docusaurus/theme-common';

export const DARK = {
  mode: 'dark',
  background: '#0A0A0B',
  surface: '#141416',
  surfaceAlt: '#1E1E21',
  border: '#2C2C30',
  textPrimary: '#F5F5F7',
  textSecondary: '#ABABB3',
  textMuted: '#707078',
  accentPrimary: '#3DDC97',
  accentSecondary: '#5B8CFF',
  accentWarn: '#F4B942',
  accentDanger: '#F45B5B',
  nodeFill: '#1E1E21',
  nodeBorder: '#3DDC97',
  edge: '#5B8CFF',
};

export const LIGHT = {
  mode: 'light',
  background: '#FFFFFF',
  surface: '#F6F7F8',
  surfaceAlt: '#EEF0F2',
  border: '#E3E6EA',
  textPrimary: '#14161A',
  textSecondary: '#5B6470',
  textMuted: '#88919C',
  accentPrimary: '#21A374',
  accentSecondary: '#3169E0',
  accentWarn: '#B9791E',
  accentDanger: '#D43F3F',
  nodeFill: '#EEF0F2',
  nodeBorder: '#21A374',
  edge: '#3169E0',
};

export const RADIUS = { sm: 6, md: 12, lg: 20 };
export const SPACING = { xs: 8, sm: 16, md: 24, lg: 40, xl: 64 };
export const FONT_FAMILY =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/**
 * Live light/dark toggle state, ready-mapped to a token palette. Only call
 * from inside a component rendered under BrowserOnly (or otherwise
 * client-side) -- same rule as any Docusaurus theme hook, since color mode
 * isn't known during server-side rendering.
 */
export function useVizTokens() {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? DARK : LIGHT;
}
