<template>
    <div>
        <ServicesFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách dịch vụ" />
                <nuxt-link to="/services/create">
                    <a-button type="primary">
                        <i class="fas fa-plus mr-2" /> Thêm mới
                    </a-button>
                </nuxt-link>
            </div>
            <ServicesTable
                class="mt-4"
                :services="services"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ServicesFilter from '@/components/services/Filter.vue';
    import ServicesTable from '@/components/services/Table.vue';

    export default {
        components: {
            ServicesFilter,
            ServicesTable,
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
            ...mapState('services', ['services', 'pagination']),
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
                label: 'Dịch vụ',
                link: '/',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('services/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách dịch vụ | EIH CMS',
            };
        },
    };
</script>
