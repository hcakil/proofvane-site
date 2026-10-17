import type { SiteText } from './types';
import { PAGES } from './pages-tr';

export const tr: SiteText = {
  locale: 'tr',
  htmlLang: 'tr',
  ogLocale: 'tr_TR',
  meta: {
    titleSuffix: 'Bağımsız yazılım mühendisliği stüdyosu',
    description:
      'Proofvane, Ankara’da bağımsız bir yazılım mühendisliği stüdyosu. iOS ve Android için Flutter mobil uygulamalar, web uygulamaları, backend, API ve entegrasyonlar geliştiriyoruz; otomatik test, CI/CD ve izleme ile birlikte.',
    ogImageAlt: 'Proofvane: bağımsız yazılım mühendisliği stüdyosu, Ankara',
  },
  a11y: {
    skip: 'İçeriğe geç',
    mainNav: 'Ana menü',
    footerNav: 'Alt menü',
    langNav: 'Dil seçimi',
    langNames: { tr: 'Türkçe', en: 'English' },
    menu: 'Menü',
    theme: { label: 'Tema', system: 'Sistem', light: 'Açık', dark: 'Koyu' },
  },
  nav: [
    { href: '#work', label: 'Çalışmalar' },
    { href: '#solutions', label: 'Çözümler' },
    { href: '#services', label: 'Hizmetler' },
    { href: '#contact', label: 'İletişim' },
  ],
  hero: {
    eyebrow: 'Bağımsız yazılım mühendisliği stüdyosu · Ankara',
    title: 'Demodan öte, gerçek dünyada çalışan yazılım.',
    lede: (brand) =>
      `${brand}; mobil uygulamaları, web uygulamalarını, API’leri ve onların arkasındaki sistemleri tasarlar ve geliştirir. Test edilmiş, izlenen; gerçek kullanıcıya, zayıf bağlantıya ve bir sonraki sürüme hazır yazılım.`,
    primaryCta: 'Projenizi konuşalım',
    secondaryCta: { href: '#work', label: 'Nasıl geliştirdiğimizi görün' },
    capabilities: [
      { id: 'mobile', label: 'Mobil', detail: 'Flutter · iOS · Android' },
      { id: 'web', label: 'Web', detail: 'Uygulama, portal, yönetim paneli' },
      { id: 'api', label: 'Backend ve API', detail: 'Servisler ve entegrasyonlar' },
      { id: 'reliability', label: 'Güvenilirlik', detail: 'Test · CI/CD · izleme' },
      { id: 'data', label: 'Veri', detail: 'Otomasyon ve doğrulama' },
    ],
    process: {
      label:
        'Temsilî süreç görseli: Bir mobil uygulama, bir web paneli ve onları besleyen backend sırasıyla tasarlanır, geliştirilir, test edilir ve yayınlanır.',
      caption: 'Temsilî görsel: bir projenin dört aşaması.',
      steps: [
        { id: 'design', label: 'Tasarla', detail: 'Ekranlar ve akış' },
        { id: 'build', label: 'Geliştir', detail: 'Mobil, web, backend' },
        { id: 'test', label: 'Test et', detail: 'Otomatik testler' },
        { id: 'ship', label: 'Yayınla', detail: 'Mağaza ve sunucu' },
      ],
      scene: {
        web: 'Web paneli',
        mobile: 'Mobil uygulama',
        backend: 'Backend',
        checks: ['iOS', 'Android', 'Web'],
        live: 'Yayında',
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
  showcases: {
    mobile: {
      index: '01',
      kicker: 'Mobil mühendislik · Uygulama güvenilirliği',
      title: 'Her sürüm aynı kapıdan geçer.',
      body: 'iOS ve Android için Flutter uygulamalarını, onları yayına taşıyan hatla birlikte kuruyoruz: her değişiklikte analiz ve testler, iki platformda entegrasyon testleri, imzalı derlemeler ve çökme raporları artınca duran kademeli yayın.',
      status:
        'Yetenek gösterimi, müşteri projesi değildir. Hat, tarayıcınızda çalışan bir simülasyondur.',
      points: [
        'Her pull request’te unit, widget ve entegrasyon testleri',
        'iOS ve Android hedeflerinde entegrasyon koşuları',
        'Mağaza derlemeleri dizüstünde değil, CI’da imzalanır',
        'Çökme oranı kapısı ve geri alma ile kademeli yayın',
        'Yeniden deneme kuyruğuyla çevrimdışı öncelikli veri',
      ],
      stack: 'Flutter, Dart, GitHub Actions, Fastlane, Firebase Crashlytics',
      demoToggle:
        'Teknik ayrıntı: çevrimdışı çalışan uygulama nasıl senkronize olur? (etkileşimli)',
      demo: {
        label:
          'Etkileşimli konsept: Bir mobil bakım uygulamasında görev tamamlanır; istek API’den, iş kuyruğundan ve veritabanından geçer, ardından bildirim gönderilir. Telefonu çevrimdışına alıp isteklerin cihazdaki kuyrukta beklediğini görebilirsiniz.',
        caption:
          'Konsept gösterim, müşteri projesi değildir. Tarayıcınızda çalışır; sayfadan veri çıkmaz.',
        app: {
          title: 'Bugün',
          subtitle: 'Bakım ekibi · B Blok',
          tasks: [
            { id: '118', title: 'Asansör makine dairesi kontrolü', meta: 'Kat −1 · 09:30' },
            { id: '124', title: 'Koridor aydınlatma değişimi', meta: 'Kat 4 · 11:00' },
            { id: '131', title: 'Yangın kapısı denetimi', meta: 'Merdiven · 14:00' },
          ],
          action: 'Bitti',
          synced: 'Senkronize',
          queued: 'Ağ bekleniyor',
          online: 'Çevrimiçi',
          offline: 'Çevrimdışı',
        },
        nodes: [
          { id: 'api', label: 'API', detail: 'POST /v1/tasks/:id/complete' },
          { id: 'queue', label: 'İş kuyruğu', detail: 'bekleyerek yeniden dener' },
          { id: 'db', label: 'Veritabanı', detail: 'idempotent yazma' },
          { id: 'push', label: 'Bildirim', detail: 'APNs · FCM' },
        ],
        controls: {
          networkOff: 'Çevrimdışı yap',
          networkOn: 'Bağlantıyı aç',
          reset: 'Sıfırla',
          hint: 'Bir görevde “Bitti”ye dokunun.',
        },
        log: {
          title: 'Olay günlüğü',
          idle: 'Bir işlem bekleniyor.',
          optimistic: '{task}: önce cihazda tamamlandı',
          request: 'POST /v1/tasks/{id}/complete · Idempotency-Key {key}',
          accepted: 'API 202 · iş kuyruğa alındı',
          stored: 'Worker bir kez kaydetti; tekrarlar yok sayılır',
          notified: 'Ekip liderine bildirim gönderildi',
          offline: 'Ağ yok: istek cihazdaki kuyrukta bekliyor',
          reconnect: 'Bağlantı geldi: kuyruktaki {n} istek gönderiliyor',
        },
      },
      pipeline: {
        window: 'release / v2.4.0',
        stages: [
          { id: 'analyze', label: 'Analiz', detail: 'dart analyze · lint' },
          { id: 'unit', label: 'Unit testler', detail: 'alan ve senkron mantığı' },
          { id: 'widget', label: 'Widget testler', detail: 'ekranlar ve durumlar' },
          { id: 'integration', label: 'Entegrasyon', detail: 'iOS · Android' },
          { id: 'build', label: 'Derle ve imzala', detail: 'IPA · AAB' },
          { id: 'rollout', label: 'Kademeli yayın', detail: 'sağlık kapısı' },
        ],
        failAt: 'widget',
        run: 'Sürümü çalıştır',
        regress: 'Hata ekle',
        idle: 'Hazır. Bir koşu seçin.',
        running: 'Çalışıyor…',
        passed: 'Sağlık kapısından sonra tüm kullanıcılara yayınlandı.',
        blocked: 'Widget testlerinde durdu. Hiçbir kullanıcıya ulaşmadı.',
        failure: 'SyncBadge “Ağ bekleniyor” gösteriyor; beklenen “Senkronize”.',
        rolloutLabel: 'Yayın',
        rollout: ['Ekip içi', '%10', '%50', 'Tüm kullanıcılar'],
        gate: 'Çökme oranı kapısı geçildi',
      },
    },
    systems: {
      index: '02',
      kicker: 'Backend · Entegrasyon · Otomasyon',
      title: 'Dağınık kaynakları okuyan, dürüst kalan veri hatları.',
      body: 'Veri incelemelerimiz için resmî HTML sayfalarını, PDF tablolarını ve taranmış belgeleri okuyan toplayıcılar, tüm kaynaklar için tek bir ortak şema ve alıntılanan her değeri her derlemede kaynağıyla yeniden karşılaştıran bir kontrol kurduk. Aynı yaklaşım uygulamaların arkasındaki entegrasyonlarda ve arka plan işlerinde de çalışır.',
      status: 'Gerçek proje. Sayılar aşağıdaki yayımlanmış tek sayfalık özetlerden gelir.',
      flow: [
        { label: 'Topla', detail: 'HTML · PDF · OCR' },
        { label: 'Ayrıştır', detail: 'tablodan satıra' },
        { label: 'Normalleştir', detail: 'tek ortak şema' },
        { label: 'Karşılaştır', detail: 'sayfa referanslı kurallar' },
        { label: 'İncele', detail: 'bir kişi onaylar' },
        { label: 'Raporla', detail: 'kaynak bağlantılı PDF' },
      ],
      facts: [
        { value: '990', label: 'tablo satırı ayrıştırıldı, 0 eksik' },
        { value: '3', label: 'kayıt başına karşılaştırılan resmî kaynak' },
        { value: '55', label: 'alan karşılaştırması, her biri birebir alıntılı' },
      ],
      stack: 'Python, TypeScript, SQLite, zamanlanmış işler',
    },
  },
  work: {
    index: '03',
    kicker: 'Veri doğrulama',
    status: 'Gerçek projeler. Her özet tek sayfalık bir PDF’tir.',
    title: 'İndirilebilir iki veri incelemesi',
    intro:
      'Resmî kamu verisi üzerinde hazırlandı. Arayüzler temsilîdir; içlerindeki her değer doğrulanmış tek sayfalık özetten gelir.',
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
  solutions: {
    index: '03',
    kicker: 'Sektör çözümleri',
    title: 'Kamu verisiyle çalışan ekipler için iki hizmet.',
    intro:
      'Aynı mühendislik yaklaşımını, resmî kılavuz ve ilanlarla çalışan danışmanlar ve yayıncılar için iki hizmete dönüştürmeyi değerlendiriyoruz. Her ikisi de gerçek bir örnek çalışmaya dayanıyor.',
    more: 'Nasıl çalıştığını görün',
  },
  solutionsPath: 'cozumler',
  pages: PAGES,
  notFound: {
    title: 'Sayfa bulunamadı',
    body: 'Aradığınız adres taşınmış ya da hiç var olmamış olabilir.',
    home: 'Ana sayfaya dönün',
  },
  contact: {
    title: 'Bir sonraki adım',
    body: 'Bir uygulama, entegrasyon ya da veri işi için ne yapmak istediğinizi birkaç cümleyle yazın. Kapsamı ilk görüşmede birlikte netleştiririz.',
    cta: 'E-posta gönderin',
    phoneLabel: 'Telefon',
    emailLabel: 'Proje ve teklif',
    partnershipsLabel: 'İş birlikleri',
    fallback: 'İletişim adresi yakında.',
  },
  footer: {
    legal: (brand, legalName) => `${brand}, ${legalName} işletmesinin markasıdır.`,
    place: 'Ankara, Türkiye',
  },
};
