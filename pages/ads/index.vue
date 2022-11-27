<template>
    <div>
        <NewsFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách quảng cáo" />
                <nuxt-link to="/ads/create">
                    <a-button type="primary">
                        <i class="fas fa-plus mr-2" /> Thêm mới
                    </a-button>
                </nuxt-link>
            </div>
            <NewsTable
                class="mt-4"
                :ads="ads"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import NewsFilter from '@/components/ads/Filter.vue';
    import NewsTable from '@/components/ads/Table.vue';

    export default {
        components: {
            NewsFilter,
            NewsTable,
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
            ...mapState('ads', ['ads', 'pagination']),
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
                label: 'Quảng cáo',
                link: '/ads',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('ads/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách quảng cáo',
            };
        },
    };
</script>
