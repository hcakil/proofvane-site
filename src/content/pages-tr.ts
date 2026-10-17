import type { SolutionPage } from './types';

/**
 * Türkçe çözüm sayfaları. Sayılar `tr.ts` içindeki doğrulanmış örneklerden
 * gelir; burada yalnızca anlatım vardır. Kural: canlı ürün varmış gibi
 * anlatılmaz, nitelik uygunluğu atanma ihtimaliyle karıştırılmaz, hiçbir
 * yayıncının hata yaptığı söylenmez.
 */
export const PAGES: Record<SolutionPage['key'], SolutionPage> = {
  precheck: {
    key: 'precheck',
    slug: 'tercih-on-kontrol',
    demoId: 'placement',
    meta: {
      title: 'KPSS tercih ön kontrolü, tercih danışmanları için',
      description:
        'Danışanın öğrenim bilgilerini ÖSYM kılavuzundaki nitelik şartlarıyla karşılaştırıp kadroları uygun, kontrol gerektiren ve uygun olmayan olarak ayıran, gerekçeli ve kaynaklı ön kontrol raporu. İnsan incelemesiyle sunulan bir hizmet.',
    },
    audience: 'Tercih danışmanları, KPSS kurs ve koçluk kurumları için',
    title: 'Danışanınız hangi kadrolara başvurabilir? Gerekçesi ve kaynağıyla.',
    lede: 'Adayın öğrenim bilgilerini ÖSYM tercih kılavuzundaki nitelik şartlarıyla karşılaştırıyor, kadroları üç gruba ayırıyoruz: uygun, kontrol gerektiren ve uygun olmayan. Her kararın yanında kılavuzdaki dayanağı yazar; sonuç size iletilmeden önce bir kişi tarafından kontrol edilir.',
    notice:
      'Bu bir uygulama ya da otomatik sistem değil; kontrollü insan incelemesiyle sunmayı değerlendirdiğimiz bir hizmettir. Nitelik uygunluğu, atanma ihtimali anlamına gelmez.',
    cta: {
      label: 'Örnek üzerinden 15 dakika konuşalım',
      subject: 'Tercih ön kontrolü: örnek üzerinden görüşme',
    },
    pdfCta: 'Örnek raporun tek sayfalık özeti',
    problem: {
      title: 'Sorun',
      body: 'Tercih kılavuzunda yüzlerce kadro satırı ve birbirine bağlı nitelik kodları var. Bir danışanın karşılayabileceği kadroları kılavuzdan tek tek araştırmak zaman alıyor; gözden kaçan tek bir kod, danışanı uygun olmadığı bir kadroya yönlendirebilir ya da uygun bir kadroyu atlatabilir.',
    },
    steps: {
      title: 'Nasıl çalışır',
      items: [
        {
          title: 'Aday profili',
          body: 'Danışanın mezun olduğu bölüm, öğrenim düzeyi, puan türü ve varsa ek nitelikleri. Örnek çalışmada kurgusal bir aday profili kullanıldı.',
        },
        {
          title: 'Kılavuz şartlarıyla karşılaştırma',
          body: 'Her kadro satırındaki nitelik kodları, kılavuzdaki VE/VEYA kuralına göre aday profiliyle karşılaştırılır; dayanak olarak kılavuz sayfası not edilir.',
        },
        {
          title: 'Üç gruba ayırma ve insan kontrolü',
          body: 'Kadrolar uygun, kontrol gerektiren ve uygun olmayan olarak ayrılır. Örnek satırlar kılavuz sayfalarıyla elle karşılaştırılır; rapor bundan sonra danışmana iletilir.',
        },
      ],
    },
    demo: {
      title: 'Gerçek örnek: KPSS-2025/2, 13 il',
      body: 'Kurgusal bir aday için 13 ildeki 513 kadro, ÖSYM Tablo 3’teki şartlarla karşılaştırıldı.',
      note: 'Kaynak: ÖSYM KPSS-2025/2 Tercih Kılavuzu ve Tablo 3 (yayım 18.12.2025); karşılaştırma 14.10.2026’da tamamlandı. Kurgusal profil; tahmin değildir.',
    },
    checks: {
      title: 'Raporda neler var',
      intro: 'Danışman ön kontrol raporu, bir kadronun neden o gruba girdiğini gösterir:',
      items: [
        'Kadro bazında grup: uygun, kontrol gerektiren, uygun olmayan',
        'Her karar için gerekçe: hangi nitelik kodu karşılandı ya da karşılanmadı',
        'Kılavuzdaki dayanak: tablo ve sayfa referansı',
        'Kontrol gerektiren kadrolarda neyin teyit edilmesi gerektiği',
        'Varsa geçmiş dönemin en düşük puanı; tahmin olarak değil, bilgi olarak',
      ],
    },
    limits: {
      title: 'Neyi kapsamaz',
      items: [
        'Atanma ihtimali ya da puan tahmini yapmaz.',
        'Kadrolardaki rekabeti ve ÖSYM’nin yerleştirme sonucunu öngörmez.',
        'Tercih başvurusunu ÖSYM üzerinden aday kendisi yapar.',
        'Kişisel veri yalnızca rapor için gereken ölçüde ve sizin onayınızla işlenir.',
      ],
    },
    closing: {
      title: 'Örnek üzerinden konuşalım',
      body: 'Tercih döneminde danışanlarınızla nasıl çalıştığınızı ve bu raporun size zaman kazandırıp kazandırmayacağını 15 dakikada birlikte değerlendirelim. Kapsam ve fiyat bu görüşmeden sonra netleşir.',
    },
  },
  listing: {
    key: 'listing',
    slug: 'ilan-dogrulama',
    demoId: 'listing',
    meta: {
      title: 'Kamu ilanı veri doğrulama, ilan yayıncıları için',
      description:
        'Aynı kamu ilanının Kariyer Kapısı alanlarını, ilan metnini ve kurumun kendi duyurusunu alan alan karşılaştırıp farkları kaynağından alıntıyla işaretleyen, insan onaylı doğrulama hizmeti.',
    },
    audience: 'İlan yayıncıları, kariyer siteleri ve uygulamaları için',
    title: 'Bir ilanın resmî kaynakları aynı bilgiyi veriyor mu?',
    lede: 'Aynı kamu ilanı Kariyer Kapısı’nın alanlarında, ilan metninde ve kurumun kendi duyurusunda farklı bilgiyle yer alabiliyor. Kaynakları alan alan karşılaştırıyor, farkları kaynağından alıntıyla işaretliyor ve yayından önce insan onayına sunuyoruz.',
    notice:
      'Hizmet olarak sunmayı değerlendiriyoruz; ilk çalışmalar elle kontrol edilerek yapılır. Bir fark, kaynaklardan birinin hatalı olduğu anlamına gelmez; teyit edilmesi gereken noktayı gösterir.',
    cta: {
      label: 'Kendi ilan sürecinizi birlikte inceleyelim',
      subject: 'İlan doğrulama: süreç görüşmesi',
    },
    pdfCta: 'Örnek denetimin tek sayfalık özeti',
    problem: {
      title: 'Sorun',
      body: 'Bir kamu ilanı çoğu zaman birden fazla resmî kaynakta yayımlanır. Son başvuru tarihi, kontenjan ya da şartlar bu kaynaklarda aynı biçimde yazılmayabilir. Yayıncı hangisini esas alacağına karar verirken kaynakları tek tek açıp karşılaştırmak zorunda kalır.',
    },
    steps: {
      title: 'Nasıl çalışır',
      items: [
        {
          title: 'İlan',
          body: 'İlanın yer aldığı resmî kaynaklar belirlenir: Kariyer Kapısı’nın yapılandırılmış alanları, ilan metni ve kurumun kendi duyurusu.',
        },
        {
          title: 'Kaynak karşılaştırması',
          body: 'Her alan üç kaynakta aranır ve birebir alıntıyla kaydedilir. Alıntılar her derlemede kaynak metinle yeniden karşılaştırılır.',
        },
        {
          title: 'Farkın işaretlenmesi',
          body: 'Kaynaklar ayrışıyorsa her birinin ne yazdığı yan yana gösterilir. Fark, yayından önce insan onayına sunulur.',
        },
      ],
    },
    demo: {
      title: 'Gerçek örnek: 5 ilan, 3 kaynak, 55 karşılaştırma',
      body: 'Beş farklı kurumun açık ilanından birer pozisyon seçildi; 11 alan üç resmî kaynakta karşılaştırıldı. Bir alanda kaynaklar arasında gerçek bir fark bulundu: başvuru bitiş tarihi.',
      note: 'Kaynaklar 13.10.2026’da okundu, fark 14.10.2026’da yeniden kontrol edildi. Kişisel veri içermez.',
    },
    checks: {
      title: 'Hangi alanları kontrol ediyoruz',
      intro: 'Örnek denetimde her pozisyon için şu 11 alan karşılaştırıldı:',
      items: [
        'Kurum',
        'Unvan',
        'İl ve kontenjan',
        'Başvuru başlangıç tarihi',
        'Son başvuru tarihi',
        'KPSS yılı, puan türü ve taban puan',
        'Öğrenim ve bölüm şartı',
        'Yaş şartı',
        'Belge, sertifika ve ehliyet',
        'Seçim usulü',
        'Başvuru yeri',
      ],
    },
    limits: {
      title: 'Neyi kapsamaz',
      items: [
        'Bir kaynağın ya da yayıncının hatalı olduğuna karar vermez; farkı kaynağıyla gösterir.',
        'Kurumun resmî duyurusunun yerine geçmez; kesin bilgi için kurumla teyit önerilir.',
        'Henüz otomatik ve sürekli çalışan bir ürün değildir; kapsam ve sıklık birlikte belirlenir.',
      ],
    },
    closing: {
      title: 'Kendi ilan sürecinizi birlikte inceleyelim',
      body: 'İlanları bugün nasıl derlediğinizi ve kaynaklar ayrıştığında nasıl karar verdiğinizi konuşalım. Uygun görürseniz, sizin seçeceğiniz birkaç ilanla küçük bir örnek çalışma yapabiliriz.',
    },
  },
};
