import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'neural-mastery-progress';
const ProgressContext = createContext(null);

function readStorage() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStorage(value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) -- fail silently, progress just won't persist.
  }
}

/**
 * Local-only (no account, nothing sent anywhere) "have I marked this page
 * understood" tracker, keyed by permalink. Mounted once via src/theme/Root.js
 * so every page under the app shares the same state without prop drilling.
 */
export function ProgressProvider({ children }) {
  const [understood, setUnderstood] = useState({});

  useEffect(() => {
    setUnderstood(readStorage());
  }, []);

  const toggle = useCallback((permalink) => {
    setUnderstood((prev) => {
      const next = { ...prev };
      if (next[permalink]) {
        delete next[permalink];
      } else {
        next[permalink] = true;
      }
      writeStorage(next);
      return next;
    });
  }, []);

  const isUnderstood = useCallback((permalink) => !!understood[permalink], [understood]);

  const countWithin = useCallback(
    (permalinks) => permalinks.filter((p) => understood[p]).length,
    [understood],
  );

  return (
    <ProgressContext.Provider value={{ understood, toggle, isUnderstood, countWithin }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return ctx;
}
