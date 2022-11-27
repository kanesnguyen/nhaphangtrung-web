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
        const { data: { productCategories } } = await this.$api.productCategories.getAll(payload);
        commit('SET_STATE', { prop: 'categories', data: productCategories });
    },
};
