import i18n from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18n
  .use(Backend) // load translations from files
  .use(middleware.LanguageDetector) // detect language from headers, query, cookies
  .init({
    fallbackLng: "en", // default language
    preload: ["en", "hi", "bn"], // preload languages
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/translation.json"),
    },
    detection: {
      // don't use cookies, detect from headers
      order: ["header"],
      lookupHeader: "accept-language", // API can send Accept-Language: en, hn, bn
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
