export const emptyState = () => ({
    projects: [],
    project: {},
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
        const { data: { projects, pagination } } = await this.$api.projects.getAll(payload);
        commit('SET_STATE', { prop: 'projects', data: projects });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { project } } = await this.$api.projects.getDetail(payload.id);
        commit('SET_STATE', { prop: 'project', data: project });
    },

    resetState({ commit }) {
        commit('SET_EMPTY');
    },
};
