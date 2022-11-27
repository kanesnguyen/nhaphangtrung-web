<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Chi tiết sản phẩm" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/products">
                        <a-button>
                            Quay lại
                        </a-button>
                    </nuxt-link>
                    <nuxt-link :to="`/products/${$route.params.id}/edit`">
                        <a-button type="primary">
                            Chỉnh sửa
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <ProductForm :is-edit="false" :product="product" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ProductForm from '@/components/products/Form.vue';

    export default {
        components: {
            ProductForm,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ store, params }) {
            await store.dispatch('products/fetchDetail', params);
        },

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapState('products', ['product']),
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
                label: 'Sản phẩm',
                link: '/products',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('products/fetchDetail', this.$route.params);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Xem chi tiết sản phẩm',
            };
        },
    };
</script>
