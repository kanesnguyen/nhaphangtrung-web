export const state = () => ({
    orders: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_ORDER(state, payload) {
        state.orders = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { orders, pagination } } = await this.$api.orders.getAll(params);
        commit('SET_ORDER', orders);
        commit('SET_PAGINATION', pagination);
    },
};
