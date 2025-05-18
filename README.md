# ✅ KÉRDŐÍV SZERKESZTŐ ALKALMAZÁS – Survey Editor App

Ez a projekt a **Szegedi Tudományegyetem – Webfejlesztési keretrendszerek** tárgy keretében készült, Angular + Firebase technológiákra építve. A rendszer egy kérdőív szerkesztő alkalmazás, amely lehetővé teszi kérdőívek létrehozását, szerkesztését, megtekintését és listázását, valamint felhasználói hitelesítést és jogosultságkezelést is tartalmaz.

---

## 🔧 FONTOS LOKÁLIS KONFIGURÁCIÓ

A `src/environments/environment.ts` fájlban lokális teszteléshez ezt a Firebase konfigurációt használd:

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDxD0eeXMyN5bDBpX7137BJpwq8MpTZUro",
    authDomain: "survey-app-25-02.firebaseapp.com",
    projectId: "survey-app-25-02",
    storageBucket: "survey-app-25-02.firebasestorage.app",
    messagingSenderId: "431588676989",
    appId: "1:431588676989:web:e1bb7a2cd04c91ab33a814",
    measurementId: "G-SPTSTHFPJT"
  }
};
```

---

## 🥇 1. mérföldkő – Funkcionalitások

| Követelmény | Megvalósítás |
|-------------|--------------|
| ✔️ Regisztráció | Firebase Authentication |
| ✔️ Bejelentkezés | Email + jelszó |
| ✔️ E-mail megerősítés kötelező | Ellenőrzés bejelentkezés előtt |
| ✔️ Elfelejtett jelszó visszaállítása | Email küldéssel |
| ✔️ Reactive Forms + validációk | Minden űrlapon |
| ✔️ Kérdőív létrehozás | Cím, leírás, kérdések, tag-ek |
| ✔️ Kérdések külön kollekcióban | `questions` Firestore gyűjtemény |
| ✔️ Kérdőívek listázása | Alapértelmezett: lapozós |
| ✔️ Nézetváltás (lapozós ↔ összes) | `switchMode()` megvalósítva |
| ✔️ Saját kérdőívek szűrése | `OwnSurveyPipe` alapján |
| ✔️ Teljes név rövidítő Pipe | `M. Sándor` formátumban |
| ✔️ Kérdőív részletei | Kérdések megjelenítésével |
| ✔️ `@Input()` és `@Output()` használat | `survey-card` komponensnél |

---

## 🥈 2. mérföldkő – Részletes technikai teljesítés

| Kritérium | Részletek |
|----------|-----------|
| ✔️ Fordítási hiba nincs | `ng serve` fut hibamentesen |
| ✔️ Futtatási hiba nincs | Konzolban nincs error |
| ✔️ Adatmodell: 5 darab | `User`, `Survey`, `Question`, `Tag`, `Answer` |
| ✔️ Reszponzív dizájn | Mobile-first layout, Material |
| ✔️ Attribútum direktívák | `ngClass`, `ngStyle`, `ngModel`, stb. |
| ✔️ Vezérlési szerkezetek | `*ngIf`, `*ngFor`, `switch`, `else` |
| ✔️ 3+ `@Input()` és `@Output()` | `survey-card`, `survey-form`, `question-form` |
| ✔️ 10+ Angular Material elem | Button, Card, Input, Toolbar, Icon, Snackbar, Checkbox, FormField, GridList, ProgressBar |
| ✔️ 2 saját Pipe | `name-shorten.pipe.ts`, `own-survey.pipe.ts` |
| ✔️ 4+ Angular Form | Regisztráció, bejelentkezés, jelszóemlékeztető, kérdőív-létrehozás |
| ✔️ Lifecycle hook-ok | `ngOnInit`, `ngOnDestroy` valós tartalommal |
| ✔️ CRUD: kérdőívekhez | `create`, `read`, `update`, `delete` (`SurveyService` használatával) |
| ✔️ Firestore műveletek service-ben | `SurveyService`, `QuestionService` |
| ✔️ 4 Firestore lekérdezés | `where`, `orderBy`, `limit`, `startAfter` |
| ✔️ 9 működő route | `survey-list`, `survey-form`, `survey-detail`, `register`, `login`, `profile`, `forgot-password`, `user-form`, `404` |
| ✔️ AuthGuard implementálva és használatban | Regisztrált felhasználókhoz kötött route-oknál beépítve |
| ✔️ Gitignore rendben | `environment.ts`, `firebase`, `node_modules`, build fájlok kizárva |
| ✔️ Szubjektív minőség | A projekt részletes, funkcionálisan teljes, látványos dizájnnal |

---

## 🧱 Mappastruktúra

```
src/
├── app/
│   ├── components/         # Külön komponensek: survey-list, form, card, stb.
│   ├── services/           # AuthService, SurveyService, QuestionService
│   ├── models/             # TS interface-ek: User, Survey, Question, Tag
│   ├── pipes/              # Saját Pipe-ok
│   ├── layout/             # Navbar, struktúra
```

---

## 🚀 Fejlesztés és deploy

```bash
npm install
ng serve
```

```bash
ng build --configuration production
firebase deploy
```

🔗 **Elérhető élőben:** [https://survey-app-25-02.web.app](https://survey-app-25-02.web.app)

---

## 👨‍💻 Készítette

**Mikó Sándor**  
SZTE, Programtervező Informatikus  
2025. április–május
