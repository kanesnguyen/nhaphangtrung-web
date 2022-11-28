<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header show-back :text="`Chỉnh sửa bài viết`" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/posts">
                        <a-button>
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button type="primary" @click="$refs.PostForm.submit()">
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <PostForm
                ref="PostForm"
                :isEdit="false"
                :post="post"
                @submit="submitForm"
            />
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
                label: 'Chỉnh sửa bài viết',
                link: '/posts',
            }]);
        },

        methods: {

            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.posts.update(this.post.slug, payload);
                    this.$message.success('Cập nhật bài viết thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$message.error('Cập nhật bài viết thất bại');
                    this.$handleError(e);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Chỉnh sửa bài viết',
            };
        },
    };
</script>
