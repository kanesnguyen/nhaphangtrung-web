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
            <ProductForm :isEdit="true" :post="post" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ProductForm from '@/components/posts/Form.vue';

    export default {
        components: {
            ProductForm,
        },

        async fetch() {
            await this.fetchData();
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
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('posts/fetchDetail', this.$route.params);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Xem chi tiết bài viết',
            };
        },
    };
</script>
