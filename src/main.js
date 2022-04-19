import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import './main.css'
import './css/font.css'
import './css/font-awesome.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import I18n from './locales/i18n'
import App from './App.vue'
import Store from './vuex/store.js'
import Router from './router/router.js'
import * as icons from '@element-plus/icons-vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faAudioDescription,
    faBugs,
    faCircle,
    faCommentAlt,
    faPlus,
    faStar,
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const app = createApp(App)

// 注册全局组件
Object.values(icons).forEach(component => {
    app.component(component.name, component)
})

library.add(faAudioDescription, faCircle, faBugs, faStar, faPlus, faThumbsUp, faCommentAlt)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(I18n)
app.use(Store)
app.use(Router)
app.use(ElementPlus)
app.mount('#app')
