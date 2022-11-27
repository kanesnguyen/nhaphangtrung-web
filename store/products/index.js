export const emptyState = () => ({
    products: [],
    product: {},
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
        const { data: { products, pagination } } = await this.$api.products.getAll(payload);
        commit('SET_STATE', { prop: 'products', data: products });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { product } } = await this.$api.products.getDetail(payload.id);
        commit('SET_STATE', { prop: 'product', data: product });
    },

    resetState({ commit }) {
        commit('SET_EMPTY');
    },
};
