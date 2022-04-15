import {createStore} from "vuex";
import {checkAuthentication, findUserInfo} from "../configs/services";

let authenticatedInfo = null
const isAuthenticated = async () => {
    try {
        let authenticatedCheck = await checkAuthentication()
        let authenticatedState = authenticatedCheck.success
        if (authenticatedState) {
            authenticatedInfo = await findUserInfo()
        }
        return authenticatedState
    } catch (e) {
        return false
    }
}

const store = createStore({
    state: {
        locale: 'zh_CN',
        authenticator: {
            isAuthenticated: isAuthenticated(),
            userAccountInfo: authenticatedInfo
        },
        register: {
            steps: localStorage.getItem('register-step') === null ? 0 : parseInt(localStorage.getItem('register-step'))
        }
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
        }
    }
})

export default store