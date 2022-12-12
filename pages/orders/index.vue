<template>
    <div>
        <OrderFilter class="card" />
        <div class="card mt-4">
            <OrderTable
                class="mt-4"
                :orders="orders"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import OrderTable from '@/components/orders/Table.vue';
    import OrderFilter from '@/components/orders/Filter.vue';

    export default {
        components: {
            OrderTable,
            OrderFilter,
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
            ...mapState('orders', ['orders', 'pagination']),
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
                label: 'Danh sách đơn hàng',
                link: '/orders',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('orders/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách đơn hàng',
            };
        },
    };
</script>
