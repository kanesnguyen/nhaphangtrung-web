<template>
    <div>
        <RecruitmentFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách tin tuyển dụng" />
                <nuxt-link to="/recruitments/create">
                    <a-button type="primary">
                        <i class="fas fa-plus mr-2" /> Thêm mới
                    </a-button>
                </nuxt-link>
            </div>
            <RecruitmentTable
                class="mt-4"
                :recruitments="recruitments"
                :loading="loading"
                :pagination="pagination"
            />
            <ct-pagination :data="pagination" class="mt-4" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import RecruitmentFilter from '@/components/recruitments/Filter.vue';
    import RecruitmentTable from '@/components/recruitments/Table.vue';

    export default {
        components: {
            RecruitmentFilter,
            RecruitmentTable,
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
            ...mapState('recruitments', ['recruitments', 'pagination']),
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
                label: 'Tin tuyển dụng',
                link: '/recruitments',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('recruitments/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách tin tuyển dụng',
            };
        },
    };
</script>
