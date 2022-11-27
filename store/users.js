export const emptyState = () => ({
    users: [],
    user: {},
    pagination: {},
});

export const state = emptyState();

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
    SET_EMPTY(state) {
        Object.assign(state, emptyState());
    },
};

export const getters = {
};

export const actions = {
    async fetchAll({ commit }, payload) {
        const { data: { users, pagination } } = await this.$api.users.getAll(payload);
        commit('SET_STATE', { prop: 'users', data: users });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { user } } = await this.$api.users.getDetail(payload.id);
        commit('SET_STATE', { prop: 'user', data: user });
    },

    resetState({ commit }) {
        commit('SET_EMPTY');
    },
};
