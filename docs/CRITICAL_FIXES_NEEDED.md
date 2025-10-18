# Critical Fixes Needed Before Phase 11 Testing

**Date:** October 18, 2025  
**Status:** 🚨 BLOCKING ISSUES  
**Priority:** HIGH

---

## ✅ **FIXED (Just Now)**

### 1. Navigation Component Import

**Issue:** AppShell was importing the wrong Navigation component  
**Fix:** Changed from `import Navigation from '../../components/Navigation'` to `import { Navigation } from './Navigation'`  
**Result:** Navigation menu items should now display correctly

### 2. MenuTrigger Props Mismatch

**Issue:** AppShell passing `onClick` but MenuTrigger expects `onToggle`  
**Fix:** Updated MenuTrigger to accept both props and added `isOpen` state for visual feedback  
**Result:** Hamburger menu should now toggle properly

### 3. Background Color Too White

**Issue:** Pure white background (`#ffffff`) too stark  
**Fix:** Changed to warmer eggshell tone (`#faf8f5`)  
**Result:** More pleasant, paper-like appearance

---

## 🔴 **CRITICAL - NEEDS IMMEDIATE ATTENTION**

### 4. Accessibility Menu Giant Icon + Non-Functional

**Issue:**

- Gear icon is ~800px square (should be ~40-60px)
- None of the accessibility controls work
- Not using the design token system we built

**Root Cause:** Using legacy `Accessibility.tsx` component with old CSS

**Solution Required:**

```tsx
// File: src/components/Accessibility.tsx
// This file needs complete refactor to:
// 1. Use CSS Modules instead of global styles
// 2. Fix icon sizing (currently inheriting wrong dimensions)
// 3. Properly apply theme classes to <body>
// 4. Use our design token variables
```

**Files to Update:**

- `src/components/Accessibility.tsx` - Component logic
- Create: `src/components/Accessibility.module.css` - Scoped styles
- Remove old accessibility styles from `public/css/style.css`

**Action Plan:**

1. Extract accessibility SVG icon (gear) and size it properly (48px)
2. Create CSS Module with proper panel sizing
3. Update theme toggle to use `body.classList.toggle('dark')`
4. Ensure font size changes use `document.documentElement.style.fontSize`
5. Test all accessibility controls (theme, contrast, motion, dyslexic font)

---

### 5. PanelContent Green Availability Indicator Missing

**Issue:** Green status icon next to "I'm actively seeking a full time role!" not showing

**Root Cause:** PanelContent is a wrapper around legacy component that uses old SVG approach

**Solution Required:**

```tsx
// File: src/components/PanelContent.tsx
// Needs to add the availability indicator:
<div className={styles.availability}>
  <span className={styles.statusDot} /> {/* Green dot */}
  <span>I'm actively seeking a full time role!</span>
</div>
```

**CSS for Status Dot:**

```css
.statusDot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #10b981; /* Green */
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

---

### 6. Cursor Disappears on Navigation Hover

**Issue:** Custom cursor hidden when hovering over navigation

**Root Cause:** MagicCursor component likely has z-index issue or nav is blocking pointer events

**Solution Required:**

```css
/* In Navigation.module.css */
.navigation {
  /* Ensure cursor can show through */
  pointer-events: auto; /* Only on interactive elements */
}

.overlay {
  pointer-events: auto; /* Clickable to close */
}

/* In MagicCursor.module.css */
.cursorOuter,
.cursorInner {
  z-index: 10000; /* Higher than navigation (z-index: 300) */
  pointer-events: none; /* Don't block clicks */
}
```

---

## ⚠️ **HIGH PRIORITY - CAN BE DEFERRED**

### 7. Swiper Carousel Not Working

**Issue:** Portfolio carousel not displaying/functioning

**Investigation Needed:**

1. Check if Swiper CSS is loaded
2. Verify PortfolioClient is rendering
3. Check console for Swiper initialization errors
4. Ensure `next/dynamic` is working correctly

**Quick Test:**

```bash
# In browser console:
console.log(document.querySelector('.swiper'));
// Should return element if carousel exists
```

**Likely Causes:**

- Missing Swiper CSS import
- Dynamic import not resolving
- Project data not loading correctly

---

### 8. Portfolio Cards & Modals Broken

**Issue:** Portfolio cards/modals not functioning

**Related to:** Issue #7 (Swiper carousel)

**Deferred:** Can be addressed after Swiper is working

---

## 📁 **CLEANUP - MEDIUM PRIORITY**

### 9. Duplicate globals.css Files

**Issue:** Two `globals.css` files in different locations

**Current State:**

```
app/globals.css           ← CORRECT (App Router)
styles/globals.css        ← LEGACY (Pages Router)
```

**Action Required:**

1. **Keep:** `app/globals.css` (currently used by App Router)
2. **DELETE:** `styles/globals.css` (legacy, not used)

**Command:**

```bash
rm /home/redshreds/dev/portfolio/nextportfolio/styles/globals.css
```

---

### 10. Orphaned styles/ Directory

**Issue:** `/styles` folder still exists with limited content

**Current Contents:**

```
styles/
  globals.css              ← DELETE (duplicate)
  components/
    Portfolio.module.css   ← MOVE to src/styles/components/
```

**Action Required:**

```bash
# Move Portfolio.module.css to correct location
mv styles/components/Portfolio.module.css src/styles/components/

# Remove empty directories
rm -rf styles/
```

---

### 11. Multiple Navigation Components

**Issue:** Confusing to have multiple Navigation files

**Current State:**

```
src/components/Navigation.tsx          ← LEGACY (old Pages Router)
src/components/layout/Navigation.tsx   ← NEW (App Router, correct)
```

**Action Required:**

```bash
# Delete legacy Navigation
rm src/components/Navigation.tsx

# Also check for legacy MenuTrigger
rm src/components/MenuTrigger.tsx  # if exists
```

---

## 🚫 **DEFERRED TO FUTURE**

### 12. Blog Completely Broken

**Status:** Known issue  
**Priority:** LOW (not blocking migration completion)  
**Action:** Document for post-migration Phase 12

---

## 📋 **IMMEDIATE ACTION CHECKLIST**

**To get the site functional for Phase 11 testing:**

- [x] 1. Fix Navigation import (DONE)
- [x] 2. Fix MenuTrigger props (DONE)
- [x] 3. Fix background color (DONE)
- [ ] 4. Fix Accessibility menu sizing and functionality
- [ ] 5. Add green availability indicator to PanelContent
- [ ] 6. Fix cursor z-index for navigation
- [ ] 7. Investigate Swiper carousel issue
- [ ] 8. Clean up duplicate CSS files
- [ ] 9. Remove orphaned styles/ directory
- [ ] 10. Delete legacy Navigation component

**Estimated Time:**

- Critical fixes (4-6): 2-3 hours
- Swiper investigation: 1 hour
- Cleanup: 30 minutes
- **Total: 3.5-4.5 hours**

---

## 🔧 **RECOMMENDED APPROACH**

### Step 1: Restart Dev Server (Now)

```bash
npm run dev
```

### Step 2: Test Navigation (5 min)

- Click hamburger menu
- Verify menu items appear
- Test clicking each menu item
- Verify menu closes after click

### Step 3: Fix Accessibility Menu (1 hour)

Priority: CRITICAL - This is your main UX differentiator

### Step 4: Add Availability Indicator (15 min)

Simple HTML/CSS addition to PanelContent

### Step 5: Fix Cursor Z-Index (15 min)

Update CSS in two files

### Step 6: Investigate Swiper (1 hour)

Requires debugging to find root cause

---

## 📞 **NEED HELP?**

If any of these fixes seem overwhelming:

1. **Focus on Critical fixes first** (4-6)
2. **Defer Swiper investigation** until navigation/accessibility work
3. **Skip cleanup** until core functionality restored

The site doesn't need to be perfect for Phase 11 testing - it needs to be **functional** and **demonstrate the migration value**.

---

**Next Steps:** Restart dev server and test navigation fixes, then tackle Accessibility menu as top priority.
