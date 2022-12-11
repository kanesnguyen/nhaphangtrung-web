<template>
    <div>
        <PostFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách bài viết" />
                <nuxt-link to="/posts/create">
                    <a-button type="primary">
                        <i class="fas fa-plus mr-2" /> Thêm mới
                    </a-button>
                </nuxt-link>
            </div>
            <PostTable
                class="mt-4"
                :posts="posts"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import PostFilter from '@/components/posts/Filter.vue';
    import PostTable from '@/components/posts/Table.vue';

    export default {
        components: {
            PostFilter,
            PostTable,
        },

        data() {
            return {
            };
        },

        computed: {
        },

        watch: {
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
                title: 'Danh sách bài viết',
            };
        },
    };
</script>
