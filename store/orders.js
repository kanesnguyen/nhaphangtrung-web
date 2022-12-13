export const state = () => ({
    orders: [],
    order: {},
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_ORDERS(state, payload) {
        state.orders = payload;
    },
    SET_ORDER(state, payload) {
        state.order = payload;
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

        commit('SET_ORDERS', orders);
        commit('SET_PAGINATION', pagination);
    },
    async fetchDetail({ commit }, ordersId) {
        const { data: { order } } = await this.$api.orders.getDetail(ordersId);
        commit('SET_ORDER', order);
    },
    async update({ commit }, params) {
        await this.$api.orders.update(params.id, params.data);
        commit('UPDATE_ORDER', { id: params.id, data: params.data });
    },
};
