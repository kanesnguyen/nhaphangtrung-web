<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header show-back :text="`Chỉnh sửa ${product.name}`" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/posts">
                        <a-button>
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button type="primary" @click="$refs.ProductForm.submit()">
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <ProductForm
                ref="ProductForm"
                :is-edit="true"
                :product="product"
                @submit="submitForm"
            />
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
            ...mapState('posts', ['product']),
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

            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.posts.update(this.product.id, payload);
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
