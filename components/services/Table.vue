<template>
    <div>
        <a-table
            ref="form"
            :data-source="services"
            :loading="loading"
            :pagination="false"
            :scroll="{x: 800}"
        >
            <a-table-column
                v-if="pagination"
                key="index"
                title="STT"
                :width="80"
                align="center"
                :custom-render="(text, record, index) => $helpers.getTableIndex(pagination, index)"
            />
            <a-table-column
                key="thumbnail"
                data-index="thumbnail"
                title="Ảnh"
                :width="100"
                align="center"
            >
                <template #default="thumbnail">
                    <img
                        loading="lazy"
                        class="w-[100px] aspect-video rounded object-cover"
                        :src="thumbnail"
                        alt="/"
                    >
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="Tiêu đề"
                :width="350"
            >
                <template #default="record">
                    <nuxt-link :to="`/services/${record.id}`" class="hover:underline">
                        {{ record.name }}
                    </nuxt-link>
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                data-index="status"
                title="Trạng thái"
                :width="120"
                align="center"
            >
                <template #default="status">
                    <a-tag :color="SERVICES_STATUS_COLORS[status]" class="!mr-0">
                        {{ SERVICES_STATUS_LABELS[status] }}
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
                key="actions"
                :width="60"
                align="right"
            >
                <template #default="record">
                    <a-dropdown>
                        <a-button size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay" placement="bottomRight">
                            <a-menu-item class="!py-2">
                                <nuxt-link :to="`/services/${record.id}`">
                                    <i class="fas fa-edit mr-2 text-info-100" /> Sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item class="!py-2" @click="changeStatus(record)">
                                <i class="fas fa-lock text-danger-100 mr-2" />
                                {{ record.status === SERVICES_STATUS.INACTIVE || record.status === SERVICES_STATUS.DRAFT ?
                                    'Cho phép hoạt động' : 'Ngưng hoạt động'
                                }}
                            </a-menu-item>
                            <a-menu-item
                                class="!py-2"
                                @click="() => {
                                    $refs.ConfirmDialog.open(record),
                                    serviceSelected = record
                                }"
                            >
                                <i class="fas fa-trash-alt mr-2 text-danger-100" /> Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <ConfirmDialog
            ref="ConfirmDialog"
            title="Cảnh báo"
            content="Bạn chắc chắn muốn xóa dịch vụ này chứ ?"
            @confirm="deleteService"
        />
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { SERVICES_STATUS, SERVICES_STATUS_OPTIONS } from '@/constants/services/status';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    export default {
        components: {
            ConfirmDialog,
        },

        props: {
            services: {
                type: Array,
                required: true,
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
                SERVICES_STATUS,
                SERVICES_STATUS_OPTIONS,
                serviceSelected: null,
            };
        },

        computed: {
            SERVICES_STATUS_LABELS() {
                return mapDataFromOptions(SERVICES_STATUS_OPTIONS, 'value', 'label');
            },

            SERVICES_STATUS_COLORS() {
                return mapDataFromOptions(SERVICES_STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            async changeStatus(data) {
                try {
                    if (data.status === SERVICES_STATUS.INACTIVE || data.status === SERVICES_STATUS.DRAFT) {
                        await this.$api.services.setActive(data.id);
                    } else {
                        await this.$api.services.setInactive(data.id);
                    }
                    this.$nuxt.refresh();
                    this.$message.success('Chỉnh sửa trạng thái thành công!');
                } catch (error) {
                    this.$handleError(error);
                }
            },

            async deleteService() {
                try {
                    await this.$api.services.delete(this.serviceSelected.id);
                    this.$nuxt.refresh();
                    this.$message.success('Xóa dịch vụ thành công.');
                } catch (error) {
                    this.$handleError(error);
                }
            },
        },
    };
</script>
