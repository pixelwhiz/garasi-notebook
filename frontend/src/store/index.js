import { createStore } from "vuex";

const store = createStore({
    state: {
        isLoggedInAdmin: false,
        isCreatedNewProduct: false,
    },
    mutations: {
        SET_LOGIN_STATUS_ADMIN(state, status) {
            state.isLoggedInAdmin = status;
        },
        SET_CREATED_NEW_PRODUCT(state, status) {
            state.isCreatedNewProduct = status;
        },
    },
    actions: {
        setLoginStatusAdmin({ commit }, status) {
            commit('SET_LOGIN_STATUS_ADMIN', status);
        },
        setCreatedNewProduct({ commit }, status) {
            commit('SET_CREATED_NEW_PRODUCT', status);
        },
    },
    getters: {
        isLoggedInAdmin: state => state.isLoggedInAdmin,
        isCreatedNewProduct: state => state.isCreatedNewProduct,
    },
});

export default store;