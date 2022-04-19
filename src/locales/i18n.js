import {createI18n} from "vue-i18n";
import zh_CN from "./zh-CN/tl.json";
import en_US from "./en-US/tl.json";

if (!localStorage.getItem('locale')) {
    localStorage.setItem('locale', "zh_CN")
}

let i18n = createI18n({
    locale: localStorage.getItem('locale'),
    legacy: false,
    globalInjection: true,
    messages: {
        zh_CN,
        en_US
    }
})

export default i18n