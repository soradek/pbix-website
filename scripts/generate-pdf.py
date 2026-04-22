# -*- coding: utf-8 -*-
"""
Generate training-program PDFs using a screenshot-based pipeline.

Why: reportlab/Chromium-native PDFs embed fonts which crash a font-handler on
the user's Windows setup ("Font Capture" exception). This approach renders the
HTML in Chromium, takes a high-DPI screenshot, slices it into A4 pages, and
saves as a flat image-PDF — zero embedded fonts, no crash, and text looks
literally the same as the website because it is a browser screenshot.
"""
import html as html_lib
from pathlib import Path
from io import BytesIO
from playwright.sync_api import sync_playwright
from PIL import Image

SCRIPT_DIR = Path(__file__).parent
TEMPLATE = (SCRIPT_DIR / 'pdf-template.html').read_text(encoding='utf-8')
OUT_DIR = SCRIPT_DIR.parent / 'public' / 'programs'
OUT_DIR.mkdir(parents=True, exist_ok=True)

FONT_PATH = SCRIPT_DIR / 'fonts' / 'inter' / 'InterVariable.ttf'
FONT_URL = FONT_PATH.resolve().as_uri()

# A4 physical dimensions in CSS pixels at 96 DPI
A4_W_PX = 794   # 210mm
A4_H_PX = 1123  # 297mm
DEVICE_SCALE = 2   # 2x DPI → sharp rendering (screenshot at 1588 × 2246)

# ── Training data ────────────────────────────────────
TRAININGS = [
  {
    'slug': 'microsoft-power-bi',
    'title': 'Microsoft Power BI',
    'duration': '2 dni / 16 godzin',
    'language': 'polski lub angielski',
    'pricing': [
      ('do 5 osób', '5 800 zł'),
      ('do 7 osób', '7 500 zł'),
      ('do 10 osób', '8 500 zł'),
    ],
    'description': (
      'Szkolenie „Microsoft Power BI" to idealny start dla zespołów, które chcą wejść w świat '
      'nowoczesnej analizy danych i dynamicznych raportów. Pracownicy poznają pełen proces pracy '
      'z Power BI – od pobierania i przekształcania danych, przez budowanie czytelnych wizualizacji, '
      'aż po publikację raportów dostępnych online i na urządzeniach mobilnych.'
    ),
    'target_audience': [
      'Zespoły pracujące z Power BI Desktop, chcące rozwinąć umiejętności zaawansowanego modelowania i przetwarzania danych',
      'Analitycy potrzebujący efektywnych narzędzi do prowadzenia złożonych analiz i budowania rozbudowanych raportów',
      'Managerowie szukający praktycznych sposobów na szybką i intuicyjną analizę dużych wolumenów danych',
    ],
    'benefits': [
      'Skuteczna analiza danych z wielu źródeł – integracja i czyszczenie danych z różnych systemów',
      'Projektowanie nowoczesnych wizualizacji – estetyczne i przejrzyste dashboardy',
      'Wprowadzenie do języka DAX – miary i kolumny obliczeniowe',
      'Dostępność raportów niezależnie od urządzenia – przeglądarka i aplikacje mobilne',
      'Publikowanie i współdzielenie analiz przez Power BI Service',
    ],
    'program': [
      ('Moduł 1: Wprowadzenie do Power BI', [
        'Czym jest Power BI i jak działa',
        'Kluczowe zalety wykorzystania narzędzia w analizie danych',
      ]),
      ('Moduł 2: Import danych z różnych źródeł', [
        'Pobieranie danych z plików Excel, CSV i tekstowych',
        'Łączenie danych z folderów i ich automatyczne aktualizacje',
      ]),
      ('Moduł 3: Praca z relacjami między danymi', [
        'Automatyczne i ręczne tworzenie relacji',
        'Zarządzanie relacjami – kierunki filtrowania, kardynalność',
        'Organizacja i porządkowanie modeli danych',
      ]),
      ('Moduł 4: Czyszczenie i przygotowanie danych – Power Query', [
        'Przegląd funkcji edytora zapytań',
        'Przekształcenia kolumn i wierszy, zmiana typów danych',
        'Scalanie i dzielenie danych',
        'Operacja unpivot',
        'Automatyczna konsolidacja danych z różnych źródeł',
      ]),
      ('Moduł 5: Analiza danych i język DAX', [
        'Wprowadzenie do języka DAX – co to jest i do czego służy',
        'Tworzenie obliczeń z użyciem kluczowych funkcji (CALCULATE, SUM, COUNT, DIVIDE)',
        'Szybkie miary i własne kolumny obliczeniowe',
        'Budowanie miar wspierających wizualizację',
        'Tworzenie kalendarza dat do analiz czasowych',
      ]),
      ('Moduł 6: Projektowanie przejrzystych wizualizacji', [
        'Konfiguracja widoku strony – rozmiar, układ i proporcje',
        'Przegląd dostępnych wizualizacji i ich zastosowania',
        'Filtrowanie na różnych poziomach (strona, raport, wizualizacja)',
        'Zasady interakcji między wizualizacjami',
        'Formatowanie i wyrównywanie obiektów',
      ]),
      ('Moduł 7: Publikacja i udostępnianie raportów', [
        'Eksport i publikacja raportów w Power BI Online',
        'Udostępnianie analiz dla użytkowników końcowych',
      ]),
    ],
    'prerequisites': 'Mile widziana podstawowa znajomość MS Excel',
  },
]


def esc(s: str) -> str:
    return html_lib.escape(s, quote=False)


def render_html(t: dict) -> str:
    pricing_html = '\n'.join(
        f'<div class="price-box"><div class="price">{esc(price)}</div><div class="label">{esc(lbl)}</div></div>'
        for lbl, price in t['pricing']
    )
    target_html = '\n'.join(f'<li>{esc(x)}</li>' for x in t['target_audience'])
    benefits_html = '\n'.join(f'<li>{esc(x)}</li>' for x in t['benefits'])

    program_html = ''
    for mod_title, items in t['program']:
        items_html = '\n'.join(f'<li>{esc(x)}</li>' for x in items)
        program_html += (
            f'<div class="module">'
            f'<div class="module-header">{esc(mod_title)}</div>'
            f'<ul class="module-items">{items_html}</ul>'
            f'</div>'
        )

    return (
        TEMPLATE
        .replace('{{FONT_URL}}', FONT_URL)
        .replace('{{TITLE}}', esc(t['title']))
        .replace('{{DURATION}}', esc(t['duration']))
        .replace('{{LANGUAGE}}', esc(t['language']))
        .replace('{{PRICING}}', pricing_html)
        .replace('{{DESCRIPTION}}', esc(t['description']))
        .replace('{{TARGET_AUDIENCE}}', target_html)
        .replace('{{BENEFITS}}', benefits_html)
        .replace('{{PROGRAM}}', program_html)
        .replace('{{PREREQUISITES}}', esc(t['prerequisites']))
    )


def screenshot_to_pages(page, training_slug: str) -> list:
    """Render HTML in page, return list of PIL Images — one per A4 page."""
    body_height = page.evaluate('document.body.scrollHeight')
    full_shot = page.screenshot(full_page=True, type='png')
    img = Image.open(BytesIO(full_shot)).convert('RGB')

    page_px_h = A4_H_PX * DEVICE_SCALE
    page_px_w = A4_W_PX * DEVICE_SCALE
    W, H = img.size

    # Guard: ensure the screenshot width matches A4 width
    if W != page_px_w:
        # Resize width proportionally
        new_h = int(H * page_px_w / W)
        img = img.resize((page_px_w, new_h), Image.LANCZOS)
        W, H = img.size

    pages = []
    y = 0
    while y < H:
        box = (0, y, W, min(y + page_px_h, H))
        crop = img.crop(box)
        # Pad to full A4 height if last slice is shorter
        if crop.height < page_px_h:
            padded = Image.new('RGB', (page_px_w, page_px_h), 'white')
            padded.paste(crop, (0, 0))
            crop = padded
        pages.append(crop)
        y += page_px_h

    return pages


def build_pdf(training: dict, page):
    html = render_html(training)
    tmp = SCRIPT_DIR / '_tmp.html'
    tmp.write_text(html, encoding='utf-8')
    page.goto(tmp.resolve().as_uri(), wait_until='networkidle')
    page.evaluate('document.fonts.ready')

    pages = screenshot_to_pages(page, training['slug'])
    tmp.unlink(missing_ok=True)

    out_path = OUT_DIR / f"{training['slug']}.pdf"
    # Save multi-page PDF from images. DPI matches our 2× render scale.
    pages[0].save(
        out_path,
        save_all=True,
        append_images=pages[1:],
        resolution=96 * DEVICE_SCALE,
    )
    size = out_path.stat().st_size
    print(f'OK  {training["slug"]}.pdf  ({len(pages)} pages, {size:,} bytes)')


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(
            viewport={'width': A4_W_PX, 'height': A4_H_PX},
            device_scale_factor=DEVICE_SCALE,
        )
        page = ctx.new_page()
        for t in TRAININGS:
            build_pdf(t, page)
        browser.close()


if __name__ == '__main__':
    main()
