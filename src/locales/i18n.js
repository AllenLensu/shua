import { createI18n } from "vue-i18n";
import zh_CN from "./zh/tl.json";
import en_US from "./en/tl.json";

let i18n = createI18n({
    locale: "zh_CN",
    legacy: false,
    globalInjection: true,
    messages: {
        zh_CN,
        en_US
    }
})

export default i18n