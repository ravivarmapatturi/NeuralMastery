import React from 'react';
import { ProgressProvider } from '@site/src/contexts/ProgressContext';
import ThemeSkinPicker from '@site/src/components/ThemeSkinPicker';

// Docusaurus's officially-supported "wrap the whole app" extension point --
// mounts the local-only progress tracker once so every page shares state.
export default function Root({ children }) {
  return (
    <ProgressProvider>
      {children}
      <ThemeSkinPicker />
    </ProgressProvider>
  );
}
