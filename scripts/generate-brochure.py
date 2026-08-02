from pathlib import Path
from textwrap import wrap

from PIL import Image
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "brochure.pdf"
W, H = A4

NAVY = HexColor("#07162d")
NAVY_2 = HexColor("#12345b")
TEAL = HexColor("#20d4c2")
TEAL_DARK = HexColor("#087f78")
INK = HexColor("#13233f")
MUTED = HexColor("#5f6f86")
SOFT = HexColor("#eef4f7")
LINE = HexColor("#dce3ec")
PALE = HexColor("#d9e8ee")

FONT_DIR = Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("KM-Regular", str(FONT_DIR / "arial.ttf")))
pdfmetrics.registerFont(TTFont("KM-Bold", str(FONT_DIR / "arialbd.ttf")))


def fitted_lines(text, font, size, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        trial = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(trial, font, size) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def paragraph(c, text, x, y, width, size=10, leading=None, color=MUTED, font="KM-Regular", max_lines=None):
    leading = leading or size * 1.45
    lines = fitted_lines(text, font, size, width)
    if max_lines:
        lines = lines[:max_lines]
    c.setFillColor(color)
    c.setFont(font, size)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def title(c, text, x, y, width, size=28, color=INK, leading=None):
    leading = leading or size * 1.08
    lines = fitted_lines(text, "KM-Bold", size, width)
    c.setFillColor(color)
    c.setFont("KM-Bold", size)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def eyebrow(c, text, x, y, color=TEAL_DARK):
    c.setFillColor(color)
    c.setFont("KM-Bold", 7.5)
    c.drawString(x, y, text.upper())


def header(c, page, section=None, dark=False):
    color = white if dark else NAVY
    c.setFillColor(color)
    c.setFont("KM-Bold", 10)
    c.drawString(38, H - 33, "Köprü")
    c.setFillColor(TEAL)
    c.drawString(68, H - 33, "Mezun")
    if section:
        c.setFillColor(Color(1, 1, 1, .58) if dark else MUTED)
        c.setFont("KM-Regular", 7)
        c.drawRightString(W - 38, H - 32, section)
    c.setStrokeColor(Color(1, 1, 1, .12) if dark else LINE)
    c.line(38, H - 44, W - 38, H - 44)
    c.setFillColor(Color(1, 1, 1, .45) if dark else MUTED)
    c.setFont("KM-Regular", 7)
    c.drawString(38, 22, "koprumezun.com")
    c.drawRightString(W - 38, 22, f"{page:02d}")


def image_box(c, path, x, y, width, height, radius=8, crop=False):
    path = Path(path)
    if not path.exists():
        return
    c.saveState()
    clip = c.beginPath()
    clip.roundRect(x, y, width, height, radius)
    c.clipPath(clip, stroke=0, fill=0)
    with Image.open(path) as img:
        iw, ih = img.size
    if crop:
        scale = max(width / iw, height / ih)
    else:
        scale = min(width / iw, height / ih)
    dw, dh = iw * scale, ih * scale
    dx, dy = x + (width - dw) / 2, y + (height - dh) / 2
    c.setFillColor(white)
    c.rect(x, y, width, height, fill=1, stroke=0)
    c.drawImage(ImageReader(str(path)), dx, dy, dw, dh, preserveAspectRatio=True, mask="auto")
    c.restoreState()
    c.setStrokeColor(LINE)
    c.roundRect(x, y, width, height, radius, fill=0, stroke=1)


def pill(c, text, x, y, color=TEAL, text_color=NAVY):
    width = pdfmetrics.stringWidth(text, "KM-Bold", 7.2) + 18
    c.setFillColor(color)
    c.roundRect(x, y - 4, width, 18, 9, fill=1, stroke=0)
    c.setFillColor(text_color)
    c.setFont("KM-Bold", 7.2)
    c.drawString(x + 9, y + 1, text)
    return width


def bullet(c, text, x, y, width, color=MUTED, size=9):
    c.setFillColor(TEAL_DARK)
    c.circle(x + 3, y + 2, 2.2, fill=1, stroke=0)
    return paragraph(c, text, x + 14, y + 5, width - 14, size=size, color=color)


def card(c, x, y, width, height, label, heading, body, number=None, dark=False):
    bg = Color(1, 1, 1, .07) if dark else white
    border = Color(1, 1, 1, .16) if dark else LINE
    c.setFillColor(bg)
    c.setStrokeColor(border)
    c.roundRect(x, y, width, height, 7, fill=1, stroke=1)
    if number:
        c.setFillColor(TEAL if dark else TEAL_DARK)
        c.setFont("KM-Bold", 7)
        c.drawRightString(x + width - 13, y + height - 19, number)
    eyebrow(c, label, x + 14, y + height - 21, TEAL if dark else TEAL_DARK)
    c.setFillColor(white if dark else INK)
    c.setFont("KM-Bold", 12)
    heading_lines = fitted_lines(heading, "KM-Bold", 12, width - 28)
    ty = y + height - 45
    for line in heading_lines[:2]:
        c.drawString(x + 14, ty, line)
        ty -= 14
    paragraph(c, body, x + 14, ty - 4, width - 28, size=8, leading=11.4, color=PALE if dark else MUTED, max_lines=5)


def qr_code(c, url, x, y, size=72):
    widget = qr.QrCodeWidget(url)
    bounds = widget.getBounds()
    drawing = Drawing(size, size, transform=[size / (bounds[2] - bounds[0]), 0, 0, size / (bounds[3] - bounds[1]), 0, 0])
    drawing.add(widget)
    renderPDF.draw(drawing, c, x, y)


def page_cover(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(NAVY_2)
    c.circle(W + 30, H - 110, 230, fill=1, stroke=0)
    c.setFillColor(Color(0.125, .83, .76, .13))
    c.circle(W - 10, H - 80, 168, fill=1, stroke=0)
    header(c, 1, "Kurumsal ürün kataloğu · 2026", dark=True)
    eyebrow(c, "ÜNİVERSİTELER İÇİN MEZUN İLİŞKİLERİ PLATFORMU", 48, H - 132, TEAL)
    y = title(c, "Mezun ilişkilerini tek bir kurumsal deneyimde birleştirin.", 48, H - 175, 470, size=39, color=white, leading=42)
    paragraph(c, "Profil, topluluk, mentorluk, kariyer, etkinlik, gönüllülük, bağış ve raporlama — kurumunuza özel bir portalda.", 48, y - 18, 430, size=13, leading=19, color=PALE)
    image_box(c, ROOT / "public/product/home-dashboard.png", 48, 130, W - 96, 270, radius=10, crop=True)
    pill(c, "Gerçek ürün ekranı · anonimleştirilmiş demo", 48, 100, TEAL, NAVY)


def page_problems(c):
    header(c, 2, "Kurumların yaşadığı problemler")
    eyebrow(c, "DAĞINIK OPERASYONLARDAN ÖLÇÜLEBİLİR İLİŞKİLERE", 38, H - 78)
    title(c, "Mezun deneyiminin tamamını ortak bir profil ve yönetişim katmanında çalıştırın.", 38, H - 108, 520, size=25)
    items = [
        ("Dağınık mezun verisi", "Profilleri, özel alanları, onayları ve veri kaynaklarını kontrollü bir kayıt yapısında birleştirin."),
        ("Düşük etkileşim görünürlüğü", "Akış, grup, mesaj, e-posta ve etkinlik temaslarını raporlanabilir sinyallere dönüştürün."),
        ("Manuel program operasyonları", "Mentorluk, etkinlik, check-in ve gönüllülük akışlarını uçtan uca yönetin."),
        ("Birbirinden kopuk araçlar", "İletişim, kariyer, bağış ve topluluk akışlarını aynı kimlik modeli üzerinde çalıştırın."),
        ("Kurumsal kimlik ve erişim", "Alan adı, marka, roller ve kurumsal giriş seçenekleriyle kuruma ait bir deneyim sunun."),
    ]
    positions = [(38, 445, 252), (305, 445, 252), (38, 287, 252), (305, 287, 252), (38, 129, 519)]
    for idx, ((heading, body), (x, y, width)) in enumerate(zip(items, positions), 1):
        card(c, x, y, width, 140, "KURUMSAL PROBLEM", heading, body, f"0{idx}")


def page_platform(c):
    header(c, 3, "Platform deneyimi")
    eyebrow(c, "UÇTAN UCA TOPLULUK YOLCULUĞU", 38, H - 78)
    title(c, "Bir mezun kaydını sürekli ve ölçülebilir bir ilişkiye dönüştürün.", 38, H - 108, 500, size=27)
    image_box(c, ROOT / "public/product/tenant-landing.png", 38, 360, 519, 260, radius=9, crop=True)
    steps = ["Sisteme alın", "Profili zenginleştirin", "Gruba / mentora bağlayın", "Etkinliğe dahil edin", "İletişim gönderin", "Sonucu raporlayın"]
    y = 312
    for idx, step in enumerate(steps):
        x = 38 + (idx % 3) * 177
        if idx == 3:
            y = 220
        c.setFillColor(NAVY)
        c.circle(x + 17, y + 15, 15, fill=1, stroke=0)
        c.setFillColor(TEAL)
        c.setFont("KM-Bold", 8)
        c.drawCentredString(x + 17, y + 12, str(idx + 1))
        paragraph(c, step, x + 42, y + 20, 125, size=9, leading=12, color=INK, font="KM-Bold", max_lines=2)
    c.setFillColor(SOFT)
    c.roundRect(38, 86, 519, 86, 7, fill=1, stroke=0)
    eyebrow(c, "KURUMA ÖZEL DENEYİM", 54, 145)
    paragraph(c, "Kuruma özel alan adı, logo, renkler, landing sayfası ve portal deneyimi; Türkçe ve İngilizce kullanıcı arayüzüyle birlikte yapılandırılabilir.", 54, 124, 480, size=9.5, leading=14, color=INK)


def page_module(c, page, section, heading, problem, flow, result, image):
    header(c, page, section)
    eyebrow(c, f"ÜRÜN MODÜLÜ · {page - 3:02d}", 38, H - 78)
    title(c, heading, 38, H - 108, 390, size=29)
    image_box(c, ROOT / image, 38, 385, 519, 250, radius=9, crop=True)
    c.setFillColor(MUTED)
    c.setFont("KM-Regular", 7)
    c.drawRightString(557, 372, "Anonimleştirilmiş demo ortamı")
    card(c, 38, 232, 252, 122, "PROBLEM", problem, "", "01")
    card(c, 305, 232, 252, 122, "ÜRÜN AKIŞI", flow, "", "02")
    c.setFillColor(NAVY)
    c.roundRect(38, 84, 519, 122, 8, fill=1, stroke=0)
    eyebrow(c, "KURUMSAL SONUÇ", 54, 177, TEAL)
    paragraph(c, result, 54, 152, 480, size=12, leading=17, color=white, font="KM-Bold")


def page_admin_security(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    header(c, 8, "Yönetim, güvenlik ve entegrasyon", dark=True)
    eyebrow(c, "KURUMSAL KONTROL", 38, H - 78, TEAL)
    title(c, "Topluluk deneyimi esnek; yönetim katmanı kontrollü.", 38, H - 108, 520, size=29, color=white)
    image_box(c, ROOT / "public/product/admin-analytics.png", 38, 405, 519, 230, radius=9, crop=True)
    controls = [
        ("Kimlik ve erişim", "Kullanıcı onayı, yaşam döngüsü, roller, özel profil alanları ve içerik moderasyonu."),
        ("İzlenebilirlik", "Denetim kayıtları, raporlar, etkileşim analitiği ve CASE metrikleri."),
        ("Kurumsal giriş", "SAML ve OIDC tabanlı kurumsal kimlik sağlayıcılarıyla giriş akışları."),
        ("Kontrollü veri aktarımı", "CSV, SFTP, REST ve Salesforce kaynakları; eşleme, onay ve çakışma yönetimi."),
        ("Dış bağlantılar", "Harici API kimlik bilgileri ve imzalı webhook altyapısı."),
        ("Teknik kontroller", "Tenant izolasyonu, rol tabanlı erişim, özel dosyalar, süreli erişim ve şifreli sağlayıcı kimlik bilgileri."),
    ]
    for idx, (heading, body) in enumerate(controls):
        col, row = idx % 2, idx // 2
        card(c, 38 + col * 267, 277 - row * 112, 252, 96, "KONTROL", heading, body, f"0{idx + 1}", dark=True)
    paragraph(c, "Teknik önlemler ile kurumun veri sorumlusu olarak hukuki yükümlülükleri birbirinden ayrı değerlendirilir; hukuki “tam uyum” garantisi verilmez.", 38, 67, 519, size=7.5, leading=11, color=PALE)


def page_delivery(c):
    header(c, 9, "Dağıtım, uygulama ve lisanslama")
    eyebrow(c, "TESLİM MODELİ NETLİĞİ", 38, H - 78)
    title(c, "Altyapı ve hizmet kapsamını kurumun gereksinimine göre tanımlayın.", 38, H - 108, 510, size=27)
    models = [
        ("Shared SaaS", "Standart, yönetilen ve hızlı başlangıç seçeneği."),
        ("Dedicated managed", "Daha güçlü altyapı izolasyonu gerektiren kurumlara yönelik yönetilen seçenek."),
        ("Customer-operated on-prem", "Kurum altyapısında tek tenant kurulum hedefi."),
    ]
    for idx, (heading, body) in enumerate(models):
        card(c, 38 + idx * 178, 475, 163, 150, "TESLİM", heading, body, f"0{idx + 1}")
    c.setFillColor(SOFT)
    c.roundRect(38, 383, 519, 65, 6, fill=1, stroke=0)
    paragraph(c, "Veri yerleşimi, altyapı topolojisi ve operasyon sorumlulukları seçilen teslim modeline ve kurum sözleşmesine göre belirlenir. Dedicated ve on-prem uygunluğu teklif aşamasında doğrulanır.", 53, 421, 486, size=8.5, leading=12.5, color=INK)
    eyebrow(c, "UYGULAMA VE ONBOARDING", 38, 343)
    steps = ["İhtiyaç analizi", "Kurum ve marka", "Veri ve entegrasyon", "Pilot ve UAT", "Eğitim ve canlıya geçiş"]
    for idx, step in enumerate(steps):
        x = 38 + idx * 104
        c.setFillColor(NAVY)
        c.circle(x + 13, 301, 13, fill=1, stroke=0)
        c.setFillColor(TEAL)
        c.setFont("KM-Bold", 7)
        c.drawCentredString(x + 13, 298, str(idx + 1))
        paragraph(c, step, x, 276, 90, size=7.7, leading=10, color=INK, font="KM-Bold", max_lines=3)
    paragraph(c, "Takvim; veri kalitesi, entegrasyonlar, güvenlik değerlendirmesi ve kabul kapsamına göre planlanır. Sabit süre taahhüdü verilmez.", 38, 222, 519, size=8.2, leading=12, color=MUTED)
    eyebrow(c, "KURUMUNUZA GÖRE ŞEKİLLENEN LİSANSLAMA", 38, 176)
    paragraph(c, "Fiyat; kayıtlı/aktif kullanıcı ölçeği, etkin modüller, teslim modeli, veri aktarımı, SSO/entegrasyon ihtiyacı ile eğitim, destek ve hizmet seviyesine göre belirlenir. İhtiyaç analizinden sonra kalemleri açık ve karşılaştırılabilir bir teklif sunulur.", 38, 152, 519, size=9.3, leading=14, color=INK)


def page_cta(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(NAVY_2)
    c.circle(W - 40, 110, 190, fill=1, stroke=0)
    header(c, 10, "İletişim", dark=True)
    eyebrow(c, "DEMO VE İHTİYAÇ ANALİZİ", 48, H - 130, TEAL)
    y = title(c, "Kurumunuzun mezun deneyimini birlikte tasarlayalım.", 48, H - 175, 470, size=38, color=white, leading=41)
    paragraph(c, "Modül, veri, entegrasyon ve teslim beklentilerinizi birlikte değerlendirip açık bir uygulama ve teklif kapsamı oluşturalım.", 48, y - 18, 430, size=12, leading=18, color=PALE)
    c.setFillColor(Color(1, 1, 1, .08))
    c.roundRect(48, 272, 499, 170, 9, fill=1, stroke=0)
    eyebrow(c, "GÖRÜŞMEDE NETLEŞTİRECEĞİMİZ BAŞLIKLAR", 68, 410, TEAL)
    bullets = ["Topluluk büyüklüğü ve hedef kullanıcı grupları", "Öncelikli modüller ve başarı ölçütleri", "Mevcut veri kaynakları, SSO ve entegrasyonlar", "Teslim modeli, güvenlik değerlendirmesi ve destek kapsamı"]
    by = 379
    for item in bullets:
        by = bullet(c, item, 68, by, 430, color=white, size=9) - 5
    qr_code(c, "https://koprumezun.com/", 48, 110, 92)
    c.setFillColor(white)
    c.setFont("KM-Bold", 12)
    c.drawString(162, 181, "koprumezun.com")
    c.setFillColor(PALE)
    c.setFont("KM-Regular", 10)
    c.drawString(162, 157, "bilgi@koprumezun.com")
    paragraph(c, "Form bilgileri Netlify Forms altyapısından KöprüMezun satış ekibine iletilir ve talebi değerlendirmek amacıyla kullanılır. Ayrıntılı açıklama web sitesinde yer alır.", 162, 130, 365, size=7.5, leading=11, color=PALE)


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
    c.setTitle("KöprüMezun Kurumsal Ürün Kataloğu")
    c.setAuthor("KöprüMezun")
    c.setSubject("Üniversiteler için mezun ilişkileri, kariyer ve topluluk platformu")

    page_cover(c); c.showPage()
    page_problems(c); c.showPage()
    page_platform(c); c.showPage()
    page_module(c, 4, "Topluluk ve iletişim", "Topluluk ve iletişim", "Haberler, duyurular ve mezun bağlantıları farklı kanallarda kaybolur.", "Profil, üye dizini, akış, gruplar, mesajlar, bildirimler ve segmentlenmiş e-posta iletişimi.", "Doğru topluluğa doğru kanaldan ulaşın; etkileşimi tek yerde görün.", "public/product/email-template-gallery.png"); c.showPage()
    page_module(c, 5, "Mentorluk ve kariyer", "Mentorluk ve kariyer", "Eşleştirme, takip ve kariyer fırsatları tablolarla yönetildiğinde ölçeklenmez.", "Mentor profilleri, konu bazlı bulma, talepler ve yönetim paneli; iş/staj ilanları, başvurular ve ilan sahibi panoları.", "Mezun uzmanlığını öğrenci gelişimine ve kariyer fırsatlarına dönüştürün.", "public/product/jobs.png"); c.showPage()
    page_module(c, 6, "Etkinlik ve gönüllülük", "Etkinlik ve gönüllülük", "Kayıt, katılım, bilet, görev ve etki verisi birbirinden kopuk kalır.", "Bilet, kontenjan, bekleme listesi, QR check-in, oturum, iade, anket; gönüllülük başvurusu, görevlendirme, saat, safeguarding ve sertifika.", "Operasyonu azaltın; katılımı ve sosyal etkiyi kanıtlanabilir hale getirin.", "public/product/home-dashboard.png"); c.showPage()
    page_module(c, 7, "Bağış ve kurumsal gelişim", "Bağış ve kurumsal gelişim", "Bağış çağrıları ile mezun ilişkisi arasında süreklilik kurulamaz.", "Bağış kampanyaları, halka açık kampanya sayfaları, ödeme sağlayıcısı bağlantıları; mezun işletmeleri ve ayrıcalıklar.", "Kurumsal gelişim çalışmalarını topluluk profilleri ve iletişim akışlarıyla bağlayın.", "public/product/fundraising.png"); c.showPage()
    page_admin_security(c); c.showPage()
    page_delivery(c); c.showPage()
    page_cta(c); c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
