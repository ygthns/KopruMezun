export const institutionIds = ['university', 'association', 'foundation', 'other'];
export const needIds = ['alumni', 'mentoring', 'events', 'fundraising', 'integration', 'discovery'];
export const sizeIds = ['small', 'medium', 'large', 'very-large', 'unknown'];
export const copy = {
  tr: {
    launcher: 'Mezun ağınızı konuşalım', title: 'İlk adımı birlikte atalım.', subtitle: 'Demo ve ihtiyaç analizi', teaser: 'Kurumunuz için bir mezun ağı mı düşünüyorsunuz?', teaserBody: 'Birkaç seçimle başlayalım. İhtiyacınızı doğru ekibe iletelim.', start: 'Birlikte netleştirelim', close: 'Kapat', back: 'Geri', step: 'Adım', review: 'Son kontrol', next: 'Yanıtlarımı gözden geçir', send: 'Talebimi gönder', sending: 'Gönderiliyor…', edit: 'Bilgileri düzenle', finish: 'Tamam', restart: 'Yeni bir talep oluştur', hello: 'Merhaba, KöprüMezun’a hoş geldiniz.', intro: 'Bu, adım adım bir başvuru formu. Canlı sohbet değil; gönderdiğiniz talebi ekibimiz değerlendirecek.',
    questions: ['Hangi kurum için görüşelim?', 'Öncelikli ihtiyacınız hangisi?', 'Topluluğunuz yaklaşık kaç kişi?', 'Sizi ve kurumunuzu tanıyalım.'],
    institutions: ['Üniversite', 'Mezun derneği', 'Vakıf / sivil toplum kuruluşu', 'Başka bir topluluk'],
    needs: ['Mezun ilişkileri ve topluluk', 'Mentorluk ve kariyer', 'Etkinlik ve gönüllülük', 'Bağış ve kurumsal gelişim', 'Veri aktarımı ve entegrasyon', 'Birlikte netleştirelim'],
    sizes: ['1.000’den az', '1.000–5.000', '5.001–20.000', '20.000’den fazla', 'Henüz bilmiyorum'],
    labels: { institution: 'Kurum türü', need: 'Öncelikli ihtiyaç', size: 'Topluluk büyüklüğü', name: 'Adınız soyadınız', organization: 'Kurumunuzun adı', email: 'E-posta adresiniz', message: 'Eklemek istedikleriniz', reference: 'Talep numarası' },
    optional: 'isteğe bağlı', placeholder: 'Mevcut durumunuzu, hedefinizi veya sormak istediklerinizi paylaşabilirsiniz.', privacy: 'Aydınlatma metni', privacyNote: 'Veriler yalnızca talebinizi değerlendirmek ve size geri dönmek için mevcut Netlify Forms altyapısına gönderilir.', acknowledge: 'Aydınlatma metnini okudum; bilgilerimi bu talebin değerlendirilmesi için paylaşıyorum.', reviewIntro: 'Bilgilerinizi kontrol edin. Yalnızca aşağıdaki düğmeyle gönderdiğinizde ekibimize iletilecek.', success: 'Talebiniz alındı.', successBody: 'Ekibimiz paylaştığınız e-posta adresinden size geri dönecek. Görüşmek üzere.', invalid: 'Lütfen seçimleri ve iletişim bilgilerinizi kontrol edin.', error: 'Gönderim doğrulanamadı. Talebiniz ulaşmış olabilir. Tekrar göndermeden önce e-postayla kontrol edin; yanıtlarınız burada korunuyor.', verify: 'E-posta ile kontrol et', retry: 'Kontrol ettim, tekrar göndereceğim', cooldown: 'Yeni bir talep göndermek için bir dakika bekleyin.', wait: 'Gönderim hazırlanıyor; bir an sonra tekrar deneyin.', note: 'Canlı sohbet değil · Ekibimize iletilen başvuru', subject: 'Yeni KöprüMezun demo talebi',
  },
  en: {
    launcher: 'Let’s talk about your alumni network', title: 'Let’s find your next step.', subtitle: 'Demo & needs assessment', teaser: 'Thinking about an alumni network for your institution?', teaserBody: 'Start with a few choices. We’ll share your needs with our team.', start: 'Let’s explore your needs', close: 'Close', back: 'Back', step: 'Step', review: 'Final review', next: 'Review my answers', send: 'Send my request', sending: 'Sending…', edit: 'Edit details', finish: 'Done', restart: 'Start a new request', hello: 'Hello, welcome to KöprüMezun.', intro: 'This is a guided enquiry form, not live chat. Our team will review the request you send.',
    questions: ['Which type of institution are you with?', 'What would you like to focus on?', 'How large is your community?', 'Tell us about you and your institution.'],
    institutions: ['University', 'Alumni association', 'Foundation / nonprofit', 'Another community'],
    needs: ['Alumni relations & community', 'Mentoring & careers', 'Events & volunteering', 'Fundraising & advancement', 'Data migration & integration', 'Help us define the scope'],
    sizes: ['Fewer than 1,000', '1,000–5,000', '5,001–20,000', 'More than 20,000', 'Not sure yet'],
    labels: { institution: 'Institution type', need: 'Primary need', size: 'Community size', name: 'Full name', organization: 'Institution name', email: 'Email address', message: 'Anything else to add', reference: 'Request reference' },
    optional: 'optional', placeholder: 'Tell us about your current situation, goals or questions.', privacy: 'Privacy information', privacyNote: 'Your details are sent through the existing Netlify Forms service only to assess your request and contact you.', acknowledge: 'I have read the privacy information and am sharing my details for this enquiry.', reviewIntro: 'Check your details. They are shared with our team only when you press the send button below.', success: 'Your request has been received.', successBody: 'Our team will get back to you using the email address you shared. Speak soon.', invalid: 'Please check your choices and contact details.', error: 'We could not confirm submission. Your request may have arrived. Check by email before sending again; your answers are still here.', verify: 'Check by email', retry: 'I checked and want to send again', cooldown: 'Please wait a minute before sending another request.', wait: 'Getting your request ready; please try again in a moment.', note: 'Not live chat · An enquiry sent to our team', subject: 'New KöprüMezun demo request',
  },
};
export const emptyRequest = () => ({ institution: '', need: '', size: '', name: '', organization: '', email: '', message: '', website: '', acknowledged: false });
export function validContact(data) {
  return typeof data.name === 'string' && data.name.trim().length >= 2 && data.name.length <= 100 &&
    typeof data.organization === 'string' && data.organization.trim().length >= 2 && data.organization.length <= 160 &&
    typeof data.email === 'string' && data.email.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email.trim()) &&
    typeof data.message === 'string' && data.message.length <= 3000;
}
export function validChoices(data) {
  return institutionIds.includes(data.institution) && needIds.includes(data.need) && sizeIds.includes(data.size);
}
export function requestPayload(data, language, path, reference) {
  if (!copy[language] || !validChoices(data) || !validContact(data) || data.acknowledged !== true || data.website !== '') throw Error('Invalid request');
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(reference)) throw Error('Invalid reference');
  const t = copy[language], labels = [t.institutions[institutionIds.indexOf(data.institution)], t.needs[needIds.indexOf(data.need)], t.sizes[sizeIds.indexOf(data.size)]];
  // Only an allowlisted public path; never URL query, fragment, cookies or browsing history.
  const source = /^\/(?:rehber(?:\/[a-z0-9-]+)?\/?)?$/.test(path) ? path : '/';
  const need = [[t.labels.institution, labels[0]], [t.labels.need, labels[1]], [t.labels.size, labels[2]], ...(data.message.trim() ? [[t.labels.message, data.message.trim()]] : []), [t.labels.reference, reference], ['Page', source]].map(([key, value]) => `${key}: ${value}`).join('\n\n');
  return new URLSearchParams({ 'form-name': 'demo-request', subject: t.subject, language, name: data.name.trim(), organization: data.organization.trim(), email: data.email.trim(), 'community-size': labels[2], need, 'bot-field': '' });
}
export async function sendRequest(params, { request = fetch, signal } = {}) {
  // A single explicit attempt. Ambiguous results are not retried automatically.
  const response = await request('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString(), signal });
  if (!response.ok || response.headers?.get('cf-mitigated') === 'challenge') throw Error('Submission not confirmed');
  return true;
}

export function openContact(event) {
  event.preventDefault();
  window.dispatchEvent(new CustomEvent('kopru:contact-open', { detail: { opener: event.currentTarget } }));
}
