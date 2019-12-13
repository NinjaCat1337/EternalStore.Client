import router from '../../routes.js';

const state = {
    idUser: null,
    token: null,
    role: null
};

const getters = {
    isAuthenticated(state) {
        return state.token !== null;
    },
    userRole(state){
        return state.role;
    },
    idUser(state){
        return state.idUser;
    }
};

const mutations = {
    authorizeUser(state, authData) {
        state.idUser = authData.idUser;
        state.token = authData.token;
        state.role = authData.role
    },
    logoutUser(state) {
        state.token = null;
    }
};

const actions = {
    login({ commit }, authData) {
        commit('authorizeUser', { idUser: authData.idUser, token: authData.token, role: authData.role });
        const dateNow = new Date();
        const expirationDate = new Date(dateNow.getTime() + authData.expiresInMinutes * 60000);
        localStorage.setItem('idUser', authData.idUser);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('role', authData.role)
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

        const idUser = localStorage.getItem('idUser');
        if (!idUser) return;

        const role = localStorage.getItem('role');
        if (!role) return;

        commit('authorizeUser', { idUser, token, role })
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};