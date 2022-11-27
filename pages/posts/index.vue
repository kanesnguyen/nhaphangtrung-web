<template>
    <div>
        <PostsFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách bài viết" />
            </div>
            <PostsTable
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
    import PostsFilter from '@/components/posts/Filter.vue';
    import PostsTable from '@/components/posts/Table.vue';

    export default {
        components: {
            PostsFilter,
            PostsTable,
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
                label: 'Danh sách bài viết',
                link: '/posts',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('posts/fetchAll', this.$route.query);
                    await this.$store.dispatch('posts/categories/fetchAll', this.$route.query);
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
