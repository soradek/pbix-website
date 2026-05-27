# Logo downloader dla pbix.pl clients
# Pobiera logotypy z Clearbit API i bezpośrednich URL-ów

$TEMP_FOLDER = "public/logos_temp"
New-Item -ItemType Directory -Force -Path $TEMP_FOLDER | Out-Null

# Lista firm z domenami do Clearbit API
$COMPANIES = @(
    @{ name = "Volkswagen Group Polska"; domain = "volkswagen.com"; slug = "volkswagen"; url = $null }
    @{ name = "OLX Group"; domain = "olx.com"; slug = "olx"; url = $null }
    @{ name = "Lufthansa"; domain = "lufthansa.com"; slug = "lufthansa"; url = $null }
    @{ name = "Coca-Cola"; domain = "coca-cola.com"; slug = "coca-cola"; url = $null }
    @{ name = "Zoetis"; domain = "zoetis.com"; slug = "zoetis"; url = $null }
    @{ name = "Zabka"; domain = "zabka.pl"; slug = "zabka"; url = $null }
    @{ name = "Unilever"; domain = "unilever.com"; slug = "unilever"; url = $null }
    @{ name = "INDITEX"; domain = "inditex.com"; slug = "inditex"; url = $null }
    @{ name = "PepsiCo"; domain = "pepsico.com"; slug = "pepsico"; url = $null }
    @{ name = "Grupa Zywiec"; domain = "grupazywiec.pl"; slug = "grupa-zywiec"; url = $null }
    @{ name = "Ringier Axel Springer Polska"; domain = "merito.pl"; slug = "ringier-axel-springer"; url = $null }
    @{ name = "NASK"; domain = "nask.pl"; slug = "nask"; url = $null }
    @{ name = "ABB"; domain = "abb.com"; slug = "abb"; url = $null }
    @{ name = "BD (Becton Dickinson)"; domain = "bd.com"; slug = "becton-dickinson"; url = $null }
    @{ name = "Boston Scientific"; domain = "bostonscientific.com"; slug = "boston-scientific"; url = $null }
    @{ name = "Hitachi Energy"; domain = "hitachienergy.com"; slug = "hitachi-energy"; url = $null }
    @{ name = "Credit Suisse"; domain = "credit-suisse.com"; slug = "credit-suisse"; url = $null }
    @{ name = "Clariant"; domain = "clariant.com"; slug = "clariant"; url = $null }
    @{ name = "Eurocash"; domain = "eurocash.pl"; slug = "eurocash"; url = $null }
    @{ name = "Nivea Beiersdorf"; domain = "beiersdorf.com"; slug = "nivea"; url = $null }
    @{ name = "Aluplast"; domain = "aluplast.com"; slug = "aluplast"; url = $null }
    @{ name = "Kimball Electronics"; domain = "kimballelectronics.com"; slug = "kimball"; url = $null }
    @{ name = "Majorel"; domain = "majorel.com"; slug = "majorel"; url = $null }
    @{ name = "Top Farms"; domain = $null; slug = "top-farms"; url = "https://topfarms.com/build/images/og-image.325b8a7e.webp" }
    @{ name = "OSI Foodworks Polska"; domain = $null; slug = "osi-foodworks"; url = "https://www.osieurope.com/wp-content/uploads/2021/07/OSI-logo-FS-Poland-1.png" }
    @{ name = "Wyzsza Szkola Bankowa"; domain = "wsb.edu.pl"; slug = "wsb"; url = $null }
)

Write-Host "[DOWNLOAD] Pobieranie logotypow...`n" -ForegroundColor Cyan

$success_count = 0
$failed = @()

foreach ($company in $COMPANIES) {
    $slug = $company.slug
    Write-Host "  Pobieranie: $slug... " -NoNewline

    try {
        if ($company.url) {
            $logo_url = $company.url
        } else {
            $logo_url = "https://logo.clearbit.com/$($company.domain)"
        }

        $output_path = Join-Path $TEMP_FOLDER "$slug.png"
        Invoke-WebRequest -Uri $logo_url -OutFile $output_path -UserAgent "Mozilla/5.0" -ErrorAction Stop

        Write-Host "OK" -ForegroundColor Green
        $success_count++
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
        $failed += $company.name
    }
}

Write-Host "`n[SUCCESS] Pobrano: $success_count/$($COMPANIES.Count)" -ForegroundColor Green

if ($failed.Count -gt 0) {
    Write-Host "`n[FAILED] Nie powiodlo sie dla:" -ForegroundColor Yellow
    foreach ($name in $failed) {
        Write-Host "  - $name"
    }
} else {
    Write-Host "`n[COMPLETE] Wszystkie logotypy pobrane!" -ForegroundColor Green
}

$file_count = (Get-ChildItem $TEMP_FOLDER -ErrorAction SilentlyContinue).Count
Write-Host "`n[FOLDER] $(Resolve-Path $TEMP_FOLDER)" -ForegroundColor Cyan
Write-Host "[PLIKI] $file_count plikow PNG" -ForegroundColor Cyan
