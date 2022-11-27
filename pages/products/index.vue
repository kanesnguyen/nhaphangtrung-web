<template>
    <div>
        <ProductsFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách sản phẩm" />
                <nuxt-link to="/products/create">
                    <a-button type="primary">
                        <i class="fas fa-plus mr-2" />
                        Thêm sản phẩm
                    </a-button>
                </nuxt-link>
            </div>
            <ProductsTable
                class="mt-4"
                :products="products"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ProductsFilter from '@/components/products/Filter.vue';
    import ProductsTable from '@/components/products/Table.vue';

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
            ...mapState('products', ['products', 'pagination']),
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
                    await this.$store.dispatch('products/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách sản phẩm',
            };
        },
    };
</script>
