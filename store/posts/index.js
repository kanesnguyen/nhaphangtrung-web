export const emptyState = () => ({
    posts: [],
    post: {},
    pagination: {},
});

export const state = emptyState();

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
    SET_EMPTY(state) {
        Object.assign(state, emptyState());
    },
};

export const getters = {
};

export const actions = {
    async fetchAll({ commit }, payload) {
        const { data: { posts, pagination } } = await this.$api.posts.getAll(payload);
        commit('SET_STATE', { prop: 'posts', data: posts });
        commit('SET_STATE', { prop: 'pagination', data: pagination });
    },

    async fetchDetail({ commit }, payload) {
        const { data: { post } } = await this.$api.posts.getDetail(payload.id);
        commit('SET_STATE', { prop: 'post', data: post });
    },

    resetState({ commit }) {
        commit('SET_EMPTY');
    },
};
