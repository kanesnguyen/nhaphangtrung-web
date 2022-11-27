export const emptyState = () => ({
    categories: [],
});

export const state = emptyState();

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const getters = {
};

export const actions = {
    async fetchAll({ commit }, payload) {
        const { data: { categories } } = await this.$api.postCategories.getAll(payload);
        commit('SET_STATE', { prop: 'categories', data: categories });
    },
};
