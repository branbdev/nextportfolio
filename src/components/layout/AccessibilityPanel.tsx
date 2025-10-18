'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './AccessibilityPanel.module.css';

type ToggleKey =
  | 'dark'
  | 'high-contrast'
  | 'reduce-motion'
  | 'large-text'
  | 'dyslexia'
  | 'focus-visible-always'
  | 'underline-links';

type Settings = Record<ToggleKey, boolean>;

type Stored = Partial<Settings> & {
  fontScale?: number;
  pinned?: boolean;
  compact?: boolean;
};

const STORAGE_KEY = 'a11y-settings';
const SCALE_MIN = 0.85;
const SCALE_MAX = 1.6;
const SCALE_STEP = 0.1;

const DEFAULTS: Settings = {
  dark: false,
  'high-contrast': false,
  'reduce-motion': false,
  'large-text': false,
  dyslexia: false,
  'focus-visible-always': false,
  'underline-links': false,
};

const TOGGLE_KEYS: ToggleKey[] = [
  'dark',
  'high-contrast',
  'reduce-motion',
  'large-text',
  'dyslexia',
  'focus-visible-always',
  'underline-links',
];

function loadSettings(): {
  settings: Settings;
  fontScale: number;
  pinned: boolean;
  compact: boolean;
} {
  if (typeof window === 'undefined')
    return { settings: DEFAULTS, fontScale: 1, pinned: false, compact: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return {
        settings: DEFAULTS,
        fontScale: 1,
        pinned: false,
        compact: false,
      };
    const parsed = JSON.parse(raw) as Stored;
    // Only accept known toggle keys to avoid polluting settings with extra keys
    const settings: Settings = { ...DEFAULTS };
    TOGGLE_KEYS.forEach((k) => {
      if (typeof (parsed as any)[k] === 'boolean') {
        settings[k] = (parsed as any)[k] as boolean;
      }
    });
    const fontScale =
      typeof parsed.fontScale === 'number' ? parsed.fontScale : 1;
    const pinned = !!parsed.pinned;
    const compact = !!parsed.compact;
    return { settings, fontScale, pinned, compact };
  } catch {
    return { settings: DEFAULTS, fontScale: 1, pinned: false, compact: false };
  }
}

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [fontScale, setFontScale] = useState<number>(1);
  const [pinned, setPinned] = useState<boolean>(false);
  const [compact, setCompact] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // load settings on mount
  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded.settings);
    setFontScale(loaded.fontScale);
    setPinned(loaded.pinned);
    setCompact(loaded.compact);
  }, []);

  // apply classes to body when settings change
  useEffect(() => {
    const body = document.body;
    const apply = (key: ToggleKey, on: boolean) => {
      const cls = key;
      if (on) body.classList.add(cls);
      else body.classList.remove(cls);
    };
    TOGGLE_KEYS.forEach((k) => apply(k, settings[k]));

    // Neon theme groundwork: auto-enable when dark + high-contrast
    const neonOn = settings.dark && settings['high-contrast'];
    body.classList.toggle('neon', neonOn);

    // persist combined
    const toStore: Stored = { ...settings, fontScale, pinned, compact };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [settings, fontScale, pinned, compact]);

  // apply font scale to document
  useEffect(() => {
    const effective = Math.max(fontScale, settings['large-text'] ? 1.2 : 1);
    document.documentElement.style.setProperty(
      '--a11y-font-scale',
      String(effective)
    );
  }, [fontScale, settings]);

  // keyboard close on Escape when open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // close on outside click when not pinned
  useEffect(() => {
    if (!open || pinned) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, pinned]);

  const toggle = useCallback((key: ToggleKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULTS);
    setFontScale(1);
    setPinned(false);
    setCompact(false);
  }, []);

  const incScale = useCallback(() => {
    setFontScale((s) =>
      Math.min(SCALE_MAX, Math.round((s + SCALE_STEP) * 100) / 100)
    );
  }, []);
  const decScale = useCallback(() => {
    setFontScale((s) =>
      Math.max(SCALE_MIN, Math.round((s - SCALE_STEP) * 100) / 100)
    );
  }, []);

  const onSkipToContent = useCallback(() => {
    // focus main landmark if present
    const main = document.querySelector(
      'main, [role="main"]'
    ) as HTMLElement | null;
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
    }
  }, []);

  const labelById = useMemo(() => 'a11y-panel-title', []);

  return (
    <div className={styles.root}>
      <button
        type='button'
        ref={triggerRef}
        className={compact ? styles.triggerCompact : styles.trigger}
        aria-expanded={open}
        aria-controls='a11y-panel'
        onClick={() => setOpen((v) => !v)}>
        ♿ Accessibility
      </button>

      {open && (
        <div
          ref={panelRef}
          id='a11y-panel'
          className={styles.panel}
          role='dialog'
          aria-modal='false'
          aria-labelledby={labelById}>
          <div className={styles.header}>
            <div id={labelById} className={styles.title}>
              Accessibility Preferences
            </div>
            <button
              type='button'
              className={styles.btn}
              onClick={() => setOpen(false)}>
              Close
            </button>
          </div>

          <div className={styles.section}>
            <label className={styles.control}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={settings.dark}
                onChange={() => toggle('dark')}
              />
              <span>Dark Mode</span>
            </label>

            <label className={styles.control}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={settings['high-contrast']}
                onChange={() => toggle('high-contrast')}
              />
              <span>High Contrast</span>
            </label>

            <label className={styles.control}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={settings['reduce-motion']}
                onChange={() => toggle('reduce-motion')}
              />
              <span>Reduce Motion</span>
            </label>

            <label className={styles.control}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={settings['large-text']}
                onChange={() => toggle('large-text')}
              />
              <span>Large Text (baseline)</span>
            </label>

            <div
              className={styles.control}
              role='group'
              aria-label='Text Size Controls'>
              <div aria-hidden='true' />
              <div>
                <button
                  type='button'
                  className={styles.btn}
                  onClick={decScale}
                  aria-label='Decrease text size'>
                  A-
                </button>{' '}
                <button
                  type='button'
                  className={styles.btn}
                  onClick={incScale}
                  aria-label='Increase text size'>
                  A+
                </button>
                <span className={styles.hint}>
                  {' '}
                  Current scale: {fontScale.toFixed(2)}{' '}
                </span>
              </div>
            </div>

            <label className={styles.control}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={settings.dyslexia}
                onChange={() => toggle('dyslexia')}
              />
              <span>Dyslexia-Friendly Font</span>
            </label>

            <label className={styles.control}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={settings['focus-visible-always']}
                onChange={() => toggle('focus-visible-always')}
              />
              <span>Always Show Focus</span>
            </label>

            <label className={styles.control}>
              <input
                className={styles.checkbox}
                type='checkbox'
                checked={settings['underline-links']}
                onChange={() => toggle('underline-links')}
              />
              <span>Underline Links</span>
            </label>
          </div>

          <div className={styles.actions}>
            <button
              type='button'
              className={styles.btn}
              onClick={onSkipToContent}>
              Skip to Content
            </button>
            <button
              type='button'
              className={styles.btn}
              aria-pressed={pinned}
              onClick={() => setPinned((p) => !p)}>
              {pinned ? 'Unpin' : 'Pin'}
            </button>
            <button
              type='button'
              className={styles.btn}
              aria-pressed={compact}
              onClick={() => setCompact((c) => !c)}>
              {compact ? 'Expand Trigger' : 'Compact Trigger'}
            </button>
            <button type='button' className={styles.btn} onClick={reset}>
              Reset
            </button>
          </div>
          <p className={styles.hint}>
            Preferences are saved to your device. Some options may slightly
            alter layout.
          </p>
          {settings.dark && settings['high-contrast'] && (
            <p className={styles.hint}>
              Neon mode active (auto when Dark + High Contrast). Colors are more
              vivid for visibility.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
