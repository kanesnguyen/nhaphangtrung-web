<template>
    <div>
        <PartnersFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách đối tác" />
                <a-button type="primary" @click="$refs.PartnerDialog.open()">
                    Thêm đối tác
                </a-button>
            </div>
            <PartnersTable
                class="mt-4"
                :partners="partners"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
        <PartnerDialog ref="PartnerDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import PartnersTable from '@/components/partners/Table.vue';
    import PartnersFilter from '@/components/partners/Filter.vue';
    import PartnerDialog from '@/components/partners/Dialog.vue';

    export default {
        components: {
            PartnersTable,
            PartnersFilter,
            PartnerDialog,
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
            ...mapState('partners', ['partners', 'pagination']),
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
                label: 'Đối tác',
                link: '/partners',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('partners/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Đối tác',
            };
        },
    };
</script>
