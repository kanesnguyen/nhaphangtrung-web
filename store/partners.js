export const state = () => ({
    partners: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_PARTNERS(state, payload) {
        state.partners = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    UPDATE_PARTNERS(state, payload) {
        state.partners.map((item) => {
            if (item.id === payload.id) {
                item.name = payload?.data?.name;
                item.thumbnail = payload?.data?.thumbnail;
            }
            return state.news;
        });
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { partners, pagination } } = await this.$api.partners.getAll(params);

        commit('SET_PARTNERS', partners);
        commit('SET_PAGINATION', pagination);
    },
    async update({ commit }, params) {
        await this.$api.partners.update(params.id, params.data);
        commit('UPDATE_PARTNERS', { id: params.id, data: params.data });
    },
};
