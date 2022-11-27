import { slugify } from '@/utils/data';

export const state = () => ({
    ads: [],
    adsDetail: {},
    pagination: {},

});

export const getters = {
};

export const mutations = {
    SET_NEWS(state, payload) {
        state.ads = payload;
    },

    SET_NEWS_DETAILS(state, payload) {
        state.adsDetail = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    UPDATE_NEWS(state, payload) {
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
        const { data: { rows: ads, pagination } } = await this.$api.ads.getAll(params);

        commit('SET_NEWS', ads.map((_ads) => ({
            ..._ads,
            slug: slugify(_ads.title),
        })));
        commit('SET_PAGINATION', pagination);
    },

    async fetchDetail({ commit }, adsId) {
        const { data: adsDetail } = await this.$api.ads.getDetail(adsId);

        commit('SET_NEWS_DETAILS', adsDetail);
    },
    async update({ commit }, params) {
        await this.$api.ads.update(params.id, params.data);
        commit('UPDATE_NEWS', { id: params.id, data: params.data });
    },
};
