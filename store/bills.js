export const state = () => ({
    bills: [],
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_BILL(state, payload) {
        state.bills = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    UPDATE_BILL(state, payload) {
        state.bills.map((item) => {
            if (item.id === payload.id) {
                item.content = payload?.data?.content;
                item.thumbnail = payload?.data?.thumbnail;
            }
            return state.bills;
        });
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { bills, pagination } } = await this.$api.bills.getAll(params);

        commit('SET_BILL', bills);
        commit('SET_PAGINATION', pagination);
    },
    async update({ commit }, params) {
        await this.$api.bills.update(params.id, params.data);
        commit('UPDATE_BILL', { id: params.id, data: params.data });
    },
};
