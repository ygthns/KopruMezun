# Köprü Rehber

10 Kasım 2026. Bu çalışma yalnız `koprumezun.com` tanıtım sitesini kapsar;
KopruPortal deposunu, oturumlu portalları veya kurum verilerini değiştirmez.

## Yapı ve işletim

- `/rehber/`: arama ve kategori filtresi bulunan Türkçe rehber ana sayfası.
- `/rehber/<slug>/`: her yazı için bağımsız, statik üretilmiş, canonical adres.
- 10 makale, 10 özgün AI illüstrasyonu, 20 Türkçe hedef soru.
- İçerik kaynağı `src/guide-content.js`; soru–makale haritası `content/target-questions.json`.
- İllüstrasyonların her biri ayrı üretildi. Gerçek müşteri, kurum veya ürün ekranı
  fotoğrafı değildir. 1200 ve 640 piksel WebP sürümleri, alternatif metin ve makale
  içinde görünür açıklama bulunur. Özgün görseller geliştirme çalışma çıktısında korunur.
- Başlıklar, meta açıklamalar, sosyal paylaşım alanları, BlogPosting ve BreadcrumbList,
  CollectionPage ve site haritası üretim sırasında içerikten oluşturulur. FAQ metni
  görünürdür; zengin arama sonucu vaadi veya sahte değerlendirme puanı eklenmez.
- İki doğal metin içi bağlantı, iki bağlamsal okuma bağlantısı ve üç ilgili rehber kartı
  yazılar arasında yol oluşturur. Dışarıdaki sitelerden backlink sağlandığı iddia edilmez.
- Mevcut İngilizce ana sayfa geçişi korunur. Rehber için yayımlanmamış İngilizce
  karşılıklar veya hreflang adresleri üretilmez.
- Mevcut Netlify Forms dosyası ve form gönderim yolu korunur. Testte gerçek talep
  gönderilmez. Rehber CTA'ları sohbet görünümlü başvuru formunu açar; JavaScript yokken ana sayfadaki demo bölümüne gider.
- Ana sayfa da ilk HTML'de okunabilir. Bilinmeyen adresler `404.html` üzerinden
  gerçek 404 ve noindex alır. Sitemap yalnız 12 public canonical adresi kapsar.

## Komutlar

`npm ci`, `npm run build`, `npm test`, `npm run lint`.
Yerel statik önizleme: `PORT=4431 node scripts/preview.mjs`.
Yeni içerik eklendiğinde tarih ve kaynakları bilinçli güncelleyin; sırf yeniden
build alındığı için makale tarihleri otomatik yenilenmez.

## Doğruluk sınırı

Ürün anlatımı canlı tanıtım sitesi ve mevcut `src/content.js` kapsamına dayanır.
Sabit fiyat, garantili istihdam/katılım artışı, otomatik mentor eşleştirmesi,
sertifika veya genel hukuki tam uyum iddiası üretilmedi. CASE ölçüm çerçevesi için
ilgili makalede birincil kaynak verilir. Diğer iş akışları uygulanabilir değerlendirme
önerileridir; gerçek müşteri uygulaması veya ölçülmüş sonuç gibi sunulmaz.

Hedef sorular ihtiyaca dayalı editoryal seçimdir; arama hacmi veya AI görünürlük
başarısı verisi değildir. Bu çalışma ücretli AI görünürlük taraması başlatmaz,
İzlek'teki mevcut soru setini kendiliğinden değiştirmez. İndekslenme ve AI
cevaplarında yer alma garanti edilemez.

## Yayın ve geri dönüş

Mevcut Netlify projesi `koprumezun`, bağlı depo `ygthns/KopruMezun`.
Önceki production commit `c3c725cd40b53c61848ecf918834571c6198b98a`,
önceki Netlify deploy `6a7c2aa00168040008c49dbc`.
Netlify dağıtımları atomiktir; gerekirse önceki dağıtım yeniden yayımlanabilir.
Kaynak için bu değişiklik commit'i geri alınarak normal build akışından yayın yapılır.
