<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Chi tiết bài viết" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/posts">
                        <a-button>
                            Quay lại
                        </a-button>
                    </nuxt-link>
                    <nuxt-link :to="`/posts/${$route.params.slug}/edit`">
                        <a-button type="primary">
                            Chỉnh sửa
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <PostForm :isEdit="true" :post="post" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import PostForm from '@/components/posts/Form.vue';

    export default {
        components: {
            PostForm,
        },

        async asyncData({ store, params }) {
            await store.dispatch('posts/fetchDetail', params);
        },

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapState('posts', ['post']),
        },

        watch: {
            '$route.query': {
                handler() {
                    this.fetchData();
                },
            },
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Bài viết',
                link: '/posts',
            }]);
        },

        methods: {
        },

        head() {
            return {
                title: 'Xem chi tiết bài viết',
            };
        },
    };
</script>
