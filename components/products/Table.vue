<template>
    <div>
        <a-table
            :data-source="products"
            :pagination="false"
            :scroll="{ x: 1200 }"
            :row-key="(row) => row.id"
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
                key="name"
                title="Tên sản phẩm"
                :width="150"
            >
                <template #default="record">
                    <nuxt-link :to="`/products/${record.id}`" class="hover:underline">
                        {{ record.name }}
                    </nuxt-link>
                </template>
            </a-table-column>
            <a-table-column
                key="category"
                title="Danh mục"
                :width="120"
                align="center"
            >
                <template #default="record">
                    <span>{{ record.categoryName || '- -' }}</span>
                </template>
            </a-table-column>
            <a-table-column
                key="description"
                title="Mô tả"
                :width="200"
                align="center"
            >
                <template #default="record">
                    <span class="line-clamp-3">{{ record.description || '- -' }}</span>
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
                                <nuxt-link :to="`/products/${scope.id}`">
                                    Xem chi tiết
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item>
                                <nuxt-link :to="`/products/${scope.id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item class="capitalize" @click="changeStatus(scope)">
                                {{ scope.status === STATUS.ACTIVE ? 'Ngưng hoạt động' : 'Cho phép hoạt động' }}
                            </a-menu-item>
                            <a-menu-item class="!text-danger-100" @click="() => { $refs.confirmDelete.open(), productSelected = scope }">
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <ConfirmDialog
            ref="confirmDelete"
            title="Xác nhận xóa sản phẩm"
            content="Bạn chắc chắn xóa sản phẩm này chứ ?"
            @confirm="confirmDelete"
        />
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { STATUS, STATUS_OPTIONS } from '@/constants/products/status';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    export default {
        components: {
            ConfirmDialog,
        },

        props: {
            products: {
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
                STATUS,
                STATUS_OPTIONS,
                productSelected: null,
            };
        },

        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            mapDataFromOptions,
            async confirmDelete() {
                try {
                    await this.$api.products.delete(this.productSelected.id);
                    this.$message.success('Xóa sản phẩm thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                    this.$message.error('Xóa sản phẩm thất bại');
                }
            },
            async changeStatus(product) {
                try {
                    if (product.status === STATUS.ACTIVE) {
                        await this.$api.products.inActive(product.id);
                    } else {
                        await this.$api.products.active(product.id);
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
