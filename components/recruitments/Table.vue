<template>
    <div>
        <a-table
            :data-source="recruitments"
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
                title="THUMBNAIL"
                :width="120"
                align="center"
            >
                <template #default="thumbnail">
                    <img :src="thumbnail" loading="lazy" class="object-cover w-[100px] mx-auto aspect-video rounded-sm">
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="TIÊU ĐỀ"
                :width="350"
            >
                <template #default="record">
                    <nuxt-link :to="`/recruitments/${record.slug}-${record.id}`" class="hover:underline">
                        {{ record.title }}
                    </nuxt-link>
                </template>
            </a-table-column>
            <a-table-column
                key="quantity"
                data-index="quantity"
                title="SỐ LƯỢNG"
                :width="110"
                align="center"
            >
                <template #default="quantity">
                    {{ quantity | numberFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="salary"
                data-index="salary"
                title="MỨC LƯƠNG"
                :width="150"
                align="center"
            >
                <template #default="salary">
                    {{ salary }}
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                data-index="status"
                title="TRẠNG THÁI"
                :width="160"
                align="center"
            >
                <template #default="status">
                    <a-tag :color="RECRUITMENT_STATUS_COLORS[status]">
                        {{ RECRUITMENT_STATUS_LABELS[status] }}
                    </a-tag>
                </template>
            </a-table-column>
            <a-table-column
                key="activedAt"
                title="NGÀY ĐĂNG"
                :width="170"
                data-index="activedAt"
                align="center"
            >
                <template #default="activedAt">
                    {{ activedAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="expired"
                title="HẾT HẠN"
                :width="170"
                data-index="expired"
                align="center"
            >
                <template #default="expired">
                    {{ expired | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="actions"
                :width="60"
            >
                <template #default="record">
                    <a-dropdown :trigger="['click']">
                        <a-button size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item class="!py-2">
                                <nuxt-link :to="`/recruitments/${record.slug}-${record.id}`">
                                    <i class="fas fa-edit mr-2 text-info-100" /> Sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item v-if="record.status === RECRUITMENT_STATUS.ACTIVE" class="!py-2" @click="setStatus(record, RECRUITMENT_STATUS.INACTIVE)">
                                <i class="fas fa-lock text-danger-100 mr-2" /> Ngừng hoạt động
                            </a-menu-item>
                            <a-menu-item v-else class="!py-2" @click="setStatus(record, RECRUITMENT_STATUS.ACTIVE)">
                                <i class="fas fa-unlock text-success-100 mr-2" /> Hoạt động
                            </a-menu-item>
                            <a-menu-item class="!py-2" @click="$refs.recruitmentDeleteDialog.open(record)">
                                <i class="fas fa-trash-alt mr-2 text-danger-100" />Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <RecruitmentDeleteDialog ref="recruitmentDeleteDialog" />
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { RECRUITMENT_STATUS, RECRUITMENT_STATUS_OPTIONS } from '@/constants/recruitment/status';
    import RecruitmentDeleteDialog from '@/components/recruitments/dialogs/Delete.vue';

    export default {
        components: {
            RecruitmentDeleteDialog,
        },

        props: {
            recruitments: {
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
                RECRUITMENT_STATUS,
            };
        },

        computed: {
            RECRUITMENT_STATUS_LABELS() {
                return mapDataFromOptions(RECRUITMENT_STATUS_OPTIONS, 'value', 'label');
            },

            RECRUITMENT_STATUS_COLORS() {
                return mapDataFromOptions(RECRUITMENT_STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            async setStatus(recruitment, status) {
                try {
                    if (status === RECRUITMENT_STATUS.ACTIVE) {
                        await this.$api.recruitments.setActive(recruitment.id);
                    } else if (status === RECRUITMENT_STATUS.INACTIVE) {
                        await this.$api.recruitments.setInactive(recruitment.id);
                    }
                    this.$message.success('Cập nhật trạng thái thành công');
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                }
            },
        },
    };
</script>
