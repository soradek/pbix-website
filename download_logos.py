#!/usr/bin/env python3
"""
Logo downloader and processor for pbix.pl clients
Pobiera logotypy, konwertuje na białe (jeśli potrzeba), zmienia rozmiar
"""

import os
import requests
from PIL import Image
from io import BytesIO
import urllib.parse

# Folder na logotypy tymczasowe
TEMP_FOLDER = "public/logos_temp"
os.makedirs(TEMP_FOLDER, exist_ok=True)

# Lista firm z domenami do Clearbit API + bezpośrednie URL-e dla specjalnych przypadków
# Format: (nazwa_firmy, domena_do_clearbit, slug_nazwy_pliku, bezpośredni_url_jeśli_dostępny)
COMPANIES = [
    ("Volkswagen Group Polska", "volkswagen.com", "volkswagen", None),
    ("OLX Group", "olx.com", "olx", None),
    ("Lufthansa", "lufthansa.com", "lufthansa", None),
    ("Coca-Cola", "coca-cola.com", "coca-cola", None),
    ("Zoetis", "zoetis.com", "zoetis", None),
    ("Żabka", "zabka.pl", "zabka", None),
    ("Unilever", "unilever.com", "unilever", None),
    ("INDITEX", "inditex.com", "inditex", None),
    ("PepsiCo", "pepsico.com", "pepsico", None),
    ("Grupa Żywiec", "grupazywiec.pl", "grupa-zywiec", None),
    ("Ringier Axel Springer Polska", "merito.pl", "ringier-axel-springer", None),
    ("NASK", "nask.pl", "nask", None),
    ("ABB", "abb.com", "abb", None),
    ("BD (Becton Dickinson)", "bd.com", "becton-dickinson", None),
    ("Boston Scientific", "bostonscientific.com", "boston-scientific", None),
    ("Hitachi Energy", "hitachienergy.com", "hitachi-energy", None),
    ("Credit Suisse", "credit-suisse.com", "credit-suisse", None),
    ("Clariant", "clariant.com", "clariant", None),
    ("Eurocash", "eurocash.pl", "eurocash", None),
    ("Nivea Beiersdorf", "beiersdorf.com", "nivea", None),
    ("Aluplast", "aluplast.com", "aluplast", None),
    ("Kimball Electronics", "kimballelectronics.com", "kimball", None),
    ("Majorel", "majorel.com", "majorel", None),
    ("Top Farms", None, "top-farms", "https://topfarms.com/build/images/og-image.325b8a7e.webp"),
    ("OSI Foodworks Polska", None, "osi-foodworks", "https://www.osieurope.com/wp-content/uploads/2021/07/OSI-logo-FS-Poland-1.png"),
    ("Wyższa Szkoła Bankowa", "wsb.edu.pl", "wsb", None),
]

def convert_to_white(img):
    """
    Konwertuje obraz do białego z przezroczystością
    Jeśli obraz jest kolorowy, zamienia kolory na białe
    """
    # Konwertuj do RGBA jeśli nie jest
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Pobierz piksele
    pixels = img.load()
    width, height = img.size

    # Sprawdź czy logotyp jest już przezroczysty (przezroczystość > threshold)
    # Jeśli tak, zamieniamy na białe
    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]

            # Jeśli piksel nie jest całkowicie przezroczysty
            if a > 10:
                # Zamieniamy na biały (255, 255, 255)
                pixels[x, y] = (255, 255, 255, a)

    return img

def resize_image(img, max_height=48):
    """
    Zmienia rozmiar obrazu na maksymalnie max_height pikseli wysokości
    Zachowuje aspect ratio
    """
    ratio = max_height / img.height
    new_width = int(img.width * ratio)
    return img.resize((new_width, max_height), Image.Resampling.LANCZOS)

def download_and_process_logo(company_name, domain, filename_slug, direct_url):
    """
    Pobiera logotyp (Clearbit API lub bezpośredni URL), konwertuje na białe, zmienia rozmiar
    Zwraca True jeśli sukces, False jeśli błąd
    """
    try:
        print(f"  Pobieranie: {filename_slug}...", end=" ")

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

        # Jeśli jest bezpośredni URL, użyj go, inaczej użyj Clearbit API
        if direct_url:
            url = direct_url
        else:
            # Clearbit API zwraca białe, przezroczyste logotypy
            url = f"https://logo.clearbit.com/{domain}"

        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        # Otwórz obraz
        img = Image.open(BytesIO(response.content))

        # Konwertuj do białego (na wypadek gdyby był kolorowy)
        img = convert_to_white(img)

        # Zmień rozmiar
        img = resize_image(img, max_height=48)

        # Zapisz
        output_path = os.path.join(TEMP_FOLDER, f"{filename_slug}.png")
        img.save(output_path, "PNG")

        print(f"✓ ({img.width}x{img.height}px)")
        return True

    except Exception as e:
        print(f"✗ Błąd: {str(e)}")
        return False

print("🚀 Pobieranie i przetwarzanie logotypów...\n")

success_count = 0
failed = []

for company_name, domain, slug, direct_url in COMPANIES:
    success = download_and_process_logo(company_name, domain, slug, direct_url)
    if success:
        success_count += 1
    else:
        failed.append(company_name)

print(f"\n✅ Pobrano: {success_count}/{len(COMPANIES)}")

if failed:
    print(f"\n⚠️  Nie powiodło się dla:")
    for name in failed:
        print(f"  - {name}")
    print(f"\n💡 Dla tych firm sprawdzić ręcznie lub podać nowe URL-e")
else:
    print(f"\n✨ Wszystkie logotypy pobrane pomyślnie!")

print(f"\n📁 Folder: {os.path.abspath(TEMP_FOLDER)}")
print(f"📊 Logotypy: {len(os.listdir(TEMP_FOLDER))} plików PNG")
