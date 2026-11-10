# KopruMezun Tanitim Sitesi

KopruMezun, mezun ilişkileri ve kurumsal topluluk platformunun tanıtım sitesidir. Veri yerleşimi ve teslim sorumlulukları seçilen kurulum ve sözleşme kapsamında belirlenir. Proje React + Vite + Tailwind CSS + Framer Motion kullanilarak hazirlandi ve Netlify uzerinde kolayca yayina alinabilecek sekilde yapilandirildi.

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
- Demo formu mevcut Netlify Forms altyapısını kullanır; testlerde gerçek başvuru gönderilmez.
- `public/` klasorunde PDF brosur, logo placeholders, sitemap ve robots dosyalari bulunur.

## Komutlar

- `npm run lint` proje icin ESLint calistirir.
- Ürün kapsamı için `src/content.js` esas alınır; kurum özelinde teklif ve teknik değerlendirme gerekir.

## Köprü Rehber

`/rehber/` altında 10 Türkçe makale, arama, konu filtreleri ve özgün AI illüstrasyonları bulunur. `npm run build` ana sayfa ve makaleleri ilk HTML yanıtında okunabilir üretir; 12 adresli sitemap ve gerçek 404 sayfasını oluşturur.

Kontroller: `npm test` ve `npm run lint`. Statik önizleme: `PORT=4431 node scripts/preview.mjs`. [İçerik, soru haritası ve işletim notları](docs/kopru-rehber.md).
