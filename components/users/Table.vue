<template>
    <div>
        <a-table
            :data-source="users"
            :pagination="false"
            :scroll="{ x: 1200 }"
            :row-key="(row) => row._id"
            :loading="loading"
        >
            <a-table-column
                key="index"
                title="STT"
                align="center"
                :width="60"
                :custom-render="(text, record, index) => $helpers.getTableIndex(pagination, index)"
            />
            <a-table-column
                key="username"
                title="Username"
                :width="100"
            >
                <template #default="record">
                    {{ record.username }}
                </template>
            </a-table-column>
            <a-table-column
                key="fullName"
                title="Họ và tên"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.fullName || '- -' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="phoneNumber"
                title="Số điện thoại"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span class="line-clamp-3">{{ record.phoneNumber || '- -' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="email"
                title="Email"
                :width="150"
                align="center"
            >
                <template #default="record">
                    <span class="line-clamp-3">{{ record.email || '- -' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                title="Trạng thái"
                :width="120"
                data-index="status"
                align="center"
            >
                <template #default="status">
                    <a-tag :color="STATUS_COLOR[status]">
                        {{ STATUS_LABEL[status] }}
                    </a-tag>
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                data-index="createdAt"
                title="Ngày tạo"
                align="center"
                :width="150"
            >
                <template #default="createdAt">
                    {{ createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                :width="60"
                align="right"
                fixed="right"
            >
                <template #default="scope">
                    <a-dropdown :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <nuxt-link :to="`/posts/${scope.id}`">
                                    Xem chi tiết
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item>
                                <nuxt-link :to="`/posts/${scope.id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item class="capitalize" @click="changeStatus(scope)">
                                {{ scope.status === USER_STATUS.ACTIVE ? 'Ngưng hoạt động' : 'Cho phép hoạt động' }}
                            </a-menu-item>
                            <a-menu-item class="!text-danger-100" @click="() => { $refs.confirmDelete.open(), userSelected = scope }">
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <ConfirmDialog
            ref="confirmDelete"
            title="Xác nhận xóa bài viết"
            content="Bạn chắc chắn xóa bài viết này chứ ?"
            @confirm="confirmDelete"
        />
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import { USER_STATUS, USER_STATUS_OPTIONS } from '@/constants/users/status';

    export default {
        components: {
            ConfirmDialog,
        },

        props: {
            users: {
                type: Array,
                default: () => [],
            },
            loading: {
                type: Boolean,
                default: false,
            },
            pagination: {
                type: Object,
                required: false,
            },
        },

        data() {
            return {
                USER_STATUS,
                USER_STATUS_OPTIONS,
                userSelected: null,
            };
        },

        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(USER_STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(USER_STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            mapDataFromOptions,
            async confirmDelete() {
                try {
                    await this.$api.posts.delete(this.userSelected.id);
                    this.$message.success('Xóa bài viết thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                    this.$message.error('Xóa bài viết thất bại');
                }
            },
            async changeStatus(user) {
                try {
                    if (user.status === USER_STATUS.ACTIVE) {
                        await this.$api.posts.inActive(user.id);
                    } else {
                        await this.$api.posts.active(user.id);
                    }
                    this.$message.success('Thay đổi trạng thái thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                    this.$message.error('Thay đổi trạng thái thất bại');
                }
            },
        },
    };
</script>
