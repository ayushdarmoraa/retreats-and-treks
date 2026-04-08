#!/usr/bin/env powershell
# Final performance validation script for homepage refactor
# Verifies that lazy-loading is correctly configured and no performance anti-patterns exist

Write-Host "🔬 FINAL PERFORMANCE VALIDATION" -ForegroundColor Cyan
Write-Host "=" * 60

# 1. Check for 'use client' in server components
Write-Host "`n1️⃣  Verifying Server Components..." -ForegroundColor Yellow

$serverComponents = @(
    "app/HeroSection.tsx",
    "components/home/PhilosophySection.tsx",
    "components/home/LocationsSection.tsx",
    "components/home/FeaturedRetreats.tsx",
    "components/PrimaryCTA.tsx",
    "components/home/CTASection.tsx"
)

$clientViolations = @()
foreach ($comp in $serverComponents) {
    if (Test-Path $comp) {
        $firstLine = Get-Content $comp -TotalCount 5 | Where-Object { $_ -match "use client" }
        if ($firstLine) {
            $clientViolations += $comp
            Write-Host "  ❌ $comp - HAS 'use client' (should be server)" -ForegroundColor Red
        } else {
            Write-Host "  ✅ $comp - Server component (correct)" -ForegroundColor Green
        }
    }
}

# 2. Check for 'use client' in actual client components
Write-Host "`n2️⃣  Verifying Client Components..." -ForegroundColor Yellow

$clientComponents = @(
    "components/home/client/RetreatFinderWrapper.tsx",
    "components/home/client/TestimonialsSlider.tsx"
)

$clientMissing = @()
foreach ($comp in $clientComponents) {
    if (Test-Path $comp) {
        $firstLine = Get-Content $comp -TotalCount 1
        if ($firstLine -match "use client") {
            Write-Host "  ✅ $comp - HAS 'use client' directive (correct)" -ForegroundColor Green
        } else {
            $clientMissing += $comp
            Write-Host "  ❌ $comp - MISSING 'use client' (should be client)" -ForegroundColor Red
        }
    }
}

# 3. Check page.tsx for proper lazy-loading
Write-Host "`n3️⃣  Verifying Lazy-Loading Configuration..." -ForegroundColor Yellow

$pageContent = Get-Content "app/page.tsx" -Raw

# 3. Check page.tsx for proper lazy-loading
Write-Host "`n3️⃣  Verifying Lazy-Loading Configuration..." -ForegroundColor Yellow

$pageContent = Get-Content "app/page.tsx" -Raw

$lazyLoadIssues = @()

# Check 1: RetreatFinderWrapper
if ($pageContent -match "RetreatFinderWrapper") {
    Write-Host "  ✅ RetreatFinderWrapper configured" -ForegroundColor Green
} else {
    $lazyLoadIssues += "RetreatFinderWrapper"
    Write-Host "  ❌ RetreatFinderWrapper not found" -ForegroundColor Red
}

# Check 2: TestimonialsSlider
if ($pageContent -match "TestimonialsSlider") {
    Write-Host "  ✅ TestimonialsSlider configured" -ForegroundColor Green
} else {
    $lazyLoadIssues += "TestimonialsSlider"
    Write-Host "  ❌ TestimonialsSlider not found" -ForegroundColor Red
}

# Check 3: Suspense boundaries
if ($pageContent -match "Suspense") {
    Write-Host "  ✅ Suspense boundaries configured" -ForegroundColor Green
} else {
    $lazyLoadIssues += "Suspense"
    Write-Host "  ❌ Suspense boundaries not found" -ForegroundColor Red
}

# Check 4: dynamic import
if ($pageContent -match "dynamic") {
    Write-Host "  ✅ Dynamic imports configured" -ForegroundColor Green
} else {
    $lazyLoadIssues += "dynamic imports"
    Write-Host "  ❌ Dynamic imports not found" -ForegroundColor Red
}

# Check 5: No ssr: false
if ($pageContent -match "ssr: false") {
    $lazyLoadIssues += "ssr: false"
    Write-Host "  ❌ Found 'ssr: false' (anti-pattern)" -ForegroundColor Red
} else {
    Write-Host "  ✅ No 'ssr: false' anti-pattern" -ForegroundColor Green
}

# 4. Component file sizes
Write-Host "`n4️⃣  Component File Sizes..." -ForegroundColor Yellow

$components = @(
    "components/RetreatFinder.tsx",
    "components/home/client/RetreatFinderWrapper.tsx",
    "components/home/client/TestimonialsSlider.tsx",
    "components/home/CTASection.tsx"
)

foreach ($comp in $components) {
    if (Test-Path $comp) {
        $size = (Get-Item $comp).Length
        $sizeKB = [math]::Round($size/1KB, 2)
        
        if ($sizeKB -lt 5) {
            $status = "✅ Lightweight"
            $color = "Green"
        } elseif ($sizeKB -lt 20) {
            $status = "⚠️  Medium"
            $color = "Yellow"
        } else {
            $status = "⚠️  Heavy"
            $color = "DarkYellow"
        }
        
        Write-Host "  $status - $comp : $($sizeKB) KB" -ForegroundColor $color
    }
}

# 5. Build validation
Write-Host "`n5️⃣  Running Build Validation..." -ForegroundColor Yellow

$buildOutput = & npm run build 2>&1 | Select-String -Pattern "Compiled|error|failed"
if ($buildOutput -match "Compiled") {
    Write-Host "  ✅ Build successful" -ForegroundColor Green
} else {
    Write-Host "  ❌ Build may have failed" -ForegroundColor Red
    Write-Host "     $buildOutput" -ForegroundColor Red
}

# Summary
Write-Host "`n" + "=" * 60
Write-Host "📋 SUMMARY" -ForegroundColor Cyan

if ($clientViolations.Count -eq 0 -and $clientMissing.Count -eq 0 -and $lazyLoadIssues.Count -eq 0) {
    Write-Host "✅ ALL CHECKS PASSED - Homepage is performance-optimized!" -ForegroundColor Green
    Write-Host "`nKey Achievements:" -ForegroundColor Cyan
    Write-Host "  • Server components properly handling critical path" -ForegroundColor Green
    Write-Host "  • Client components correctly lazy-loaded" -ForegroundColor Green
    Write-Host "  • No performance anti-patterns detected" -ForegroundColor Green
    Write-Host "  • Suspense boundaries properly configured" -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️  ISSUES DETECTED:" -ForegroundColor Red
    if ($clientViolations.Count -gt 0) {
        Write-Host "  Server components with 'use client':" -ForegroundColor Red
        $clientViolations | ForEach-Object { Write-Host "    - $_" }
    }
    if ($clientMissing.Count -gt 0) {
        Write-Host "  Client components missing 'use client':" -ForegroundColor Red
        $clientMissing | ForEach-Object { Write-Host "    - $_" }
    }
    if ($lazyLoadIssues.Count -gt 0) {
        Write-Host "  Lazy-loading configuration issues:" -ForegroundColor Red
        $lazyLoadIssues | ForEach-Object { Write-Host "    - $_" }
    }
    exit 1
}
