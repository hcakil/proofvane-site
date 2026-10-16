/**
 * Sitenin tek yapılandırma noktası.
 *
 * Marka, alan adı, e-posta ve örnek raporların yayın durumu yalnızca
 * buradan değiştirilir. Sayfa derleme sırasında bu nesneden üretilir.
 */

export interface DemoItem {
  /** Sayfa içi kimlik (yalnızca a-z, 0-9 ve tire). */
  id: string;
  title: string;
  description: string;
  /** Kartta gösterilen sahte tablo önizlemesinin türü. */
  preview: 'eligibility' | 'quality';
  /** Yayın onayından sonra doldurulacak PDF yolu ya da adresi. */
  pdfUrl: string | null;
}

export interface SiteConfig {
  /** Marka adı; sayfadaki tüm marka geçişleri buradan gelir. */
  brandName: string;
  /** Faturada ve resmî kayıtlarda kullanılan ticari unvan (footer'da gösterilir). */
  legalName: string;
  /** Kanonik adres, örn. "https://ornek.com.tr". Alan adı seçilene kadar null. */
  siteUrl: string | null;
  /** İletişim adresi. null iken sayfada "İletişim adresi yakında" yazar. */
  contactEmail: string | null;
  city: string;
  /**
   * false iken sayfaya `noindex` eklenir. Production yayını sahibin onayıyla
   * yapılırken true yapılmalıdır.
   */
  indexable: boolean;
  demos: {
    /** false iken indirme düğmeleri hiç üretilmez. */
    published: boolean;
    items: DemoItem[];
  };
}

export const siteConfig: SiteConfig = {
  brandName: 'Proofvane',
  legalName: 'HCSoft',
  siteUrl: 'https://proofvane.com',
  contactEmail: 'hello@proofvane.com',
  city: 'Ankara',
  indexable: true,
  demos: {
    published: true,
    items: [
      {
        id: 'tercih-uygunluk',
        title: 'Tercih ön kontrol örneği — ÖSYM KPSS-2025/2 (kurgusal profil)',
        description:
          'Kurgusal bir aday profili için 13 ildeki kadro satırlarının nitelik kodlarıyla tek tek eşleştirilmesi. Her satır, ilgili resmî belge ve sayfa numarasıyla verilir; sınırlar özette yazılıdır.',
        preview: 'eligibility',
        pdfUrl: '/ornekler/proofvane-ornek-tercih-on-kontrol.pdf',
      },
      {
        id: 'veri-kalite',
        title: 'İlan veri doğruluk denetimi örneği — Kariyer Kapısı’ndan 5 pozisyon',
        description:
          'Beş ilanın 11 alanı üç resmî kaynakta karşılaştırılır. Fark yalnızca kaynaktan birebir alıntıyla gösterilebiliyorsa raporlanır; kişisel veri içermez.',
        preview: 'quality',
        pdfUrl: '/ornekler/proofvane-ornek-ilan-veri-dogruluk.pdf',
      },
    ],
  },
};
