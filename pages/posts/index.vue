<template>
    <div>
        <ProductsFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách bài viết" />
                <nuxt-link to="/posts/create">
                    <a-button type="primary">
                        <i class="fas fa-plus mr-2" />
                        Thêm bài viết
                    </a-button>
                </nuxt-link>
            </div>
            <ProductsTable
                class="mt-4"
                :posts="posts"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ProductsFilter from '@/components/posts/Filter.vue';
    import ProductsTable from '@/components/posts/Table.vue';

    export default {
        components: {
            ProductsFilter,
            ProductsTable,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapState('posts', ['posts', 'pagination']),
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
                    await this.$store.dispatch('posts/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách bài viết',
            };
        },
    };
</script>
