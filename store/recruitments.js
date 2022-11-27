import { slugify } from '@/utils/data';

export const state = () => ({
    recruitments: [],
    recruitment: {},
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_RECRUITMENTS(state, payload) {
        state.recruitments = payload;
    },

    SET_RECRUITMENT(state, payload) {
        state.recruitment = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { recruitments, pagination } } = await this.$api.recruitments.getAll(params);

        commit('SET_RECRUITMENTS', recruitments.map((recruitment) => ({
            ...recruitment,
            slug: slugify(recruitment.title),
        })));
        commit('SET_PAGINATION', pagination);
    },

    async fetchDetail({ commit }, recruitmentId) {
        const { data: { recruitment } } = await this.$api.recruitments.getDetail(recruitmentId);

        commit('SET_RECRUITMENT', recruitment);
    },
};
