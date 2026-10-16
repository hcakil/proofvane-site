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
  },
  nav: [
    { href: '#services', label: 'Hizmetler' },
    { href: '#method', label: 'Yöntem' },
    { href: '#work', label: 'Örnek çalışmalar' },
    { href: '#contact', label: 'İletişim' },
  ],
  hero: {
    title: 'Yayına çıkan yazılım. Kaynağıyla doğrulanan veri.',
    lede: (brand, city) =>
      `${brand}, ${city}’da bir yazılım mühendisliği stüdyosu. Flutter ile mobil ve web uygulamaları, arkasındaki API’leri ve veri akışlarını kuruyor; her veriyi dayandığı kaynakla doğruluyoruz.`,
    primaryCta: 'Projenizi anlatın',
    secondaryCta: { href: '#work', label: 'Çalışmaları inceleyin' },
    capabilities: [
      'Flutter: iOS, Android, web',
      'API ve backend',
      'Veri otomasyonu',
      'Kaynaklı doğrulama',
    ],
    visual: {
      label:
        'Temsilî ürün görselleştirmesi: bir veri akışı, bir API konsolu ve bir Flutter uygulaması aynı ilan tarihindeki farkı gösteriyor.',
      caption:
        'Temsilî arayüz. Gösterilen ilan ve tarih farkı gerçek: Demo 2, kaynaklar 13–14.10.2026’da karşılaştırıldı.',
      pipeline: {
        title: 'ilan-doğruluk / akış',
        steps: [
          { label: 'Seçilen ilan', value: '5', state: 'ok' },
          { label: 'Resmî kaynak', value: '3', state: 'ok' },
          { label: 'Alan karşılaştırması', value: '55', state: 'ok' },
          { label: 'Kaynaklar arası fark', value: '1', state: 'diff' },
        ],
      },
      console: {
        title: 'api / doğrulama',
        lines: [
          { text: 'fetch  kariyerkapisi  ilan/milli-saraylar' },
          { text: 'fetch  millisaraylar.gov.tr  DuyuruDetay/2243' },
          { text: 'match  basvuru_bitis  S1 = S2', state: 'ok' },
          { text: 'match  basvuru_bitis  S2 ≠ S3', state: 'diff' },
          { text: 'recheck  14.10.2026 21:14  değişmedi' },
        ],
      },
      app: {
        title: 'İlanlar',
        listingTitle: 'Koruma ve Güvenlik Görevlisi',
        listingMeta: 'Millî Saraylar İdaresi Başkanlığı, İstanbul, 80 kişi',
        alertTitle: 'Son başvuru tarihi kaynaklarda farklı',
        alertRows: [
          { source: 'Kariyer Kapısı', value: '22.10.2026' },
          { source: 'Kurum duyurusu', value: '12–20 Ekim 2026' },
        ],
        action: 'Kurumla teyit edin',
      },
    },
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
    title: 'Seçili çalışmalar',
    intro:
      'Resmî kamu verisi üzerinde hazırlanmış iki veri doğrulama çalışması. Arayüzler temsilîdir; içlerindeki her değer doğrulanmış tek sayfalık özetten gelir.',
    downloadNote: 'PDF, 1 sayfa',
    pendingNote: 'Özet yakında eklenecek.',
    representative: 'Temsilî arayüz, doğrulanmış veriler',
    problemLabel: 'Sorun',
    approachLabel: 'Yaklaşım',
    outcomeLabel: 'Sonuç',
    items: [
      {
        id: 'listing',
        title: 'İlan veri doğruluğu denetimi: Kariyer Kapısı',
        body: 'Beş açık ilandan birer pozisyonun 11 alanı üç resmî kaynakta karşılaştırıldı.',
        tags: ['Veri doğrulama', 'HTML ve PDF ayrıştırma', 'OCR', 'Python'],
        problem:
          'Aynı ilan Kariyer Kapısı’nın yapısal alanlarında, ilan metninde ve kurumun kendi duyurusunda yer alıyor. Bu kaynaklar her zaman aynı bilgiyi vermiyor.',
        approach:
          'Her alan üç kaynaktan birebir alıntıyla kaydedildi; alıntılar her derlemede kaynak metne karşı betikle yeniden denetlendi. Fark yalnızca kaynakta gösterilebildiğinde raporlandı.',
        outcome:
          '55 karşılaştırmanın 46’sı uyumlu, 6’sı kaynakta yok, 2’si yorum gerektiriyor ve 1 gerçek fark var: Millî Saraylar ilanının son başvuru tarihi.',
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
        ui: {
          kind: 'sources',
          window: 'ilan-doğruluk / milli-saraylar',
          heading: 'Başvuru bitiş tarihi, üç kaynak',
          rows: [
            {
              id: 'S1',
              label: 'Kariyer Kapısı yapısal alan',
              value: '2026-10-22T23:59:00',
              state: 'same',
            },
            {
              id: 'S2',
              label: 'Kariyer Kapısı ilan metni',
              value: '“…22.10.2026 tarihinde sona erecektir.”',
              state: 'same',
            },
            {
              id: 'S3',
              label: 'Kurum duyurusu',
              value: '“…12-20 Ekim 2026 tarihleri arasında…”',
              state: 'diff',
            },
          ],
          verdict: 'Farklı. 14.10.2026 21:14’te yeniden kontrol edildi; üç kaynak da değişmemişti.',
        },
        pdf: 'proofvane-ornek-ilan-veri-dogruluk.pdf',
        pdfLabel: 'Tek sayfalık özeti indir',
        source:
          'Kaynaklar 13.10.2026’da okundu; fark 14.10.2026’da yeniden kontrol edildi. Kişisel veri içermez.',
      },
      {
        id: 'placement',
        title: 'Tercih ön kontrolü: ÖSYM KPSS-2025/2',
        body: 'Kurgusal bir aday profili için 13 ildeki her kadro satırı nitelik kodlarıyla eşleştirildi.',
        tags: ['Kural motoru', 'PDF tablo ayrıştırma', 'İnsan doğrulaması'],
        problem:
          'Tercih kılavuzundaki yüzlerce kadro satırının hangisine başvurulabileceği, birbirine bağlı nitelik kodlarına ve kılavuzdaki birleştirme kuralına bağlı.',
        approach:
          'Tablo-3’ün 990 satırı ayrıştırıldı; kodlar kılavuzdaki VEYA/VE kuralıyla, sayfa numarası alıntılanarak eşleştirildi. 13 satır sayfa görüntüsüyle elle karşılaştırıldı.',
        outcome:
          '513 kadronun 78’i uygun, 74’ü ek kontrol gerektiriyor, 361’i uygun değil. 39 görsel kontrolde 0 uyuşmazlık; eksik satır 0.',
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
        ui: {
          kind: 'eligibility',
          window: 'tercih-ön-kontrol / 13 il',
          heading: 'Örnek satır: ÖSYM kodu 302010486',
          detail: [
            { label: 'Kurum', value: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı' },
            { label: 'Kadro', value: 'Sözleşmeli Personel / Büro Personeli, Ankara, 17 adet' },
            { label: 'Nitelik', value: 'İşletme mezununu 4431 kodu karşılıyor; ek şart yok' },
            { label: '2025/2 en küçük puan', value: '80,71056 (tarihsel; tahmin değildir)' },
          ],
          verdict: 'Uygun (nitelik açısından)',
        },
        pdf: 'proofvane-ornek-tercih-on-kontrol.pdf',
        pdfLabel: 'Tek sayfalık özeti indir',
        source:
          'Kaynak: ÖSYM Tercih Kılavuzu ve Tablo-3 (18.12.2025). Kurgusal profil; tahmin değildir.',
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
