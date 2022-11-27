<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Thêm sản phẩm" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/products">
                        <a-button>
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button type="primary" @click="$refs.ProductForm.submit()">
                        Thêm sản phẩm
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
    import ProductForm from '@/components/products/Form.vue';

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
                label: 'Sản phẩm',
                link: '/products',
            }]);
        },

        methods: {
            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.products.create(payload);
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$message.error('Thêm mới sản phẩm thất bại');
                    this.$handleError(e);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Thêm mới sản phẩm',
            };
        },
    };
</script>
