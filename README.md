# KopruMezun Tanitim Sitesi

KopruMezun, Turkiye'de gelistirilen ve Turkiye'de barindirilan mezun agi ve mentorluk platformunun tanitim sitesidir. Proje React + Vite + Tailwind CSS + Framer Motion kullanilarak hazirlandi ve Netlify uzerinde kolayca yayina alinabilecek sekilde yapilandirildi.

## Baslangic

```bash
npm install
npm run dev
```

Gelistirme sunucusu varsayilan olarak [http://localhost:5173](http://localhost:5173) adresinde calisir.

## Uretim Derlemesi

```bash
npm run build
npm run preview
```

`dist/` klasoru Netlify veya statik barindirma servislerine dagitilabilir.

## Netlify Dagitimi

- `netlify.toml` dosyasi yonlendirme ve derleme komutunu icerir.
- Netlify uzerinde yeni bir site olusturup bu depoyu baglayin.
- Derleme komutu `npm run build`, yayin klasoru `dist` olarak ayarlanmalidir.

## Icerik ve Ozellikler

- Tum metinler Turkce ve Ingilizce olarak hazirlandi; dil secimi sayfa uzerinden yapilabilir.
- Tum Turkce icerikler gercek karakterler (UTF-8) ile dosyalara yazilmistir; unicode kacislari kullanilmamistir.
- Tailwind ile light/dark mod destegi; Framer Motion ile erisilebilir animasyonlar.
- `Demo Iste` modal'i gercek gonderim yapmadan tesekkur mesaji gosterir.
- `public/` klasorunde PDF brosur, logo placeholders, sitemap ve robots dosyalari bulunur.

## Komutlar

- `npm run lint` proje icin ESLint calistirir.
- Tasarim ve icerik tamamen tanitim amaclidir, gercek urunle baglantili degildir.
