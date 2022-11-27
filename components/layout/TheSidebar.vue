/* eslint-disable vue/no-v-model-argument */
<template>
    <div class="bg-[#2a3042] a-the-sidebar-vertical max-h-screen h-full flex flex-col" :class="[collapsed ? 'w-auto' : '!w-[260px]']">
        <div class="h-[65px] flex justify-between items-center" :class="[collapsed ? 'px-4' : 'px-6']">
            <nuxt-link class="flex justify-center items-center mt-1" to="/">
                <img src="/images/logo-white.svg" width="50">
            </nuxt-link>
            <div v-show="!collapsed" class="text-white font-semibold">
                CMS Website
            </div>
        </div>
        <a-menu
            :open-keys="openKeys"
            :default-selected-keys="activeKeys"
            :inline-collapsed="collapsed"
            class="w-[260px] !mt-4 flex-grow overflow-y-auto custom-scroll overflow-x-hidden !p-4"
            mode="inline"
            @click="handleClick"
            @openChange="handleOpenChange"
        >
            <template v-for="sidebarItem in SIDEBAR_ITEMS">
                <a-sub-menu v-if="sidebarItem.childs" :key="sidebarItem.route">
                    <template slot="title">
                        <i :class="sidebarItem.icon" />
                        <span class="truncate">{{ sidebarItem.label }}</span>
                    </template>
                    <template v-for="sidebarItemChild in sidebarItem.childs">
                        <a-menu-item v-if="sidebarItemChild.route" :key="sidebarItemChild.route">
                            <span class="truncate">{{ sidebarItemChild.label }}</span>
                        </a-menu-item>
                    </template>
                </a-sub-menu>
                <a-menu-item v-else :key="sidebarItem.route">
                    <i :class="sidebarItem.icon" />
                    <span class="truncate">{{ sidebarItem.label }}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>

<script>
    import SIDEBAR_ITEMS from '@/constants/sidebarItems';

    export default {
        data() {
            return {
                SIDEBAR_ITEMS,
                isOpen: true,
                openKeys: [],
                logoutVisible: false,
                collapsed: false,
            };
        },

        computed: {
            activeKeys() {
                return [this.$route.path];
            },
        },

        async mounted() {
            this.collapsed = window.innerWidth < 768 ? false : localStorage.getItem('collapsed') === 'true' || false;
        },

        methods: {
            handleClick({ key }) {
                this.$router.push(key);
            },

            handleOpenChange(keys) {
                this.openKeys = keys?.length ? [keys?.pop()] : [];
            },

            toggleCollapsed() {
                this.collapsed = !this.collapsed;
                localStorage.setItem('collapsed', this.collapsed);
            },
        },
    };
</script>

<style lang="scss">
    .a-the-sidebar-vertical:not(.a-menu--collapse) {
        .ant-menu {
            @apply bg-[#2a3042];
        }
        .ant-menu-inline {
            @apply border-0;
        }
        .ant-menu-sub {
            .ant-menu-item {
                @apply pl-8 #{!important};
            }
        }
        .ant-menu-submenu-arrow {
            @apply text-right;
        }
        .ant-menu-item, .ant-menu-submenu-title {
            height: auto !important;
            @apply text-white flex items-center;
            @apply m-0 px-4 my-3 rounded  #{!important};

            >span {
                @apply flex-grow;
            }

            i {
                @apply text-lg w-4 mr-4 mb-1 #{!important};
            }

            .ant-menu-submenu-arrow {
                @apply mr-0;
                &::after, &::before {
                    @apply bg-white #{!important};
                }
            }

            &-selected {
                @apply bg-prim-100;
                &::after {
                    @apply hidden;
                }
            }
        }
        .ant-menu-vertical {
            @apply border-r-0 #{!important};
        }
    }
</style>
