# Google Consent Mode v2 - Implementacja

## Przegląd

Strona pbix.pl używa **Google Consent Mode v2** — standardu który pozwala GA4 funcjonować prawidłowo z systemem zarządzania zgodą (cookie banner).

## Jak działa

### 1. Ustawienia domyślne (`gtag('consent', 'default')`)
```javascript
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  wait_for_update: 500
});
```
- **Domyślnie**: analityka i reklamy są **odrzucone**
- **wait_for_update: 500**: GA4 czeka 500ms na zmianę zgody
- To jest zgodne z RODO — nic nie zbiera się bez zgody

### 2. Banner cookies (`CookieBanner.tsx`)
Użytkownik kliknie:
- ✅ **Akceptuj wszystkie** → oba storage ustawione na `granted`
- ❌ **Odrzuć** → oba storage ustawione na `denied`
- ⚙️ **Ustawienia** → zależy od wyboru

### 3. Aktualizacja zgody (`TrackingScripts.tsx`)
Gdy użytkownik zmieni zdanie:
```javascript
gtag('consent', 'update', {
  analytics_storage: 'granted' | 'denied',
  ad_storage: 'granted' | 'denied'
});
```

## Zmienne zgody

| Zmienna | Co to oznacza |
|---------|--------------|
| `analytics_storage` | GA4, Vercel Analytics — zbieranie danych o ruchu |
| `ad_storage` | Meta Pixel, LinkedIn Insight — pixel marketingowe |

## Storage w LocalStorage

Zgoda zapisywana w `localStorage`:
```javascript
{
  "necessary": true,     // zawsze true (wymagane do działania)
  "analytics": boolean,  // GA4, Vercel
  "marketing": boolean,  // Meta, LinkedIn
  "timestamp": number
}
}
```

Klucz: `pbix_consent_v1`

## Test / Weryfikacja

### DevTools
```javascript
// Sprawdzić czy gtag jest załadowany
window.gtag

// Sprawdzić bieżący consent state
// (GA4 nie ma bezpośredniej funkcji, ale można zobaczyć w Network tab)
```

### Network tab
1. Otwórz DevTools → Network
2. Kliknij "Akceptuj wszystkie"
3. Szukaj żądań do `region*.google-analytics.com/g/collect`
4. Jeśli pojawią się → consent mode działa

### Google Analytics
1. GA4 Dashboard → Raporty → Czas rzeczywisty
2. Powinieneś zobaczyć siebie jako aktywnego użytkownika
3. Jeśli widać → Consent Mode zadziałał

## Zgodność z RODO

✅ **Compliant** – zbieranie tylko po zgodzie
✅ **Implicit consent** – banner pojawia się automatycznie
✅ **Easily revocable** – ustawienia cookies w stopce
✅ **Transparent** – polityka prywatności opisuje wszystko

## Dokumentacja Google

- https://developers.google.com/tag-platform/security/guides/consent
- https://support.google.com/analytics/answer/9976101

## Implementacja

Pliki zaangażowane:
- `components/TrackingScripts.tsx` — inicjalizacja Consent Mode
- `components/CookieBanner.tsx` — UI i logic zgody
- `lib/consent.ts` — zarządzanie localStorage zgodą
- `app/layout.tsx` — montaż komponentów
