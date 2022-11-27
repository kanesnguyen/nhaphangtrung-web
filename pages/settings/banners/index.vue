<template>
    <div>
        <BannerFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách banner" />
                <a-button type="primary" @click="$refs.bannerDialog.open()">
                    <i class="fas fa-plus mr-2" /> Thêm mới
                </a-button>
            </div>
            <BannerTable
                class="mt-4"
                :banners="banners"
                :loading="loading"
                :pagination="pagination"
            />
            <ct-pagination :data="pagination" class="mt-4" />
        </div>
        <BannerDialog ref="bannerDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import BannerFilter from '@/components/settings/banners/Filter.vue';
    import BannerTable from '@/components/settings/banners/Table.vue';
    import BannerDialog from '@/components/settings/banners/Dialog.vue';

    export default {
        components: {
            BannerFilter,
            BannerTable,
            BannerDialog,
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
            ...mapState('settings/banners', ['banners', 'pagination']),
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
                label: 'Banner',
                link: '/banners',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('settings/banners/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách banner',
            };
        },
    };
</script>
