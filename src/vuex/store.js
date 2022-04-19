import {createStore} from "vuex";
import {checkAuthentication, findUserAccountInfo} from "../configs/services";

const store = createStore({
    state: {
        locale: localStorage.getItem('locale') ?? "zh_CN",
        register: {
            steps: localStorage.getItem('register-step') === null ? 0 : parseInt(localStorage.getItem('register-step'))
        },
        currentUser: {
            value: null,
            loading: false,
            error: null,
            profile: null,
            status: false
        },
    },
    mutations: {
        stepIncrement() {
            this.state.register.steps++
            localStorage.setItem('register-step', String(this.state.register.steps))
        },
        stepDecrement() {
            this.state.register.steps--
            localStorage.setItem('register-step', String(this.state.register.steps))
        },
        stepObliterate() {
            this.state.register.steps = 0
            localStorage.setItem('register-step', String(this.state.register.steps))
        },
        toggleLang() {
            if (this.state.locale === 'zh_CN') {
                this.state.locale = 'en_US'
            } else {
                this.state.locale = 'zh_CN'
            }
            localStorage.setItem('locale', this.state.locale)
        },
        currentUserLoaded(state, currentUser) {
            state.currentUser.value = currentUser
            state.currentUser.loading = false
        },
        currentUserLoading(state, currentUser) {
            state.currentUser.loading = true
        },
        currentUserLoadError(state, error) {
            state.currentUser.error = error;
            state.currentUser.loading = false
        },
        currentUserAccountLoaded(state, accountInfo) {
            state.currentUser.profile = accountInfo
        },
        currentUserLoginStatus(state, statu) {
            state.currentUser.status = statu;
        }
    },
    actions: {
        stepIncrement(context) {
            context.commit("stepIncrement")
        },
        stepDecrement(context) {
            context.commit("stepDecrement")
        },
        stepObliterate({commit}) {
            commit("stepObliterate")
        },
        toggleLang({commit}) {
            commit("toggleLang")
        },
        async loadCurrentUser({commit}) {
            commit('currentUserLoading')
            try {
                const response = await checkAuthentication();
                const profile = await findUserAccountInfo();
                if (response.success && profile.success) {
                    commit('currentUserLoaded', response.data)
                    commit('currentUserAccountLoaded', profile.data)
                    commit('currentUserLoginStatus', true)
                } else {
                    commit('currentUserLoadError', Object.assign(new Error(), {data: response}))
                    commit('currentUserLoginStatus', false)
                }
            } catch (e) {
                console.log(e)
                commit('currentUserLoadError', e)
            }
        },
        clearCurrentUser({commit}) {
            commit('currentUserLoaded', null)
            commit('currentUserLoginStatus', false)
        }
    }
})

store.dispatch('loadCurrentUser')

export default store