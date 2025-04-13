# ✅ KÉRDŐÍV SZERKESZTŐ ALKALMAZÁS (Survey Editor Application)

Ez a projekt az **SZTE Webfejlesztési keretrendszerek** kurzus keretében készült, Angular alapú kérdőív szerkesztő alkalmazás. A projekt az első mérföldkő követelményeinek teljesítését célozza.

## 🎯 Funkcionalitás (Első mérföldkő)

- ✔️ Regisztráció és bejelentkezés Firebase használatával
- ✔️ Kérdőívek létrehozása cím, leírás, kérdések és címkék (tag-ek) megadásával
- ✔️ Kérdések típusának kezelése (text, checkbox, radio)
- ✔️ Kérdőívek listázása, saját kérdőívek szűrése
- ✔️ Kérdőív részletes megtekintése
- ✔️ Saját `Pipe`: teljes név rövidítése
- ✔️ Szülő-gyermek komponens kommunikáció (`@Input`, `@Output`)
- ✔️ Angular formok használata (Reactive Forms)
- ✔️ Angular Material komponensek (10+)

## 🔧 Technológiák

- Angular 15+
- Angular Material
- Firebase (Auth, Firestore)
- TypeScript
- SCSS

## 🧱 Adatmodellek

- `User` – Felhasználó (név, email, UID)
- `Survey` – Kérdőív
- `Question` – Kérdés (külön kollekció)
- `Tag` – Címke (egyszerű string listaként)

## 📁 Projektstruktúra

```
src/
├── app/
│   ├── components/
│   ├── models/
│   ├── services/
│   ├── pipes/
│   └── app.routes.ts
└── environments/
```

## 🚀 Indítás lokálisan

1. `npm install`
2. `ng serve -o`

## 📡 Hosting

Az alkalmazás a 2. mérföldkőre kerül publikálásra Firebase Hosting-ra.

## 👨‍💻 Készítette

Mikó Sándor (J9L8IC)  
Kurzus: Webfejlesztési keretrendszerek, SZTE  
