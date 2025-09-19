import { useState, useEffect, useCallback } from 'react';

const Accessibility = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'dark',
    contrast: false,
    motion: false,
    fontSize: 16,
    dyslexicFont: false,
    focusMode: false, // Add to settings state
  });

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem('accessibilitySettings')
    );
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const applySettings = useCallback(() => {
    const body = document.body;
    // Theme
    if (settings.theme === 'light') {
      body.classList.add('light');
    } else {
      body.classList.remove('light');
    }
    // Contrast
    if (settings.contrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    // Motion
    if (settings.motion) {
      body.classList.add('motion-reduced');
    } else {
      body.classList.remove('motion-reduced');
    }
    // Dyslexic Font
    if (settings.dyslexicFont) {
      body.classList.add('dyslexic-font');
    } else {
      body.classList.remove('dyslexic-font');
    }
    // Focus Mode
    if (settings.focusMode) {
      body.classList.add('focus-mode');
    } else {
      body.classList.remove('focus-mode');
    }
    // Font Size
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    applySettings();
  }, [settings, applySettings]);

  const handleThemeChange = (theme) => {
    setSettings({ ...settings, theme });
  };

  const handleToggleChange = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleFontSizeChange = (action) => {
    let newSize = settings.fontSize;
    if (action === 'increase') {
      newSize = Math.min(newSize + 2, 24);
    } else {
      newSize = Math.max(newSize - 2, 12);
    }
    setSettings({ ...settings, fontSize: newSize });
    document.documentElement.style.setProperty(
      '--base-font-size',
      `${newSize}px`
    );
  };

  return (
    <div className={`fn_accessibility ${isOpen ? 'opened' : ''}`}>
      <div className='accessibility_button' onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='fn__svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
      </div>
      <div className='accessibility_panel'>
        <div className='panel_title'>Accessibility Controls</div>
        <div className='panel_item'>
          <span>Theme</span>
          <div className='toggle_group'>
            <button
              className={`theme_btn ${
                settings.theme === 'light' ? 'active' : ''
              }`}
              onClick={() => handleThemeChange('light')}>
              Light
            </button>
            <button
              className={`theme_btn ${
                settings.theme === 'dark' ? 'active' : ''
              }`}
              onClick={() => handleThemeChange('dark')}>
              Dark
            </button>
          </div>
        </div>
        <div className='panel_item'>
          <span>High Contrast</span>
          <label className='switch'>
            <input
              type='checkbox'
              className='contrast_toggle'
              checked={settings.contrast}
              onChange={() => handleToggleChange('contrast')}
            />
            <span className='slider'></span>
          </label>
        </div>
        <div className='panel_item'>
          <span>Reduce Motion</span>
          <label className='switch'>
            <input
              type='checkbox'
              className='motion_toggle'
              checked={settings.motion}
              onChange={() => handleToggleChange('motion')}
            />
            <span className='slider'></span>
          </label>
        </div>
        <div className='panel_item'>
          <span>Font Size</span>
          <div className='font_size_controls'>
            <button
              className='font_btn'
              onClick={() => handleFontSizeChange('decrease')}>
              A-
            </button>
            <button
              className='font_btn'
              onClick={() => handleFontSizeChange('increase')}>
              A+
            </button>
          </div>
        </div>
        <div className='panel_item'>
          <span>Dyslexia-Friendly Font</span>
          <label className='switch'>
            <input
              type='checkbox'
              checked={settings.dyslexicFont}
              onChange={() => handleToggleChange('dyslexicFont')}
            />
            <span className='slider'></span>
          </label>
        </div>
        <div className='panel_item'>
          <span>Focus Mode</span>
          <label className='switch'>
            <input
              type='checkbox'
              checked={settings.focusMode}
              onChange={() => handleToggleChange('focusMode')}
            />
            <span className='slider'></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
