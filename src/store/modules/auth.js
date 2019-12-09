import router from '../../routes.js';

const state = {
    token: null
};

const getters = {
    isAuthenticated(state) {
        return state.token !== null;
    }
};

const mutations = {
    authorizeUser(state, authData) {
        state.token = authData.token;
    },
    logoutUser(state) {
        state.token = null;
    }
};

const actions = {
    login({ commit }, authData) {
        commit('authorizeUser', { token: authData.token });
        const dateNow = new Date();
        const expirationDate = new Date(dateNow.getTime() + authData.expiresInMinutes * 60000);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('expirationDate', expirationDate);
        router.replace('/store');
    },
    logout({ commit }) {
        commit('logoutUser');
        localStorage.clear();
        router.replace('/login');
    },
    setLogoutTimer({ commit }, authData) {
        setTimeout(() => {
            commit('logoutUser');
        }, authData.expiresInMinutes * 60 * 1000)
    },
    resumeSession({ commit }) {
        const token = localStorage.getItem('token');
        if (!token) return;

        const expirationDate = Date.parse(localStorage.getItem('expirationDate'));
        const now = Date.now();
        if (now > expirationDate) return;

        commit('authorizeUser', { token })
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};