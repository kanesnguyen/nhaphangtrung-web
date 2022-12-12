<template>
    <div>
        <CartFilter class="card" />
        <div class="card mt-4">
            <CartTable
                class="mt-4"
                :carts="carts"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import CartTable from '@/components/carts/Table.vue';
    import CartFilter from '@/components/carts/Filter.vue';

    export default {
        components: {
            CartTable,
            CartFilter,
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
            ...mapState('carts', ['carts', 'pagination']),
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
                label: 'Giỏ hàng',
                link: '/carts',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('carts/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Giỏ hàng',
            };
        },
    };
</script>
