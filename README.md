# OFS Website

Terminal tarzinda calisan kisisel portfolio/blog uygulamasi. React + Vite ile gelistirildi ve komut tabanli moduler bir yapiya sahip.

## Quick Start

```bash
git clone https://github.com/ofsahof/ofs-website.git
cd ofs-website
npm install
npm run dev
```

Gelisim sunucusu varsayilan olarak `http://localhost:5173` adresinde acilir.

## Scripts

- `npm run dev`: Vite gelistirme sunucusu
- `npm run build`: Production build (`dist/`)
- `npm run preview`: Build onizleme
- `npm run test`: Vitest testleri
- `npm run lint`: ESLint kontrolu
- `npm run lint:fix`: ESLint otomatik duzeltme
- `npm run format`: Prettier ile format

## Project Structure

```text
.
|- src/
|  |- commands/              # Komut modulleri
|  |- components/Terminal/   # Terminal UI bilesenleri
|  |- games/                 # Oyun registry ve oyunlar
|  |- hooks/useTerminal.jsx  # Terminal cekirdegi
|  |- utils/                 # VFS, path, fetch yardimcilari
|  |- App.jsx
|  |- main.jsx
|- public/content/           # Markdown / org / txt icerikler
|  |- man/
|  |- posts/
|- README.md
```

## Architecture Notes

- `src/hooks/useTerminal.jsx` komut parse etme, execute etme ve history/state yonetimini yapar.
- `src/commands/index.js` command registry gorevi gorur.
- `src/games/index.js` game registry gorevi gorur.
- `src/utils/filesystem.js` sanal dosya sistemi (VFS) verisini tutar.
- `src/utils/pathHelper.js` VFS path cozumleme ve entry bulma mantigini saglar.

## Content Conventions

- `public/content/*.md`: Statik sayfalar (or. `about.md`)
- `public/content/projects/*.md`: Proje dokumanlari
- `public/content/posts/*.org`: Blog icerikleri
- `public/content/man/*.org`: `man` komutu sayfalari
- `public/content/*.txt`: Duz metin icerikleri (`welcome.txt`, `neofetch.txt`)

Yeni bir dosya eklendiginde ilgili yolun `src/utils/filesystem.js` icinde kayitli oldugundan emin olun.

## Contributing

PR oncesi:

```bash
npm run format
npm run lint
npm run test
```

## Current Roadmap

Kisa vade:
- Terminal cekirdeginde state akisini modulerlestirmek
- Komut sozlesmesini standardize etmek
- Test kapsamini command/path/fetch katmanlarina yaymak

Orta vade:
- API komutlari (`github`, `weather`, `fetch`)
- Pipe destegi (`|`)
- Kalici VFS (`mkdir`, `touch`, `rm` + `localStorage`)
