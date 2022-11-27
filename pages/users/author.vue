<template>
    <div>
        <UsersFilter class="card" />
        <div class="flex justify-between items-center mt-4">
            <div class="font-semibold text-prim-100 text-xl">
                Danh sách người dùng
            </div>
            <a-button type="primary" ghost @click="$refs.userDialog.open()">
                Thêm mới
            </a-button>
        </div>
        <UserTable
            class="mt-4"
            :loading="loading"
            :users="users"
            :pagination="pagination"
        />
        <div class="mt-4 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-4">
            <div class="text-gray-80 italic">
                Hiển thị {{ users.length }} trong tổng số {{ pagination.total }} mục
            </div>
            <ct-pagination :data="pagination" />
        </div>
        <UserDialog ref="userDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import UserDialog from '@/components/users/Dialog.vue';
    import UserTable from '@/components/users/Table.vue';
    import UsersFilter from '@/components/users/Filter.vue';

    export default {
        auth: false,

        components: {
            UserDialog,
            UserTable,
            UsersFilter,
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

        async watchQuery(query) {
            await this.fetchData(query);
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách tác giả',
                link: '/users/author',
            }]);
        },

        methods: {
            async fetchData(query) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('users/fetchAll', query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách người dùng',
            };
        },
    };
</script>
