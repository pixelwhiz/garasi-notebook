import { createStore } from "vuex";

const store = createStore({
    state: {
        isLoggedInAdmin: false,
    },
    mutations: {
        SET_LOGIN_STATUS_ADMIN(state, status) {
            state.isLoggedInAdmin = status;
        },
    },
    actions: {
        setLoginStatusAdmin({ commit }, status) {
            commit('SET_LOGIN_STATUS_ADMIN', status);
            sessionStorage.setItem('isLoggedInAdmin', status);
        },
    },
    getters: {
        isLoggedInAdmin: state => state.isLoggedInAdmin,
    },
});

export default store;