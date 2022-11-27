export const state = () => ({
    services: [],
    service: {},
    pagination: {},

});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { services, pagination } } = await this.$api.services.getAll(params);
        commit('SET_STATE', { prop: 'services', data: services });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, adsId) {
        const { data: { service } } = await this.$api.services.getDetail(adsId);
        commit('SET_STATE', { prop: 'service', data: service });
    },
};
