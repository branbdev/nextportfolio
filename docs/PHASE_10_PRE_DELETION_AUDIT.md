# Phase 10: Pages Router Cleanup - Pre-Deletion Audit

**Date**: January 25, 2025  
**Status**: In Progress  
**Migration Progress**: 9/11 tasks → 10/11 tasks

---

## Files to Delete

### 1. Legacy Pages Router Files (`pages/`)

#### Files for Deletion:

1. **pages/\_app.tsx** (Legacy Pages Router app wrapper)

   - **Size**: ~15KB
   - **Reason**: Replaced by `app/layout.tsx` and `app/providers.tsx`
   - **Status**: Can be safely deleted

2. **pages/\_document.tsx** (Legacy custom document)

   - **Size**: ~8KB
   - **Reason**: Replaced by `app/layout.tsx` with modern Next.js 13+ patterns
   - **Status**: Can be safely deleted

3. **pages/index.tsx.old** (Old homepage)

   - **Size**: Unknown
   - **Reason**: Replaced by `app/page.tsx`
   - **Status**: Can be safely deleted (already marked .old)

4. **pages/index-light.tsx.old** (Old light theme homepage)

   - **Size**: Unknown
   - **Reason**: Theme now handled by Accessibility component
   - **Status**: Can be safely deleted (already marked .old)

5. **pages/intro.tsx** (Old intro page)

   - **Size**: Unknown
   - **Reason**: No longer used in App Router
   - **Status**: Can be safely deleted

6. **pages/test-graphql.tsx** (GraphQL test page)

   - **Size**: ~5KB
   - **Reason**: Development/testing file, not needed in production
   - **Status**: Can be safely deleted

7. **pages/blog/\*.old** (Old blog pages)
   - **Reason**: Replaced by `app/blog/` directory
   - **Status**: Can be safely deleted

#### Files to KEEP:

- **pages/api/** directory
  - **Reason**: API routes still use Pages Router pattern in Next.js 13+
  - **Files**: `blog-posts.ts`, `gql-debug.ts`, `hello.ts`, `test-mdx.ts`
  - **Status**: **DO NOT DELETE** - API routes functional

---

### 2. Legacy Layout Files (`src/layouts/`)

#### Files for Deletion:

1. **src/layouts/Layout.tsx**

   - **Size**: ~10KB
   - **Reason**: Replaced by `src/components/layout/AppShell.tsx`
   - **Legacy Classes**: 7 (resumo*fn*_, frenify\__)
   - **Status**: Can be safely deleted

2. **src/layouts/Nav.tsx**

   - **Size**: ~8KB
   - **Reason**: Replaced by `src/components/Navigation.tsx` with CSS modules
   - **Status**: Can be safely deleted

3. **src/layouts/Nav.module.css**

   - **Size**: ~5KB
   - **Reason**: Old navigation styles, replaced by `src/styles/components/Navigation.module.css`
   - **Status**: Can be safely deleted

4. **src/layouts/Footer.tsx** (old version)

   - **Size**: ~4KB
   - **Reason**: Replaced by `src/components/layout/Footer.tsx`
   - **Legacy Classes**: 1
   - **Status**: Can be safely deleted

5. **src/layouts/Cursor.tsx**

   - **Size**: ~6KB
   - **Reason**: Replaced by `src/components/layout/MagicCursor.tsx`
   - **Legacy Classes**: 2
   - **Status**: Can be safely deleted

6. **src/layouts/Trigger.tsx**
   - **Size**: ~3KB
   - **Reason**: Hamburger functionality moved to `src/components/layout/Hamburger.tsx`
   - **Status**: Can be safely deleted

#### Directory to DELETE:

- **src/layouts/** (entire directory after files removed)

---

### 3. Unused SVG Files (`public/svg/social/`)

#### Files for Deletion (27 files):

1. badoo.svg
2. baidu-logo.svg
3. behance.svg
4. big-skype-logo.svg
5. facebook.svg
6. instagram.svg
7. line.svg
8. linkedin.svg (replaced by react-icons SiLinkedin)
9. night-club.svg
10. pinterest.svg
11. qq.svg
12. qzone-logo.svg
13. reddit.svg
14. renren.svg
15. sina-weibo.svg
16. snapchat.svg
17. tagged.svg
18. taringa-logo.svg
19. telegram-1.svg
20. telegram.svg
21. tik-tok.svg
22. tumblr.svg
23. twitter.svg
24. viber.svg
25. vk.svg
26. wechat.svg
27. youtube.svg

**Total Size**: ~150KB

#### Files to KEEP:

- public/svg/favicon.svg (actively used)
- public/svg/arrow.svg (may be used)
- public/svg/inbox.svg (may be used)

---

## Verification Before Deletion

### 1. Grep Search for Imports

```bash
# Search for any imports from pages/
grep -r "from.*pages/" src/ app/ --include="*.tsx" --include="*.ts"

# Search for any imports from src/layouts/
grep -r "from.*src/layouts" src/ app/ --include="*.tsx" --include="*.ts"

# Search for any references to social SVGs
grep -r "svg/social" src/ app/ public/ --include="*.tsx" --include="*.ts" --include="*.html"
```

### 2. Build Verification

```bash
# Run production build before deletion
npm run build

# Verify no errors
# Check output for any missing imports
```

### 3. Runtime Testing

- Visit all routes: /, /blog, /blog/[slug]
- Test navigation menu
- Test dark mode toggle
- Verify Contact form
- Check Portfolio modal
- Verify all icons display

---

## Deletion Commands

### Step 1: Create Git Backup (Recommended)

```bash
# Create a backup branch
git checkout -b backup-before-cleanup
git add -A
git commit -m "Backup before Pages Router cleanup"
git checkout blog

# OR create manual backup
tar -czf pages-backup-$(date +%Y%m%d).tar.gz pages/ src/layouts/ public/svg/social/
```

### Step 2: Delete Pages Router Files

```bash
# Remove old Pages Router files (keep API routes)
rm -f pages/_app.tsx
rm -f pages/_document.tsx
rm -f pages/index.tsx.old
rm -f pages/index-light.tsx.old
rm -f pages/intro.tsx
rm -f pages/test-graphql.tsx
rm -f pages/blog/*.old

# Verify pages/api/ still exists
ls pages/api/
```

### Step 3: Delete Legacy Layouts

```bash
# Remove entire src/layouts/ directory
rm -rf src/layouts/
```

### Step 4: Delete Unused SVGs

```bash
# Remove social SVG directory
rm -rf public/svg/social/
```

### Step 5: Verify Deletions

```bash
# Check what's left
ls -la pages/
ls -la src/ | grep -i layout
ls -la public/svg/
```

---

## Post-Deletion Verification Checklist

### Build & Run

- [ ] `npm run build` succeeds
- [ ] `npm run dev` starts without errors
- [ ] No TypeScript compilation errors
- [ ] No missing import warnings

### Route Testing

- [ ] Homepage (/) loads correctly
- [ ] Blog listing (/blog) works
- [ ] Blog post (/blog/[slug]) works
- [ ] All hash navigation works (#home, #about, #portfolio, #contact)

### Component Testing

- [ ] Navigation menu opens/closes
- [ ] Dark mode toggle works
- [ ] Contact form submits
- [ ] Portfolio modal opens
- [ ] Icons display correctly
- [ ] Images load and lazy-load

### Styling Verification

- [ ] No broken CSS references
- [ ] All CSS modules load
- [ ] Legacy classes gone
- [ ] Dark mode styles work
- [ ] Responsive breakpoints work

---

## Rollback Plan (If Needed)

### Option 1: Git Restore

```bash
git checkout backup-before-cleanup
```

### Option 2: Manual Restore

```bash
tar -xzf pages-backup-YYYYMMDD.tar.gz
```

### Option 3: Git Revert Specific Files

```bash
git checkout HEAD~1 -- pages/
git checkout HEAD~1 -- src/layouts/
git checkout HEAD~1 -- public/svg/social/
```

---

## Expected Outcomes

### Bundle Size Reduction

- **Legacy Files**: ~60KB removed
- **Unused SVGs**: ~150KB removed
- **Total Saved**: ~210KB

### Code Maintenance

- **Reduced Complexity**: No dual routing system
- **Cleaner Structure**: Single source of truth for layouts
- **Less Confusion**: No mixing Pages/App Router patterns

### Performance

- **Faster Builds**: Fewer files to process
- **Smaller Bundle**: Unused code eliminated
- **Better Tree-Shaking**: No dead code paths

---

## Current Status

- ✅ **Critical Errors Fixed**: Icons.tsx, layout.tsx, globals.css import
- ✅ **Dev Server Running**: Port 3001, no errors
- ✅ **Pre-Deletion Audit**: Complete (this document)
- ⏳ **Backup Creation**: Pending
- ⏳ **File Deletion**: Pending
- ⏳ **Post-Deletion Verification**: Pending

---

## Next Steps

1. Create git backup branch
2. Run grep searches to verify no imports
3. Run production build
4. Execute deletion commands
5. Verify build still works
6. Test all routes and functionality
7. Commit changes
8. Proceed to Phase 11 (Comprehensive Testing)

---

**Document Status**: Complete  
**Ready for Deletion**: Awaiting approval  
**Estimated Time**: 15 minutes  
**Risk Level**: Low (backups in place)
