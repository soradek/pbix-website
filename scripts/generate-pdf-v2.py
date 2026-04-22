# -*- coding: utf-8 -*-
"""
PDF generator for pbix.pl training programs.
Styling consistent with the website (Inter font, #1e9953 green, #1d1d1f dark, #6e6e73 gray).
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os, textwrap

# ── Fonts ────────────────────────────────────────────
FONT_DIR = os.path.join(os.path.dirname(__file__), 'fonts')
pdfmetrics.registerFont(TTFont('Inter',    os.path.join(FONT_DIR, 'Inter-Regular.ttf')))
pdfmetrics.registerFont(TTFont('InterSB',  os.path.join(FONT_DIR, 'Inter-SemiBold.ttf')))
pdfmetrics.registerFont(TTFont('InterB',   os.path.join(FONT_DIR, 'Inter-Bold.ttf')))

# ── Colors ───────────────────────────────────────────
GREEN        = HexColor('#1e9953')
GREEN_LIGHT  = HexColor('#f0faf5')
GREEN_BORDER = HexColor('#c8e6d5')
DARK         = HexColor('#1d1d1f')
GRAY         = HexColor('#6e6e73')
LIGHT_GRAY   = HexColor('#f5f5f7')
BORDER       = HexColor('#e0e0e0')
WHITE        = white

W, H = A4
MARGIN = 22 * mm

# ── Training data ────────────────────────────────────
TRAININGS = [
  {
    'slug': 'microsoft-power-bi',
    'title': 'Microsoft Power BI',
    'category': 'Power BI',
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

# ── Helpers ──────────────────────────────────────────
def rr(c, x, y, w, h, r, fill=None, stroke=None, sw=0.5):
    """Draw a rounded rectangle."""
    p = c.beginPath()
    p.roundRect(x, y, w, h, r)
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.drawPath(p, fill=bool(fill), stroke=bool(stroke))


def wrap(text, width=90):
    return textwrap.wrap(text, width=width)


# ── PDF builder ──────────────────────────────────────
class PDF:
    def __init__(self, path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        self.c = canvas.Canvas(path, pagesize=A4)
        self.y = H
        self._page = 1

    def _footer(self):
        c = self.c
        fy = 13 * mm
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.4)
        c.line(MARGIN, fy + 4.5 * mm, W - MARGIN, fy + 4.5 * mm)
        c.setFont('Inter', 7.5)
        c.setFillColor(GREEN)
        c.drawString(MARGIN, fy, 'www.pbix.pl')
        c.setFillColor(GRAY)
        c.drawRightString(W - MARGIN, fy, 'kontakt@pbix.pl')

    def new_page(self):
        self._footer()
        self.c.showPage()
        self._page += 1
        self.y = H - MARGIN

    def need(self, h):
        if self.y - h < 20 * mm:
            self.new_page()

    def save(self):
        self._footer()
        self.c.save()


def build(training, pdf):
    c = pdf.c
    cw = W - 2 * MARGIN  # content width

    # ══════════════════════════════════════════════════
    # HEADER — dark background
    # ══════════════════════════════════════════════════
    hdr_h = 58 * mm

    # Dark bg
    c.setFillColor(DARK)
    c.rect(0, H - hdr_h, W, hdr_h, fill=1, stroke=0)

    # Green accent line at bottom of header
    c.setFillColor(GREEN)
    c.rect(0, H - hdr_h, W, 2, fill=1, stroke=0)

    # "Szkolenie" — semibold label
    c.setFont('InterSB', 9)
    c.setFillColor(HexColor('#9a9a9f'))
    c.drawString(MARGIN, H - 15 * mm, 'SZKOLENIE')

    # Title
    c.setFont('InterB', 24)
    c.setFillColor(WHITE)
    c.drawString(MARGIN, H - 26 * mm, training['title'])

    # Meta line: duration | language
    meta = f"{training['duration']}  ·  {training.get('language', 'polski')}"
    c.setFont('Inter', 9)
    c.setFillColor(HexColor('#888890'))
    c.drawString(MARGIN, H - 33 * mm, meta)

    # Pricing boxes
    box_w = 37 * mm
    box_h = 14 * mm
    box_gap = 5 * mm
    box_y = H - hdr_h + 7.5 * mm

    for i, (lbl, price) in enumerate(training['pricing']):
        bx = MARGIN + i * (box_w + box_gap)
        rr(c, bx, box_y, box_w, box_h, 2.5 * mm, fill=HexColor('#2c2c30'))
        # price
        c.setFont('InterB', 12.5)
        c.setFillColor(WHITE)
        c.drawCentredString(bx + box_w / 2, box_y + box_h - 5.5 * mm, price)
        # label
        c.setFont('Inter', 7)
        c.setFillColor(HexColor('#9a9a9f'))
        c.drawCentredString(bx + box_w / 2, box_y + 2 * mm, lbl)

    # "(netto za grupę)"
    note_x = MARGIN + 3 * (box_w + box_gap)
    c.setFont('Inter', 7.5)
    c.setFillColor(HexColor('#707078'))
    c.drawString(note_x, box_y + box_h / 2 - 1, '(netto za grupę)')

    pdf.y = H - hdr_h - 12 * mm

    # ══════════════════════════════════════════════════
    # DESCRIPTION
    # ══════════════════════════════════════════════════
    for line in wrap(training['description'], 96):
        pdf.need(14)
        c.setFont('Inter', 9.5)
        c.setFillColor(HexColor('#444448'))
        c.drawString(MARGIN, pdf.y, line)
        pdf.y -= 14
    pdf.y -= 8 * mm

    # ══════════════════════════════════════════════════
    # SECTION helper
    # ══════════════════════════════════════════════════
    def section(title):
        pdf.need(14 * mm)
        # Green pill/badge left accent
        c.setFillColor(GREEN)
        c.rect(MARGIN, pdf.y + 1, 3.5, 15, fill=1, stroke=0)
        c.setFont('InterSB', 12)
        c.setFillColor(DARK)
        c.drawString(MARGIN + 8, pdf.y + 2, title)
        pdf.y -= 9 * mm

    def bullets(items, indent=8, font_size=9, wrap_w=89):
        for item in items:
            lines = wrap(item, wrap_w)
            pdf.need(len(lines) * 13 + 5)
            # Green dot
            c.setFillColor(GREEN)
            c.circle(MARGIN + indent - 2, pdf.y + 3.5, 1.8, fill=1, stroke=0)
            c.setFont('Inter', font_size)
            c.setFillColor(DARK)
            first = True
            for line in lines:
                x = MARGIN + indent + 3 if first else MARGIN + indent + 3
                c.drawString(x, pdf.y, line)
                pdf.y -= 13
                first = False
            pdf.y -= 3

    # ══════════════════════════════════════════════════
    # DLA KOGO
    # ══════════════════════════════════════════════════
    section('Dla kogo')
    bullets(training['target_audience'])
    pdf.y -= 6 * mm

    # ══════════════════════════════════════════════════
    # CZEGO SIĘ NAUCZY ZESPÓŁ
    # ══════════════════════════════════════════════════
    section('Czego nauczy się zespół')
    bullets(training['benefits'])
    pdf.y -= 6 * mm

    # ══════════════════════════════════════════════════
    # PROGRAM SZKOLENIA
    # ══════════════════════════════════════════════════
    section('Program szkolenia')

    for mod_title, items in training['program']:
        pdf.need(12 * mm)

        # Module header — light gray bg strip
        mh = 8 * mm
        rr(c, MARGIN, pdf.y - 1.5 * mm, cw, mh, 2 * mm, fill=LIGHT_GRAY)

        c.setFont('InterSB', 9.5)
        c.setFillColor(DARK)
        c.drawString(MARGIN + 4 * mm, pdf.y + 2, mod_title)
        pdf.y -= mh + 2 * mm

        for item in items:
            lines = wrap(item, 85)
            pdf.need(len(lines) * 12 + 4)
            c.setFont('Inter', 7.5)
            c.setFillColor(GRAY)
            c.drawString(MARGIN + 5 * mm, pdf.y + 2, '–')
            c.setFont('Inter', 9)
            c.setFillColor(DARK)
            for i, line in enumerate(lines):
                c.drawString(MARGIN + 10 * mm, pdf.y, line)
                pdf.y -= 12
            pdf.y -= 2
        pdf.y -= 4 * mm

    # ══════════════════════════════════════════════════
    # WYMAGANIA WSTĘPNE
    # ══════════════════════════════════════════════════
    section('Wymagania wstępne')
    c.setFont('Inter', 9)
    c.setFillColor(DARK)
    c.drawString(MARGIN, pdf.y, training['prerequisites'])
    pdf.y -= 8 * mm



# ── Main ─────────────────────────────────────────────
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'programs')

for t in TRAININGS:
    out = os.path.join(OUT_DIR, f"{t['slug']}.pdf")
    pdf = PDF(out)
    build(t, pdf)
    pdf.save()
    size = os.path.getsize(out)
    print(f"OK  {t['slug']}.pdf  ({size:,} bytes)")
