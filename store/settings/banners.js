import { slugify } from '@/utils/data';

export const state = () => ({
    banners: [],
    banner: {},
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_BANNERS(state, payload) {
        state.banners = payload;
    },

    SET_BANNER(state, payload) {
        state.banner = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { banners, pagination } } = await this.$api.banners.getAll(params.type, params);

        commit('SET_BANNERS', banners.map((banner) => ({
            ...banner,
            slug: slugify(banner.title),
        })));
        commit('SET_PAGINATION', pagination);
    },

    async fetchDetail({ commit }, bannerId) {
        const { data: { banner } } = await this.$api.banners.getDetail(bannerId);

        commit('SET_BANNER', banner);
    },
};
