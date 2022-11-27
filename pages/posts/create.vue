<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Thêm bài viết" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/posts">
                        <a-button>
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button type="primary" @click="$refs.ProductForm.submit()">
                        Thêm bài viết
                    </a-button>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <ProductForm
                ref="ProductForm"
                :is-edit="true"
                @submit="submitForm"
            />
        </div>
    </div>
</template>

<script>
    import ProductForm from '@/components/posts/Form.vue';

    export default {
        components: {
            ProductForm,
        },

        data() {
            return {
                loading: false,
            };
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Bài viết',
                link: '/posts',
            }]);
        },

        methods: {
            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.posts.create(payload);
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$message.error('Thêm mới bài viết thất bại');
                    this.$handleError(e);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Thêm mới bài viết',
            };
        },
    };
</script>
