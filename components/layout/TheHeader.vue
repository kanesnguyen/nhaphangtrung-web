<template>
    <div class="bg-white py-4 px-4 md:px-6 flex justify-between items-center border-b border-gray-10">
        <div>
            <div class="md:hidden cursor-pointer" @click="toggleSidebar">
                <i class="fas fa-bars text-lg" />
            </div>
            <div class="hidden md:flex items-center gap-4">
                <i class="fas fa-bars text-xl cursor-pointer" @click="$emit('toggleSidebar')" />
                <Breadcrumb :links="breadcrumbs" class="max-w-[400px]" />
            </div>
        </div>
        <div class="flex items-center gap-6">
            <a href="tel:0963395763" class="font-semibold">
                <i class="fas fa-phone-alt text-gray-100" /> <span class="hidden md:inline text-[#f6b900]">0963395763</span>
            </a>
            <div class="font-semibold">
                <i class="fas fa-question-circle" /> <span class="hidden md:inline">Trợ giúp</span>
            </div>
            <!-- <NotificationPopover /> -->
            <div class="flex items-center gap-2">
                <a-avatar>
                    <i class="fas fa-user" />
                </a-avatar>
                <a-dropdown :trigger="['click']">
                    <div class="cursor-pointer font-semibold">
                        <!-- {{ authUser.fullName }} -->
                        <i class="fas fa-chevron-down" />
                    </div>
                    <template #overlay>
                        <a-menu class="!mt-3">
                            <a-menu-item class="!py-2" @click="$refs.updateInfoDialog.open()">
                                <i class="mr-4 fas fa-user" />Cập nhật thông tin
                            </a-menu-item>
                            <a-menu-item class="!py-2" @click="$refs.updatePasswordDialog.open()">
                                <i class="mr-4 fas fa-key" />Đổi mật khẩu
                            </a-menu-item>
                            <a-menu-item class="!py-2" @click="logout">
                                <i class="mr-4 fas fa-sign-out-alt" />Đăng xuất
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
        <a-drawer
            class="header-sidebar-drawer"
            :visible="sidebarVisible"
            placement="left"
            @close="sidebarVisible = false"
        >
            <TheSidebar class="h-full" />
        </a-drawer>
        <UpdateInfoDialog ref="updateInfoDialog" />
        <UpdatePasswordDialog ref="updatePasswordDialog" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TheSidebar from '@/components/layout/TheSidebar.vue';
    // import NotificationPopover from '@/components/notifications/Popover.vue';
    import UpdateInfoDialog from '@/components/auth/dialogs/UpdateInfo.vue';
    import UpdatePasswordDialog from '@/components/auth/dialogs/UpdatePassword.vue';
    import Breadcrumb from '@/components/shared/Breadcrumb.vue';

    export default {
        components: {
            TheSidebar,
            // NotificationPopover,
            UpdateInfoDialog,
            UpdatePasswordDialog,
            Breadcrumb,
        },

        data() {
            return {
                sidebarVisible: false,
            };
        },

        computed: {
            ...mapState('breadcrumbs', ['breadcrumbs']),

            authUser() {
                return this.$auth.user || {};
            },
        },

        methods: {
            toggleSidebar() {
                this.sidebarVisible = !this.sidebarVisible;
            },

            async logout() {
                // trigger logout and remove data in local storage
                await this.$auth.logout();
                this.$auth.$storage.removeLocalStorage('data');
                this.$router.push('/login');
            },
        },
    };
</script>

<style lang="scss">
    .header-sidebar-drawer {
        .ant-drawer-body {
            @apply p-0 h-full #{!important};
        }
    }
</style>
