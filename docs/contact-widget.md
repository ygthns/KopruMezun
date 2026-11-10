# KöprüMezun adımlı iletişim kutusu

10 Kasım 2026. Yalnız tanıtım sitesinde ve Türkçe rehberlerde çalışır; portallar,
KopruPortal kaynakları, kurum oturumları veya verileri kapsamda değildir.

## Deneyim

Sağ alttaki düğme ve ana sayfa/Rehber demo CTA'ları aynı formu açar. Kurum türü,
öncelikli ihtiyaç, topluluk büyüklüğü ve iletişim bilgileri dört adımda alınır;
özet ve aydınlatma bilgisi sonrasında kullanıcı açıkça gönderir. Bir AI ya da canlı
operatör varmış gibi sunulmaz; API/model çağrısı yoktur. Ana sayfanın Türkçe/İngilizce
seçimi form dilini de günceller. Rehberler Türkçedir.

## Mevcut teslim sözleşmesi

`demo-request` ve `/__forms.html` korunur. Yeni SMTP veya e-posta sağlayıcısı eklenmez.
Mevcut alanlar aynı adlarla gönderilir: subject, language, name, organization, email,
community-size, need, bot-field; form-name gizli alanı da gönderilir. Kurum türü,
ihtiyaç, mesaj, public sayfa yolu ve talep referansı `need` içinde okunabilir metindir.
Ürün modelleri veya hassas profil verileri toplanmaz; dosya yüklenmez.

10 Kasım canlı kontrolünde Netlify form detection açık, demo-request kayıtlı,
honeypot etkin ve mevcut Gmail bildirim kuralı tanımlıdır. Bildirim kuralı değiştirilmedi.
Kabul yanıtı gönderim ekranını tamamlar; e-postanın alıcıya teslimini tek başına kanıtlamaz.

## Koruma ve veri minimizasyonu

- Netlify Forms'un mevcut spam filtresi ve honeypot korunur. Ek reCAPTCHA veya
  Turnstile kurulmuş gibi davranılmaz; yeni bir güvenlik anahtarı gerekmez.
- Uzunluklar, e-posta biçimi, seçimler, aydınlatma teyidi ve boş honeypot doğrulanır.
- Aynı ekranda paralel gönderim kilidi; 3 saniye asgari akış süresi ve başarılı
  gönderimden sonra 60 saniye oturum içi bekleme bulunur. Bunlar istemci kontrolleridir,
  sunucu tarafı IP kotası veya kalıcı deduplikasyon olarak sunulmaz.
- Belirsiz gönderim otomatik tekrarlanmaz. Bilgiler ekranda korunur, e-postayla kontrol
  yolu sunulur; yeni deneme kullanıcının ayrıca seçmesini gerektirir. Referans numarası
  olası tekrarı destek ekibinin ayırt etmesine yardımcı olur, sunucu idempotency anahtarı değildir.
- İletişim bilgileri, mesajlar, dil dışı kişisel veriler tarayıcı depolamasına yazılmaz.
  Yanıtlar yalnız sayfanın belleğindedir; gezinme/yenilemede kaybolur.
- Session storage yalnız karşılama kutusunun kapatılmasını ve son başarılı gönderimin
  zamanını hatırlar. Kaynak sayfa bilgisi yalnız izinli public pathname'dir; query,
  fragment, cookie veya geçmiş gönderilmez. Form gizlilik metni bu davranışa göre güncellendi.

## Doğrulama

`npm run build`, `npm test`, `npm run lint`.
Model testleri gerçek servis çağrısı yapmaz. İki yerel simülasyonla tarayıcı akışı
sınanabilir; bunlar production çıktısına dahil değildir:

- `PORT=4432 CONTACT_PREVIEW_RESULT=accepted node scripts/preview.mjs`
- `PORT=4433 CONTACT_PREVIEW_RESULT=rejected node scripts/preview.mjs`

Bu sunucu yalnız 127.0.0.1'de dinler; POST denemeleri hiçbir yere aktarılmaz.
`/__preview/request-count` yalnız deneme modunda ve kişisel veri içermeyen toplamı verir.
Gerçek mail teslimi ayrıca kullanıcının canlı başvurusuyla doğrulanabilir.

## Site haritası

12 canonical adres içeren sitemap canlı dosyayla doğrulandı. 10 Kasım'da Google
Search Console HTTPS mülküne yeniden gönderildi; “Başarılı”, son okuma 10 Kasım ve
12 keşfedilen sayfa görüldü. Bu sayı 12 sayfanın indekslendiği anlamına gelmez.
