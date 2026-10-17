/**
 * Sitenin tek yapılandırma noktası. Marka, alan adı, e-posta ve örneklerin
 * yayın durumu yalnızca buradan değişir. Metinler `src/content/` altındadır.
 */

export interface SiteConfig {
  brandName: string;
  /** Faturada ve resmî kayıtlarda kullanılan ticari unvan (alt bilgide gösterilir). */
  legalName: string;
  /** Kanonik kök adres, sonda eğik çizgi olmadan. null iken canonical/hreflang mutlak adres üretilmez. */
  siteUrl: string | null;
  contactEmail: string | null;
  partnershipsEmail: string | null;
  /** E.164 biçiminde telefon (tel: bağlantısı) ve görünen biçimi. */
  phone: { e164: string; display: string } | null;
  city: string;
  /** false iken her sayfaya `noindex` eklenir. */
  indexable: boolean;
  /** false iken örnek özetlerin indirme bağlantıları hiç üretilmez. */
  demosPublished: boolean;
}

export const siteConfig: SiteConfig = {
  brandName: 'Proofvane',
  legalName: 'HCSoft',
  siteUrl: 'https://proofvane.com',
  contactEmail: 'hello@proofvane.com',
  partnershipsEmail: 'partnerships@proofvane.com',
  phone: { e164: '+905421546037', display: '+90 542 154 60 37' },
  city: 'Ankara',
  indexable: true,
  demosPublished: true,
};
