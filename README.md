# proofvane-site

**Proofvane** (https://proofvane.com) için Türkçe, tek sayfalık site: Flutter
mobil uygulamalar, web uygulamaları, API/backend, veri doğrulama ve veri
otomasyonu. Vite + TypeScript, çerçevesiz. Sayfa derleme sırasında
`src/site.config.ts` ve `src/content.ts` dosyalarından statik HTML olarak
üretilir; tarayıcıda çalışma zamanı JavaScript’i yoktur.

> **Production yayını sahibin onayı olmadan yapılmaz.** Aşağıdaki “Yayın”
> bölümündeki Cloudflare ve GitHub ayarları sahibi tarafından yapılana kadar
> hiçbir şey yayınlanmaz: iş akışları secret/değişken eksikse hiçbir dosya
> yüklemeden hata verip durur. Production iş akışı yalnızca elle tetiklenir,
> `yayinla` onay metni ister ve `production` ortamının onaycısını bekler.

## Gereksinimler

- Node.js 22 (`.nvmrc`), npm 10+

## Komutlar

```bash
npm ci                # bağımlılıkları kur
npm run dev           # geliştirme sunucusu
npm run build         # tür denetimi + dist/ üretimi
npm run preview       # dist/ klasörünü yerelde sun (http://localhost:4173)
npm run lint          # ESLint: TypeScript + CSS (@eslint/css), uyarı da hata sayılır
npm run format:check  # Prettier denetimi (düzeltmek için: npm run format)
npm test              # Vitest birim testleri
npm run test:e2e      # Playwright: duman, dil, SEO, erişilebilirlik (axe) testleri
npm run screenshots   # TR/EN, 1440px / 390px, açık / koyu ekran görüntüleri -> screenshots/
```

Playwright tarayıcısı yoksa bir kez `npx playwright install chromium` çalıştırın.

## Sayfalar ve diller

| Adres  | Kaynak şablon   | İçerik                 |
| ------ | --------------- | ---------------------- |
| `/`    | `index.html`    | Dil yönlendirme ekranı |
| `/tr/` | `tr/index.html` | `src/content/tr.ts`    |
| `/en/` | `en/index.html` | `src/content/en.ts`    |

`/` adresinde `src/root.ts` şu sırayla karar verir: daha önce seçilmiş dil
(`localStorage` anahtarı `proofvane.lang`), yoksa tarayıcının dil tercih
listesindeki ilk dil (`navigator.languages`; işletim sistemi dili değil).
Türkçe ise `/tr/`, diğer tüm dillerde `/en/`. Betik çalışmazsa ekranda iki
bağlantı görünür. `/tr/` ve `/en/` sayfalarında otomatik yönlendirme yoktur;
her sayfadaki TR/EN seçici tercihi kaydeder.

Her dil sayfası kendi `title`, `description`, Open Graph, `canonical` ve
`hreflang` (tr, en, x-default) etiketlerini üretir; `public/sitemap.xml`
iki dili `xhtml:link` alternatifleriyle listeler.

## Marka, alan adı ve e-posta

Hepsi `src/site.config.ts` içinde: `brandName`, `legalName` (HCSoft),
`siteUrl`, `contactEmail`, `partnershipsEmail`, `indexable`, `demosPublished`.

Yayındaki örnekler yalnızca **tek sayfalık özetlerdir**
(`public/ornekler/`, TR ve EN). Ayrıntılı raporlar bu repoya konmaz;
`tests/forbidden-phrases.test.ts` klasörde yalnız bu dört dosyanın
bulunduğunu ve her birinin tek sayfa olduğunu denetler.
`tests/content.test.ts` grafiklerdeki sayıların doğrulanmış sonuçlarla ve
iki dilde birbiriyle aynı olduğunu denetler.

## Tasarım

“Kaynak notu”: hero’daki üç iddia dipnot işaretleriyle kenar notlarına
bağlanır. Yazı tipleri Newsreader (başlık) ve Schibsted Grotesk (metin),
`@fontsource-variable` ile kendi sunucumuzdan yüklenir (harici istek yok,
CSP `'self'`). Açık/koyu tema `prefers-color-scheme` ile; tek açılış
animasyonu `prefers-reduced-motion: reduce` iken kapalıdır.

## Yayın (Cloudflare Pages)

Varsayılan hedef Cloudflare Pages (Direct Upload). İki iş akışı var:

| İş akışı                        | Tetikleyici                                    | GitHub ortamı | Pages dalı                       |
| ------------------------------- | ---------------------------------------------- | ------------- | -------------------------------- |
| `.github/workflows/deploy.yml`  | Yalnızca elle, `confirm: yayinla`, `main` dalı | `production`  | `main` (production)              |
| `.github/workflows/preview.yml` | Yalnızca elle, dal adı girilir (`onizleme`)    | `preview`     | girilen dal (production olmayan) |

Her ikisi de önce secret/değişkenleri denetler; eksikse hata mesajıyla durur.
Sonra `npm ci`, test ve build çalışır ve `cloudflare/wrangler-action@v4` ile
`pages deploy dist --project-name <CF_PAGES_PROJECT> --branch <dal>` yapılır.
Production iş akışı sayfa hâlâ `noindex` ise ya da e-posta tanımlı değilse
uyarı yazar.

### Sahibin yapması gerekenler

**Cloudflare (ücretsiz plan yeterli):**

1. Pages projesi oluşturun, **Direct Upload** türünde (Git bağlantısı olmadan):
   _Workers & Pages > Create > Pages > Upload assets_, ya da yerelde
   `npx wrangler pages project create <proje-adi> --production-branch=main`.
   Production dalı `main` olmalıdır.
2. API token: _My Profile > API Tokens > Create Token > Custom token_, izin
   **Account > Cloudflare Pages > Edit**, kapsam yalnızca ilgili hesap.
   Mümkünse süre sınırı koyun.
3. Hesap kimliğini (Account ID) not edin (_Workers & Pages_ genel bakış sayfası).
4. Pages projesi > _Custom domains_ ile `proofvane.com` (ve `www`) bağlayın.
   Zone aynı Cloudflare hesabında olduğu için DNS kaydı otomatik oluşur.
   **Git bağlantılı (otomatik) Pages projesi kullanmayın:** `main`'e her push
   onaysız production yayını olur; bu repo onay kapısını `deploy.yml` ile sağlar.
5. İsteğe bağlı: ön izleme adresleri (`<dal>.<proje>.pages.dev`) varsayılan
   olarak herkese açıktır; gizlemek için Pages projesinde ön izlemeler için
   Access politikasını açın.

**GitHub (_Settings_):**

| Tür                 | Ad                      | Nerede                                                | Değer                                         |
| ------------------- | ----------------------- | ----------------------------------------------------- | --------------------------------------------- |
| Ortam               | `production`            | _Environments_                                        | Required reviewers: sahip; dal: yalnız `main` |
| Ortam               | `preview`               | _Environments_                                        | İsteğe bağlı onaycı                           |
| Secret              | `CLOUDFLARE_API_TOKEN`  | Ortam secret’ı (`production` ve `preview`) ya da repo | Adım 2’deki token                             |
| Secret              | `CLOUDFLARE_ACCOUNT_ID` | Ortam secret’ı (`production` ve `preview`) ya da repo | Adım 3’teki kimlik                            |
| Değişken (variable) | `CF_PAGES_PROJECT`      | _Secrets and variables > Actions > Variables_         | Adım 1’deki proje adı (küçük harf, tire)      |

**Production öncesi:** `hello@proofvane.com` posta kutusunun gelen/giden
testinden geçmiş olması gerekir (sitede bu adres yayımlanıyor).

`public/_headers` dosyası Cloudflare Pages’te güvenlik başlıklarını
(CSP, `nosniff`, `frame-ancestors 'none'` vb.) ayarlar.

### Alternatifler (kullanılmıyor)

GitHub Pages ve Vercel adımları `deploy.yml` sonunda yorum olarak durur.
Hedef değişirse ön koşul denetimi de o hedefin secret’larına göre güncellenmelidir.

## Ön izleme ve production farkı

- **Yerel ön izleme:** `npm run build && npm run preview` yalnızca sizin
  makinenizde çalışır.
- **CI artifact’i:** her push ve pull request’te `dist` klasörü artifact olarak
  yüklenir; internete yayın yapmaz.
- **Pages ön izlemesi:** `preview.yml`, production olmayan bir Pages dalına
  yükler. Herkese açık bir adres üretir (bkz. Access notu).
- **Production:** yalnızca `deploy.yml`, onaylı ve `main` dalından.

## İçerik kuralları

Müşteri logosu, referans yorumu, uydurma sayı ya da süre/sonuç vaadi
kullanılmaz. `tests/forbidden-phrases.test.ts` kaynak metinleri ve derlenmiş
sayfayı yasaklı ifadeler listesine karşı tarar; liste o dosyadadır.
`tests/render.test.ts` içindeki “konumlandırma” testleri sınav/kamu ilanı
ifadelerinin yalnızca “Örnek çalışmalar” bölümünde geçtiğini denetler.

## CI ve bağımlılık güvenliği

`.github/workflows/ci.yml`: `npm ci`, lint, format denetimi, birim testleri,
build, Playwright duman testi ve `dist` artifact’i. `npm audit --audit-level=high`
ayrı bir iştir. İzinler `contents: read`, checkout `persist-credentials: false`.

CSS denetimi stylelint yerine ESLint’in resmî `@eslint/css` eklentisiyle
yapılır. Sebep: stylelint 17 `micromatch` → `braces@3.0.3` zincirini getiriyor
ve `braces` için yamalı sürüm yok (GHSA-vfj7-8cjw-p6xm). `@eslint/css`
geçersiz özellik/değer, `!important`, boş blok, yinelenen import gibi kuralları
denetler; Baseline uyumluluğu uyarı olarak (`--max-warnings 0` ile hata) açıktır.
