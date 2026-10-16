import type { SiteText } from './types';

export const tr: SiteText = {
  locale: 'tr',
  htmlLang: 'tr',
  ogLocale: 'tr_TR',
  meta: {
    titleSuffix: 'Yazılım mühendisliği stüdyosu, Ankara',
    description:
      'Ankara’da bir yazılım mühendisliği stüdyosu: Flutter ile iOS, Android ve web uygulamaları, API ve backend geliştirme, veri otomasyonu ve kaynağa dayalı veri doğrulama.',
    ogImageAlt: 'Proofvane: yazılım ve veri stüdyosu, Ankara',
  },
  a11y: {
    skip: 'İçeriğe geç',
    mainNav: 'Ana menü',
    footerNav: 'Alt menü',
    langNav: 'Dil seçimi',
    langNames: { tr: 'Türkçe', en: 'English' },
    notesLabel: 'Kenar notları',
    noteRef: (n) => `Not ${n}`,
  },
  nav: [
    { href: '#services', label: 'Hizmetler' },
    { href: '#method', label: 'Yöntem' },
    { href: '#work', label: 'Örnek çalışmalar' },
    { href: '#contact', label: 'İletişim' },
  ],
  hero: {
    title: [
      { text: 'Çalışan yazılım,', note: 1 },
      { text: ' izlenebilir veri,', note: 2 },
      { text: ' yazılı teslim.', note: 3 },
    ],
    notes: [
      'Flutter ile iOS, Android ve web; arkasındaki API ve backend dahil. Yayından sonra da bakımı sürer.',
      'Her veri satırı dayandığı kaynağa bağlanır. Kaynakta gösterilemeyen bilgi “doğrulanamadı” olarak işaretlenir.',
      'Kaynak kodu sizin deponuzda, testler ve CI ile. Neyin teslim edildiği her seferinde yazılıdır.',
    ],
    lede: (brand, city) =>
      `${brand}, ${city}’da bir yazılım mühendisliği stüdyosu. Mobil ve web ürünleri geliştiriyor, üretim ortamının sorumluluğunu alıyor, verinizi kaynağıyla birlikte doğruluyoruz.`,
    primaryCta: 'Projenizi anlatın',
    secondaryCta: { href: '#work', label: 'Örnek çalışmaları görün' },
  },
  services: {
    title: 'Hizmetler',
    intro:
      'Küçük ekiplerin ve kurumların uzun vadede bakımını yapabileceği, belgelenmiş işler. Kapsam her projede baştan yazılı olarak netleşir.',
    deliverablesLabel: 'Teslim edilenler',
    stackLabel: 'Araçlar',
    items: [
      {
        id: 'flutter',
        title: 'Flutter ile mobil uygulamalar',
        body: 'Tek kod tabanından iOS ve Android. Çevrimdışı çalışma, bildirimler, ödeme ve mağaza yayın süreci dahil uçtan uca geliştirme; var olan bir uygulamanın devralınması da olur.',
        deliverables: [
          'Mağazaya hazır iOS ve Android sürümleri',
          'Birim, widget ve entegrasyon testleri',
          'Hata izleme ve sürüm notları',
        ],
        stack: 'Flutter, Dart, Firebase, Crashlytics',
      },
      {
        id: 'web',
        title: 'Web uygulamaları',
        body: 'Yönetim panelleri, müşteri portalları ve kurum içi araçlar. Flutter Web ya da TypeScript ile, erişilebilir ve hızlı açılan arayüzler.',
        deliverables: [
          'Panel ve portal arayüzleri',
          'Rol tabanlı erişim',
          'Otomatik testler ve CI/CD',
        ],
        stack: 'TypeScript, Flutter Web, Vite',
      },
      {
        id: 'api',
        title: 'API ve backend',
        body: 'API’ler, arka plan işleri ve entegrasyonlar. İzleme, olay müdahalesi ve kök neden analizi dahil üretim ortamının sorumluluğunu üstlenebiliriz.',
        deliverables: [
          'REST API ve belgeleri',
          'Veri modeli ve güvenlik kuralları',
          'İzleme, uyarılar ve olay müdahale süreci',
        ],
        stack: 'Node.js, TypeScript, Firestore, Cloud Functions',
      },
      {
        id: 'automation',
        title: 'Veri otomasyonu',
        body: 'Açık, resmî ya da kurum içi kaynakları belirlenen aralıklarla toplayıp ortak bir yapıya dönüştürürüz. Bir kaynak biçim değiştirdiğinde ya da erişilemez olduğunda bu kayda geçer ve size bildirilir.',
        deliverables: [
          'Zamanlanmış toplama ve dönüştürme işleri',
          'Kaynak başına sağlık kontrolü',
          'Belgelenmiş şema; CSV, JSON ya da veritabanı',
        ],
        stack: 'Python, SQLite, zamanlanmış işler',
      },
      {
        id: 'verification',
        title: 'Veri doğrulama ve kaynaklı raporlama',
        body: 'Verinizi dayandığı resmî ya da kurum içi kaynakla karşılaştırırız. Bir tutarsızlık yalnızca kaynakta gösterilebildiğinde raporlanır.',
        deliverables: [
          'Satır bazında kaynak bağlantılı rapor',
          'Kanıtıyla birlikte tutarsızlık listesi',
          'Doğrulanamayan kayıtların ayrı dökümü',
        ],
        stack: 'Python, PDF ve HTML ayrıştırma, elle kontrol',
      },
    ],
  },
  method: {
    title: 'Nasıl çalışıyoruz',
    intro: 'İşe küçük başlar, her adımda sizin onayınızla ilerleriz.',
    steps: [
      {
        title: 'Küçük kapsam',
        body: 'Tek bir ekran, tek bir entegrasyon ya da tek bir veri kaynağıyla başlarız. Neyin teslim edileceği yazılı olarak netleşir.',
      },
      {
        title: 'Somut örnek',
        body: 'Yazılımda çalışan küçük bir ön sürüm, veri işlerinde kaynaklı bir örnek hazırlarız. Sonucu kendiniz deneyebilirsiniz.',
      },
      {
        title: 'Onaylı pilot',
        body: 'Örneği onayladığınızda sınırlı süreli bir pilot yürütülür. Kapsam ve çalışma düzeni bu aşamada oturur.',
      },
      {
        title: 'Düzenli teslim',
        body: 'Anlaşılan aralıklarla teslim edilir. Her teslimde yapılanlar, açık konular ve bilinen eksikler yazılır.',
      },
    ],
    principles: [
      {
        id: 'principle-source',
        title: 'Kaynak gösterme',
        body: 'Bir bilgi ya da tutarsızlık iddiası, dayandığı kaynakla birlikte teslim edilir.',
      },
      {
        id: 'principle-review',
        title: 'İnsan incelemesi',
        body: 'Otomasyon toplar ve karşılaştırır; sonuçlar teslimden önce bir insan tarafından gözden geçirilir.',
      },
      {
        id: 'principle-data',
        title: 'Asgari veri',
        body: 'Yalnızca işin gerektirdiği veri işlenir; amacı ve saklama süresi baştan yazılır (KVKK).',
      },
      {
        id: 'principle-owner',
        title: 'Tek sorumlu',
        body: 'Stüdyoyu kıdemli bir yazılım mühendisi yürütür; işinizi baştan sona aynı kişi takip eder.',
      },
    ],
  },
  work: {
    title: 'Örnek çalışmalar',
    intro:
      'Veri kalitesi işlerinden iki örnek. Grafiklerdeki sayılar, indirilebilen tek sayfalık özetlerdeki doğrulanmış sonuçlardır. Ayrıntılı rapor görüşmede paylaşılır.',
    downloadNote: 'PDF, 1 sayfa',
    pendingNote: 'Özet yakında eklenecek.',
    items: [
      {
        id: 'placement',
        title: 'Tercih ön kontrolü: ÖSYM KPSS-2025/2',
        body: 'Kurgusal bir aday profili için 13 ildeki her kadro satırı, kılavuzdaki nitelik kodlarıyla tek tek eşleştirildi. Her satır resmî belge ve sayfa numarasıyla verildi.',
        chartTitle: '13 ildeki 513 kadro, nitelik uygunluğuna göre',
        chartUnit: 'kadro',
        segments: [
          { key: 'yes', label: 'Uygun', value: 78 },
          { key: 'check', label: 'Kontrol gerekir', value: 74 },
          { key: 'no', label: 'Uygun değil', value: 361 },
        ],
        facts: [
          { value: '990', label: 'Tablo-3 satırı ayrıştırıldı, eksik 0' },
          { value: '39', label: 'görsel kontrol, 0 uyuşmazlık' },
        ],
        pdf: 'proofvane-ornek-tercih-on-kontrol.pdf',
        pdfLabel: 'Özeti indir',
        source:
          'Kaynak: ÖSYM Tercih Kılavuzu ve Tablo-3 (18.12.2025). Kurgusal profil; tahmin değildir.',
      },
      {
        id: 'listing',
        title: 'İlan veri doğruluğu denetimi: Kariyer Kapısı',
        body: 'Beş açık ilandan birer pozisyonun 11 alanı üç resmî kaynakta karşılaştırıldı. Fark yalnızca kaynaktan birebir alıntıyla gösterilebildiğinde raporlandı.',
        chartTitle: '55 karşılaştırma (5 pozisyon, 11 alan), sonuca göre',
        chartUnit: 'karşılaştırma',
        segments: [
          { key: 'same', label: 'Uyumlu', value: 46 },
          { key: 'interp', label: 'Yorum gerektirir', value: 2 },
          { key: 'missing', label: 'Kaynakta yok', value: 6 },
          { key: 'diff', label: 'Farklı', value: 1 },
        ],
        facts: [
          { value: '22.10', label: 'Kariyer Kapısı’ndaki son başvuru günü' },
          { value: '12–20 Ekim', label: 'kurumun kendi duyurusundaki başvuru aralığı' },
        ],
        pdf: 'proofvane-ornek-ilan-veri-dogruluk.pdf',
        pdfLabel: 'Özeti indir',
        source:
          'Kaynaklar 13.10.2026’da okundu; fark 14.10.2026’da yeniden kontrol edildi. Kişisel veri içermez.',
      },
    ],
  },
  contact: {
    title: 'Bir sonraki adım',
    body: 'Bir uygulama, entegrasyon ya da veri işi için ne yapmak istediğinizi birkaç cümleyle yazın. Kapsamı ilk görüşmede birlikte netleştiririz.',
    cta: 'E-posta gönderin',
    emailLabel: 'Proje ve teklif',
    partnershipsLabel: 'İş birlikleri',
    fallback: 'İletişim adresi yakında.',
  },
  footer: {
    legal: (brand, legalName) => `${brand}, ${legalName} işletmesinin markasıdır.`,
    place: 'Ankara, Türkiye',
  },
};
