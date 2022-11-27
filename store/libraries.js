import { slugify } from '@/utils/data';

export const state = () => ({
    libraries: [],
    library: {},
    pagination: {},
});

export const getters = {
};

export const mutations = {
    SET_LIBRARIES(state, payload) {
        state.libraries = payload;
    },

    SET_LIBRARY(state, payload) {
        state.library = payload;
    },

    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },
};

export const actions = {
    async fetchAll({ commit }, params) {
        const { data: { libraries, pagination } } = await this.$api.libraries.getAll(params);

        commit('SET_LIBRARIES', libraries.map((library) => ({
            ...library,
            slug: slugify(library.title),
        })));
        commit('SET_PAGINATION', pagination);
    },

    async fetchDetail({ commit }, libraryId) {
        const { data: { library } } = await this.$api.libraries.getDetail(libraryId);

        commit('SET_LIBRARY', library);
    },
};
