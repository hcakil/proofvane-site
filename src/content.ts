/**
 * Sayfadaki Türkçe metinler. Marka adı buraya yazılmaz; `site.config.ts`
 * içindeki `brandName` kullanılır.
 *
 * Kural: müşteri logosu, referans yorumu, uydurma sayı ya da süre/sonuç
 * vaadi yok. `tests/forbidden-phrases.test.ts` bu dosyayı ve derlenmiş
 * sayfayı tarar.
 */

export const nav = [
  { href: '#hizmetler', label: 'Hizmetler' },
  { href: '#yontem', label: 'Yöntem' },
  { href: '#ornekler', label: 'Örnek çalışmalar' },
  { href: '#iletisim', label: 'İletişim' },
] as const;

export const hero = {
  title: 'Yazılımı yayından sonra da sahiplenen küçük bir stüdyo.',
  lede: (brand: string, city: string) =>
    `${brand}, ${city}’da bir yazılım stüdyosu. Flutter ile iOS ve Android uygulamaları, web uygulamaları ve API’ler geliştiriyor; veri otomasyonu ve kaynak gösteren veri doğrulama işleri yapıyoruz.`,
  primaryCta: { href: '#hizmetler', label: 'Hizmetleri inceleyin' },
  secondaryCta: { href: '#yontem', label: 'Nasıl çalıştığımızı görün' },
  figure: {
    title: 'Her teslimde',
    items: [
      { term: 'Kaynak kodu', desc: 'Sizin deponuzda ve sizin hesaplarınızda.' },
      { term: 'Testler ve CI', desc: 'Değişiklikler otomatik testlerden geçerek yayına çıkar.' },
      { term: 'İzleme', desc: 'Hatalar kayda geçer; kimin, nasıl bakacağı yazılıdır.' },
      {
        term: 'Kaynak bağlantısı',
        desc: 'Veri işlerinde her satır dayandığı kaynağa bağlanır.',
        ref: { href: '#ilke-kaynak', label: 'Kaynak gösterme ilkesi' },
      },
    ] as { term: string; desc: string; ref?: { href: string; label: string } }[],
    caption: 'Kapsam ve teslim biçimi her projede baştan yazılı olarak netleşir.',
  },
};

export interface Service {
  id: string;
  title: string;
  body: string;
  deliverables: string[];
}

export const services = {
  title: 'Hizmetler',
  intro:
    'Uygulama geliştirme ve veri işleri. Küçük ekiplerin ve kurumların uzun vadede bakımını yapabileceği, belgelenmiş işler teslim ediyoruz.',
  deliverablesLabel: 'Teslim edilenler',
  groups: [
    {
      id: 'uygulama',
      title: 'Uygulama geliştirme',
      items: [
        {
          id: 'mobil',
          title: 'Mobil uygulamalar',
          body: 'Flutter ile tek kod tabanından iOS ve Android uygulamaları. Çevrimdışı çalışma, bildirimler, ödeme ve mağaza yayın süreci dahil uçtan uca geliştirme; var olan bir uygulamanın devralınması da olur.',
          deliverables: [
            'iOS ve Android uygulaması, mağaza yayın hazırlığı',
            'Birim, widget ve entegrasyon testleri',
            'Hata izleme ve sürüm notları',
          ],
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
        },
        {
          id: 'api',
          title: 'API ve backend',
          body: 'TypeScript/Node ve Firebase ile API’ler, arka plan işleri ve entegrasyonlar. İzleme, olay müdahalesi ve kök neden analizi dahil üretim ortamının sorumluluğunu üstlenebiliriz.',
          deliverables: [
            'REST API ve belgeleri',
            'Firestore veri modeli ve güvenlik kuralları',
            'İzleme, uyarılar ve olay müdahale süreci',
          ],
        },
      ] as Service[],
    },
    {
      id: 'veri',
      title: 'Veri işleri',
      items: [
        {
          id: 'veri-dogrulama',
          title: 'Veri doğrulama ve kaynaklı raporlama',
          body: 'Mevcut verinizi dayandığı resmî ya da kurum içi kaynakla karşılaştırırız. Rapordaki her satır kaynağına bağlantı verir; bir tutarsızlık yalnızca kaynakta gösterilebildiğinde raporlanır, gösterilemeyenler ayrıca “doğrulanamadı” olarak işaretlenir.',
          deliverables: [
            'Satır bazında kaynak bağlantılı rapor (PDF ve tablo)',
            'Kanıtıyla birlikte tutarsızlık listesi',
            'Doğrulanamayan kayıtların ayrı dökümü',
          ],
        },
        {
          id: 'veri-otomasyonu',
          title: 'Veri otomasyonu',
          body: 'Açık, resmî ya da kurum içi veri kaynaklarını belirlenen aralıklarla toplayıp ortak bir yapıya dönüştürürüz. Zamanlanmış iş akışları sağlık kontrolleriyle çalışır; bir kaynak biçim değiştirdiğinde ya da erişilemez olduğunda bu kayda geçer ve size bildirilir.',
          deliverables: [
            'Zamanlanmış toplama ve dönüştürme işleri',
            'Kaynak başına sağlık kontrolü ve hata kaydı',
            'Belgelenmiş veri şeması; CSV, JSON ya da veritabanı çıktısı',
          ],
        },
      ] as Service[],
    },
  ],
};

export const method = {
  title: 'Nasıl çalışıyoruz',
  intro: 'İşe küçük başlar, her adımda sizin onayınızla ilerleriz.',
  steps: [
    {
      title: 'Küçük kapsam',
      body: 'Tek bir ekran, tek bir entegrasyon ya da tek bir veri kaynağıyla başlarız. Neyin teslim edileceği yazılı olarak netleşir.',
    },
    {
      title: 'Somut örnek',
      body: 'Yazılımda çalışan küçük bir ön sürüm, veri işlerinde kaynaklı bir örnek hazırlarız. Sonucu kendiniz deneyip kontrol edebilirsiniz.',
    },
    {
      title: 'Onaylı pilot',
      body: 'Örneği onayladığınızda sınırlı süreli bir pilot yürütülür. Kapsam, biçim ve çalışma düzeni bu aşamada oturur.',
    },
    {
      title: 'Düzenli teslim',
      body: 'Üzerinde anlaşılan aralıklarla teslim edilir. Her teslimde yapılanlar, açık konular ve bilinen eksikler belirtilir.',
    },
  ],
  principles: [
    {
      id: 'ilke-kaynak',
      title: 'Kaynak gösterme',
      body: 'Bir bilgi ya da tutarsızlık iddiası, dayandığı kaynakla birlikte teslim edilir. Kanıtlanamayan durum öyle işaretlenir.',
    },
    {
      id: 'ilke-inceleme',
      title: 'İnsan incelemesi',
      body: 'Otomasyon toplar, test eder ve karşılaştırır; sonuçlar teslimden önce bir insan tarafından gözden geçirilir.',
    },
    {
      id: 'ilke-kvkk',
      title: 'KVKK’ya uygun, asgari veri',
      body: 'Yalnızca işin gerektirdiği veri işlenir. Kişisel veri gerekiyorsa amacı, saklama süresi ve silinmesi baştan yazılı olarak belirlenir.',
    },
    {
      id: 'ilke-sorumlu',
      title: 'Tek sorumlu',
      body: 'Stüdyoyu kıdemli bir yazılım mühendisi yürütür; işinizi baştan sona aynı kişi takip eder.',
    },
  ],
};

export const demos = {
  title: 'Örnek çalışmalar',
  intro:
    'Veri kalitesi işlerinden iki örnek. Her biri için tek sayfalık bir özet indirilebilir; ayrıntılı rapor görüşmede paylaşılır. Kartlardaki tablo görselleri yalnızca biçimi gösterir, içlerindeki satırlar gerçek veri değildir.',
  badge: 'Örnek çalışma · tek sayfalık özet',
  pendingNote: 'Özet yakında eklenecek.',
  downloadLabel: 'Özeti indir (PDF, 1 sayfa)',
};

export const contact = {
  title: 'İletişim',
  intro:
    'Bir uygulama, entegrasyon ya da veri işi hakkında konuşmak isterseniz kısa bir not yeterli.',
  emailLabel: 'E-posta',
  fallback: 'İletişim adresi yakında.',
  fallbackDetail: 'Alan adı ve e-posta kutusu henüz hazırlanıyor.',
  detail:
    'Ne yapmak istediğinizi birkaç cümleyle anlatmanız yeterli; kapsamı ilk görüşmede birlikte netleştiririz.',
};

export const footer = {
  english: (brand: string) =>
    `${brand} is a small software studio in Ankara, Türkiye: Flutter mobile apps, web apps, APIs and source-referenced data work.`,
  legal: (brand: string, legal: string) => `${brand}, ${legal} işletmesinin markasıdır.`,
  navLabel: 'Alt menü',
};

export const meta = {
  titleSuffix: 'Yazılım stüdyosu, Ankara',
  ogImage: '/og-image.png',
  ogImageAlt: 'Proofvane — yazılım ve veri stüdyosu, Ankara',
  description:
    'Ankara’da küçük bir yazılım stüdyosu: Flutter ile iOS ve Android uygulamaları, web uygulamaları, API ve backend geliştirme, veri otomasyonu ve kaynaklı veri doğrulama.',
};
