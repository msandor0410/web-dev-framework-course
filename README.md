# ✅ KÉRDŐÍV SZERKESZTŐ ALKALMAZÁS (Survey Editor Application)

Ez a projekt az **SZTE Webfejlesztési keretrendszerek** kurzus keretében készült. Egy Angular + Firebase alapú kérdőív-szerkesztő alkalmazás, amely teljesíti az első mérföldkő összes követelményét, továbbá opcionális biztonsági funkciókat is tartalmaz.

## 🎯 Funkcionalitás (1. mérföldkő + bővítések)

- ✔️ Regisztráció Firebase Auth használatával (email + jelszó, teljes név mentése)
- ✔️ Kötelező e-mail megerősítés belépés előtt
- ✔️ Bejelentkezés email és jelszó alapján
- ✔️ E-mail megerősítő levél újraküldése
- ✔️ Elfelejtett jelszó visszaállítása (email alapján)
- ✔️ Kérdőívek létrehozása (cím, leírás, kérdések, tag-ek)
- ✔️ Kérdések külön `questions` kollekcióban tárolva
- ✔️ Kérdőívek listázása, saját kérdőívek szűrése Pipe segítségével
- ✔️ Kérdőív részletes megtekintése (kérdésekkel együtt)
- ✔️ Angular Material (15+ komponens használatban)
- ✔️ Reactive Forms és validációk
- ✔️ Saját `Pipe`: teljes név rövidítése (pl. „Mikó Sándor” → „M. Sándor”)
- ✔️ `@Input()` és `@Output()` kommunikáció komponensek között

## 🔒 Biztonság és jogosultságkezelés

- 🔐 Email-verifikáció kötelező bejelentkezéshez
- 🔐 Firestore szabályok:
  - saját adatok írhatók
  - kérdőívek csak bejelentkezve olvashatók
- 🔐 `.gitignore`: minden érzékeny, épített és ideiglenes fájl kizárva

## 📁 Mappastruktúra (részlet)

```
src/
├── app/
│   ├── components/       # Login, Register, Profile, SurveyList, stb.
│   ├── services/         # AuthService, SurveyService, QuestionService
│   ├── models/           # User, Survey, Question, Tag modellek
```

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

🌐 **Elérhető**: https://survey-app-25.web.app

---

> ✍️ Készítette: Mikó Sándor — 2025. április
