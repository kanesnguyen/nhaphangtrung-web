<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Bài viết cần phê duyệt" />
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
    import PostsTable from '@/components/posts/confirm/Table.vue';

    export default {
        components: {
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
            ...mapState('posts/confirm', ['posts', 'pagination']),
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
                label: 'Bài viết cần phê duyệt',
                link: '/posts',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('posts/confirm/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Bài viết cần phê duyệt',
            };
        },
    };
</script>
