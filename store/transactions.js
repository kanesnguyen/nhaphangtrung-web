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

    UPDATE_ORDER(state, payload) {
        state.orders.map((item) => {
            if (item.id === payload.id) {
                item.content = payload?.data?.content;
                item.thumbnail = payload?.data?.thumbnail;
            }
            return state.orders;
        });
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { orders, pagination } } = await this.$api.orders.getAll(params);

        commit('SET_ORDER', orders);
        commit('SET_PAGINATION', pagination);
    },
    async update({ commit }, params) {
        await this.$api.orders.update(params.id, params.data);
        commit('UPDATE_ORDER', { id: params.id, data: params.data });
    },
};
