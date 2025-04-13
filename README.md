# ✅ KÉRDŐÍV SZERKESZTŐ ALKALMAZÁS (Survey Editor Application)

Ez a projekt az **SZTE Webfejlesztési keretrendszerek** kurzus keretében készült, Angular alapú kérdőív szerkesztő alkalmazás. A projekt teljesíti az első mérföldkő követelményeit, továbbá opcionális biztonsági funkciókat is tartalmaz.

## 🎯 Funkcionalitás (Első mérföldkő és bővítések)

- ✔️ Regisztráció Firebase Auth használatával (email + jelszó, teljes név mentése)
- ✔️ Kötelező e-mail megerősítés belépés előtt
- ✔️ Bejelentkezés email és jelszó alapján
- ✔️ E-mail megerősítés újraküldés lehetősége
- ✔️ Elfelejtett jelszó visszaállítása (email alapján)
- ✔️ Kérdőívek létrehozása (cím, leírás, kérdések, tag-ek)
- ✔️ Kérdések külön kollekcióban mentve
- ✔️ Kérdőívek listázása, saját szűrés Pipe segítségével
- ✔️ Kérdőív részletes megtekintése (kérdésekkel együtt)
- ✔️ Angular Material (15+ komponens használatban)
- ✔️ Reactive Formok és validációk
- ✔️ Saját `Pipe`: teljes név rövidítése (pl. „Mikó Sándor” → „M. Sándor”)
- ✔️ @Input, @Output kommunikáció komponensek között

## 🔒 Biztonság és jogosultságkezelés

- 🔐 Firebase email-verifikáció beépítve
- 🔐 Firestore szabályok: csak saját adatok írhatók, kérdőívek csak bejelentkezve olvashatók
- 🔐 .gitignore fájlban minden érzékeny/épített/adatfájl kizárva

## 📁 Mappastruktúra (részlet)
- `src/app/components/` – Komponensek (login, register, profile, survey-list, stb.)
- `src/app/services/` – AuthService, SurveyService, QuestionService
- `src/app/models/` – Adatmodellek (User, Survey, Question, Tag)

## 🚀 Indítás fejlesztői módban

```bash
npm install
ng serve
```

## 🏁 Build és deploy

```bash
ng build --configuration production
firebase deploy
```

---

> Készítette: Mikó Sándor – 2025. április
