export const state = () => ({
    ads: [],
    adsDetail: {},
    pagination: {},

});

export const getters = {
};

export const mutations = {
    SET_ADS(state, payload) {
        state.ads = payload;
    },

    SET_ADS_DETAILS(state, payload) {
        state.adsDetail = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    UPDATE_ADS(state, payload) {
        state.ads.map((item) => {
            if (item.id === payload.id) {
                item.title = payload?.data?.title;
                item.shortDescription = payload?.data?.shortDescription;
                item.thumbnail = payload?.data?.thumbnail;
                item.content = payload?.data?.content;
            }
            return state.ads;
        });
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { ads, pagination } } = await this.$api.ads.getAll(params);

        commit('SET_ADS', ads.map((_ads) => ({
            ..._ads,
        })));
        commit('SET_PAGINATION', pagination);
    },

    async fetchDetail({ commit }, adsId) {
        const { data: adsDetail } = await this.$api.ads.getDetail(adsId);

        commit('SET_ADS_DETAILS', adsDetail);
    },
    async update({ commit }, params) {
        await this.$api.ads.update(params.id, params.data);
        commit('UPDATE_ADS', { id: params.id, data: params.data });
    },
};
