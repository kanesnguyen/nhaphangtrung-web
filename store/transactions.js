export const state = () => ({
    transactions: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_ORDER(state, payload) {
        state.transactions = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    UPDATE_ORDER(state, payload) {
        state.transactions.map((item) => {
            if (item.id === payload.id) {
                item.content = payload?.data?.content;
                item.thumbnail = payload?.data?.thumbnail;
            }
            return state.transactions;
        });
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { transactions, pagination } } = await this.$api.transactions.getAll(params);

        commit('SET_ORDER', transactions);
        commit('SET_PAGINATION', pagination);
    },
    async update({ commit }, params) {
        await this.$api.transactions.update(params.id, params.data);
        commit('UPDATE_ORDER', { id: params.id, data: params.data });
    },
};
