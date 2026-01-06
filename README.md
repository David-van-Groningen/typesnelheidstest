# ⌨️ Typsnelheidstest

Een moderne en interactieve **typsnelheidstest** gebouwd met **HTML, CSS en JavaScript**.
Deze applicatie meet hoe snel en nauwkeurig je kunt typen binnen een vastgestelde tijd.

## 🚀 Functionaliteiten

- ⏱️ Timer (60s / 45s afhankelijk van moeilijkheid)
- 🎮 Moeilijkheidsniveaus:
  - Makkelijk (korte woorden)
  - Normaal
  - Moeilijk (lange woorden + kortere tijd)
- 📊 Statistieken:
  - Woorden per minuut (WPM)
  - Accuracy (%)
  - Aantal fouten
- 🎨 Dark / Light mode (opgeslagen in localStorage)
- 📱 Volledig mobielvriendelijk
- 🌐 Willekeurige woorden via externe API

## 🗂️ Bestandsstructuur

/
├── index.html
├── style.css
└── script.js

markdown
Code kopiëren

## 🛠️ Gebruikte technologieën

- HTML5
- CSS3 (CSS variables + media queries)
- JavaScript (ES6)
- Fetch API
- LocalStorage

## 🌍 API

Willekeurige woorden worden opgehaald via:

https://random-word-bit.vercel.app/word

markdown
Code kopiëren

## ▶️ Gebruik

1. Open `index.html` in je browser
2. Kies een moeilijkheid
3. Klik op **Start**
4. Typ de woorden zo snel en correct mogelijk
5. Bekijk je resultaten na afloop

## 📈 Berekeningen

- **WPM** = totaal getypte karakters ÷ 5
- **Accuracy** = (correcte woorden ÷ totaal ingevoerde woorden) × 100

## 👤 Auteur

Volledig zelfgemaakt als frontend project / oefening.
