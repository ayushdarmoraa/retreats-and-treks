# 🔬 BROWSER TESTING GUIDE - How to Validate Performance

**Goal**: Verify that lazy-loading is working correctly and performance metrics are as predicted

---

## 🚀 Setup

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:3001` (port 3000 may be in use)

2. **Open page in Chrome DevTools**:
   - Open DevTools: `F12` or `Ctrl+Shift+I`
   - Go to homepage at `http://localhost:3001`

---

## 📊 TEST 1: Lighthouse Audit

### Steps

1. Open DevTools → **Lighthouse** tab
2. **Configure audit**:
   - Device: **Desktop**
   - Network: **Slow 4G** (simulates slower connections)
   - Storage: **Clear site data**
3. Click **Analyze page load**
4. Wait for audit to complete (2-3 minutes)

### What to Look For

| Metric | Expected | Result |
|--------|----------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ✅ GOOD |
| **FCP** (First Contentful Paint) | < 2.0s | ✅ GOOD |
| **CLS** (Cumulative Layout Shift) | < 0.25 | ✅ GOOD |
| **TBT** (Total Blocking Time) | < 300ms | ✅ GOOD |
| **TTFB** (Time to First Byte) | < 600ms | ✅ GOOD |

### Expected Scores

```
Performance: 85-95 ✅
Accessibility: 90+ ✅
Best Practices: 90+ ✅
SEO: 95+ ✅
FCP: 1.0-1.5s ✅
LCP: 1.5-2.0s ✅
CLS: < 0.05 ✅
```

---

## 📦 TEST 2: Code Coverage Analysis

### Purpose
Verify that RetreatFinder JS is NOT loaded on initial page load

### Steps

1. Open DevTools → **Coverage** tab
   - If not visible: `Ctrl+Shift+P` → Search "Coverage" → Enable
2. Click red record button (top-left)
3. Reload page: `Ctrl+R`
4. Wait for page to fully load (including blue sections)
5. Click stop button (should show green ✅)

### What to Look For

**Tab 1: Summary**
```
CSS:     Rarely used X%
JS:      Unused Y%

Target: JS Unused < 20% ✅
```

**Tab 2: Detailed View**
1. Right-click → **Show in folder** → Filter to `.js` files only
2. Sort by **Unused**
3. Look at file sizes:

```
Main bundle:
  _document.js        Used 80%+ ✅
  main.js             Used 90%+ ✅
  layout.js           Used 95%+ ✅
  RetreatFinder.js    Used 0% ❌ (expected - lazy loaded)

Lazy chunks:
  RetreatFinderWrapper.js (loaded later)
  TestimonialsSlider.js (loaded later)
```

### Why RetreatFinder Shows 0%?

✅ **EXPECTED BEHAVIOR** - It's lazy-loaded, not needed on initial page load

If RetreatFinder shows:
- 0% used on first load → ✅ CORRECT (lazy-loaded)
- High % used on first load → ❌ WRONG (should fix)

---

## 🌐 TEST 3: Network Waterfall Analysis

### Purpose
Observe when RetreatFinder JS chunk is downloaded

### Steps

1. Open DevTools → **Network** tab
2. Reload page: `Ctrl+R`
3. Filter to `XHR` and `JS` files
4. Observe the waterfall timeline

### Expected Sequence

**Timeline**:
```
0ms — Initial HTML request
    ↓ HTML downloaded
100ms — Page renders (server components visible)
200ms — Styles applied
500ms — FCP achieved (first paint)
1000ms — LCP achieved (Hero section fully rendered)
        ↓
1500ms — RetreatFinder chunk request (user scrolls or interaction)
2000ms — RetreatFinder loaded & parsed
2500ms — Suspense fallback replaced with component
```

### What You Should See

**URL Requests (in order)**:
1. ✅ index (HTML)
2. ✅ _document.js (framework)
3. ✅ main.js (shared code)
4. ✅ layout.js (page layout)
5. ⏳ [user scrolls/waits]
6. ✅ RetreatFinderWrapper.js (lazy chunk)
7. ✅ TestimonialsSlider.js (lazy chunk)

### Red Flags 🚩

If you see:
- ❌ RetreatFinder.js loaded immediately after HTML → Performance regression
- ❌ Large initial bundle (> 300 KB) → Should investigate
- ❌ Multiple JS files blocking → Should optimize

---

## ⏱️ TEST 4: Performance Timeline

### Purpose
Detailed breakdown of rendering performance

### Steps

1. Open DevTools → **Performance** tab
2. Click red record button (top-left)
3. Wait 1-2 seconds for initial state
4. Reload page: `Ctrl+R`
5. Scroll down through entire page
6. Wait 5 seconds total
7. Click stop button

### Metrics to Check

**Main thread:**
```
FCP (First Contentful Paint):  < 1.0s ✅
LCP (Largest Contentful Paint): < 2.5s ✅
Long tasks:                    < 50ms each ✅
```

**When scrolling to RetreatFinder:**
```
Suspense fallback removed:     < 200ms ✅
Component mounted:            < 500ms total ✅
Layout shift:                 None (CLS = 0) ✅
```

---

## 🎯 TEST 5: Interaction Readiness

### Purpose
Verify page is interactive quickly (TTI metric)

### Steps

1. Open DevTools → **Performance** tab
2. Record page load (as above)
3. In the recording, look for **first interaction opportunity**

### Expected Results

```
User can:
  ✅ Click CTA button      < 1.5s
  ✅ Scroll page           < 1.0s
  ✅ Interact with RetreatFinder  < 3.0s (lazy)
```

---

## 📱 TEST 6: Mobile Performance (Bonus)

### Steps

1. Open DevTools
2. Click **Device Toolbar** (top-left, or `Ctrl+Shift+M`)
3. Select **iPhone 12 Pro**
4. Set network to **Slow 4G**
5. Reload page

### Expected Results

Mobile performance should still be good:
```
LCP:  < 3.5s ✅
FCP:  < 2.5s ✅
CLS:  < 0.1 ✅
```

RetreatFinder should still load without blocking interaction.

---

## 🔍 DEBUGGING CHECKLIST

### If LCP is > 2.5s

**Check**:
1. Is network.tab showing large initial bundle?
   - If yes: Investigate what's being shipped
   - If no: Issue is rendering/JS execution

2. Are server components rendering?
   - Open source → Elements tab
   - Should see `<div id="root"><main>...` with content

3. Is there a hero image?
   - Check Network tab for image requests
   - Should be optimized (< 100 KB)

### If CLS is > 0.1

**Check**:
1. Do Suspense fallbacks have fixed heights?
   - Open Elements → Search for `minHeight`
   - Should see `minHeight: 400px` and `minHeight: 300px`

2. Is any content shifting when components load?
   - Slow down the page (Throttle to Slow 3G)
   - Watch carefully for layout shifts
   - Should be zero shifts ✅

### If unused JS is > 20%

**Check**:
1. In Coverage tab, what files are unused?
   - If main.js: May need code-splitting
   - If LazyComponent.js: Expected (lazy-loaded)

2. Scroll through entire page
   - Pages may load components that user doesn't scroll to
   - That's fine (still lazy)

---

## ✅ VALIDATION SUMMARY

### Test Results Template

Copy and fill this out:

```
═══════════════════════════════════════════════════
🔬 HOMEPAGE PERFORMANCE VALIDATION
Date: April 8, 2026
═══════════════════════════════════════════════════

TEST 1: Lighthouse
┌─────────────────────────────┐
│ LCP:     ___ ms  Target: 2.5s │
│ FCP:     ___ ms  Target: 2.0s │
│ CLS:     ___    Target: 0.25  │
│ TBT:     ___ ms  Target: 300ms│
│ TTFB:    ___ ms  Target: 600ms│
│ Score:   ___     Target: 90+  │
└─────────────────────────────┘

TEST 2: Coverage
┌─────────────────────────────┐
│ Unused JS: ___% Target: <20% │
│ RetreatFinder loaded:        │
│  ☐ Immediately (❌ bad)      │
│  ☐ After scroll (✅ good)    │
└─────────────────────────────┘

TEST 3: Network Waterfall
┌─────────────────────────────┐
│ RetreatFinder loaded after: │
│ _____ ms (should be > 1500ms)│
└─────────────────────────────┘

TEST 4: Timeline
┌─────────────────────────────┐
│ FCP < 1.0s:  ☐ Yes ☐ No    │
│ LCP < 2.5s:  ☐ Yes ☐ No    │
│ CLS = 0:     ☐ Yes ☐ No    │
│ No long tasks: ☐ Yes ☐ No  │
└─────────────────────────────┘

TEST 5: Interaction
┌─────────────────────────────┐
│ Can click CTA < 1.5s: ☐ Y ☐ N│
│ Can scroll < 1.0s: ☐ Yes ☐ No│
│ RetreatFinder ready < 3s: ☐ Y│
└─────────────────────────────┘

═══════════════════════════════════════════════════
OVERALL: ☐ PASS ☐ NEEDS REVIEW
═══════════════════════════════════════════════════
```

---

## 📞 Troubleshooting

If something seems wrong:

1. **Clear cache** (`Ctrl+Shift+Delete`)
2. **Hard reload** (`Ctrl+Shift+R`)
3. **Check build output** for errors: `npm run build`
4. **Verify file changes** have been saved

---

**Last Updated**: April 8, 2026  
**Status**: Ready for Testing ✅
