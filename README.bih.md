[Pročitajte ovaj dokument na Engleskom jeziku](README.md)

# Aplikacija za Upravljanje Kalendarom

## Pregled

Ova Vue.js aplikacija je dizajnirana da pojednostavi upravljanje i prikaz informacija vezanih za kalendar. Fokusira se na registraciju i vizualizaciju dana odsustva ili izostanka, nudeći korisnički prijateljski interfejs i koristeći moderne alate za razvoj radi efikasnog radnog procesa.

## Karakteristike

- **Prikaz Kalendara**: Vizualizujte i interagujte s mjesečnim pregledima kalendara.
- **Registracija Odsustva**: Jednostavno registrujte i pratite periode odsustva.
- **Ponovno Upotrebljivi UI Komponenti**: Poboljšajte korisničko iskustvo s uobičajenim elementima interfejsa.
- **Integracija Tailwind CSS-a**: Iskoristite stilizovanje zasnovano na funkcionalnosti za odzivan dizajn i mračnu temu.
- **Moderan Razvojni Skup Alata**: Koristite Vite, TypeScript i ESLint za pojednostavljeni razvojni doživljaj.

## Izgrađeno Pomoću

- Vue.js - Korišteni web okvir
- TypeScript - Za statičku provjeru tipova
- Tailwind CSS - Za stilove
- Pinia - Upravljanje stanjem
- VueUse - Kolekcija korisnih kompozicijskih API-ja

## Preporučena IDE Postavka

[VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (prethodno Volar). Ova ekstenzija pruža isticanje sintakse, podršku za TypeScript, i intellisense za izraze u šablonima i propove komponenti.

## Podrška za Tipove za `.vue` Importe u TS

U editorima, trebamo [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + ugrađenu ekstenziju `TypeScript and JavaScript Language Features` da bi TypeScript jezički servis bio svjestan `.vue` tipova.

Instalirajte [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) i ako nemate omogućenu ekstenziju `TypeScript and JavaScript Language Features`, pratite ove korake:

1. Pokrenite `Extensions: Show Built-in Extensions` iz VSCode's command palette.
2. Pronađite `TypeScript and JavaScript Language Features`, desni klik i odaberite `Enable`
3. Ponovno učitajte VSCode prozor pokretanjem `Developer: Reload Window` iz command palette.

Da biste izbjegli konflikte, onemogućite Vetur i Volar ekstenzije ako su instalirane. Evo kako:

1. Kliknite na ikonu Extensions view na Sidebaru ili pritisnite `Ctrl+Shift+X`.
2. Pronađite `Vetur` ili `TypeScript Vue Plugin (Volar)`, desni klik i odaberite `Disable (Workspace)`.
3. Ponovno učitajte VSCode prozor pokretanjem `Developer: Reload Window` iz command palette.

## Brzi Početak

Klonirajte repozitorij, instalirajte zavisnosti i pokrenite razvojni server.

## Postavljanje Projekta

```sh
npm install
```

### Kompilacija i Hot-Reload za Razvoj

```sh
npm run dev
```

### Provera Tipova, Kompilacija i Minifikacija za Produkciju

```sh
npm run build
```

### Lint sa [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deplojanje

Aplikacija je postavljena na [Netlify](https://www.netlify.com/).

Možete pogledati live sajt ovdje: [https://calendar-management.netlify.app](https://calendar-management.netlify.app)

Automatski se postavlja iz glavne grane na GitHubu.
