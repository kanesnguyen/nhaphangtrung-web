<template>
    <div class="flex flex-col gap-4">
        <div class="card flex justify-between items-center">
            <ct-page-header text="Danh sách thư viện" />
            <a-button type="primary" @click="handleCreate">
                <i class="fas fa-plus mr-2" /> Thêm mới
            </a-button>
        </div>
        <div v-if="users.length" class="flex-grow flex flex-col">
            <a-spin :spinning="loading" class="flex-grow">
                <div class="items-start gap-4 grid grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 xl:sm:grid-cols-4">
                    <LibraryItem v-for="user in users" :key="user.id" :user="user" />
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
    import LibraryItem from '@/components/users/Item.vue';
    import LibraryDialog from '@/components/users/Dialog.vue';

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
            ...mapState('users', ['users', 'pagination']),
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
                link: '/users',
            }]);
        },

        beforeDestroy() {
            this.$store.commit('users/SET_LIBRARIES', []);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('users/fetchAll', {
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
