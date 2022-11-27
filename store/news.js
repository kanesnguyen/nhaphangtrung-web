import { slugify } from '@/utils/data';

export const state = () => ({
    news: [],
    newsDetail: {},
    pagination: {},

});

export const getters = {
};

export const mutations = {
    SET_NEWS(state, payload) {
        state.news = payload;
    },

    SET_NEWS_DETAILS(state, payload) {
        state.newsDetail = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    UPDATE_NEWS(state, payload) {
        state.news.map((item) => {
            if (item.id === payload.id) {
                item.title = payload?.data?.title;
                item.shortDescription = payload?.data?.shortDescription;
                item.thumbnail = payload?.data?.thumbnail;
                item.content = payload?.data?.content;
            }
            return state.news;
        });
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { rows: news, pagination } } = await this.$api.news.getAll(params);

        commit('SET_NEWS', news.map((_news) => ({
            ..._news,
            slug: slugify(_news.title),
        })));
        commit('SET_PAGINATION', pagination);
    },

    async fetchDetail({ commit }, newsId) {
        const { data: newsDetail } = await this.$api.news.getDetail(newsId);

        commit('SET_NEWS_DETAILS', newsDetail);
    },
    async update({ commit }, params) {
        await this.$api.news.update(params.id, params.data);
        commit('UPDATE_NEWS', { id: params.id, data: params.data });
    },
};
