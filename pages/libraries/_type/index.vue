<template>
    <div class="flex flex-col gap-4">
        <div class="card flex justify-between items-center">
            <ct-page-header text="Danh sách thư viện" />
            <a-button type="primary" @click="handleCreate">
                <i class="fas fa-plus mr-2" /> Thêm mới
            </a-button>
        </div>
        <div v-if="libraries.length" class="flex-grow flex flex-col">
            <a-spin :spinning="loading" class="flex-grow">
                <div class="items-start gap-4 grid grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 xl:sm:grid-cols-4">
                    <LibraryItem v-for="library in libraries" :key="library.id" :library="library" />
                </div>
            </a-spin>
            <ct-pagination :data="pagination" class="mt-4" />
        </div>
        <a-empty v-else description="Trống" />
        <LibraryDialog ref="libraryDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import LibraryItem from '@/components/libraries/Item.vue';
    import LibraryDialog from '@/components/libraries/Dialog.vue';

    export default {
        components: {
            LibraryItem,
            LibraryDialog,
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
            ...mapState('libraries', ['libraries', 'pagination']),
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
                label: 'Thư viện',
                link: '/libraries',
            }]);
        },

        beforeDestroy() {
            this.$store.commit('libraries/SET_LIBRARIES', []);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('libraries/fetchAll', {
                        ...this.$route.query,
                        type: this.$route.params.type,
                    });
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            handleCreate() {
                this.$refs.libraryDialog.open(this.$route.params.type);
            },
        },

        head() {
            return {
                title: 'Danh sách thư viện',
            };
        },
    };
</script>
