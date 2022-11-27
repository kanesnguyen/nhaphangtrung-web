<template>
    <div>
        <a-table
            :data-source="feedbacks"
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
                :custom-render="
                    (text, record, index) =>
                        $helpers.getTableIndex(pagination, index)
                "
            />
            <a-table-column
                key="thumbnail"
                title="Ảnh"
                :width="100"
                align="center"
            >
                <template #default="record">
                    <img
                        class="w-[100px] mx-auto aspect-video rounded object-cover"
                        :src="record.thumbnail"
                        alt="/"
                    >
                </template>
            </a-table-column>
            <a-table-column
                key="content"
                title="Nội dung"
                :width="300"
                data-index="content"
            />
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
            <a-table-column :width="60" align="right">
                <template #default="scope">
                    <a-dropdown :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item @click="openFeedbackDialog(scope)">
                                Chỉnh sửa
                            </a-menu-item>
                            <a-menu-item
                                class="capitalize"
                                @click="changeStatus(scope)"
                            >
                                {{
                                    scope.status === FEEDBACK_STATUS.ACTIVE
                                        ? "Ngưng hoạt động"
                                        : "Cho phép hoạt động"
                                }}
                            </a-menu-item>
                            <a-menu-item
                                class="!text-danger-100"
                                @click="$refs.deleteDialog.open(scope)"
                            >
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <FeedbackDialog ref="feedbackDialog" />
        <DeleteDialog ref="deleteDialog" />
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import {
        FEEDBACK_STATUS_OPTIONS,
        FEEDBACK_STATUS,
    } from '@/constants/feedbacks/status';
    import DeleteDialog from '@/components/feedbacks/dialog/Delete.vue';
    import FeedbackDialog from '@/components/feedbacks/Dialog.vue';

    export default {
        components: {
            DeleteDialog,
            FeedbackDialog,
        },

        props: {
            feedbacks: {
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

        async asyncData({ store, query }) {
            await store.dispatch('feedbacks/fetchAll', query);
        },

        data() {
            return {
                FEEDBACK_STATUS,
                FEEDBACK_STATUS_OPTIONS,
            };
        },
        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(
                    FEEDBACK_STATUS_OPTIONS,
                    'value',
                    'label',
                );
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(
                    FEEDBACK_STATUS_OPTIONS,
                    'value',
                    'color',
                );
            },
        },

        methods: {
            mapDataFromOptions,

            openFeedbackDialog(feedback) {
                this.$refs.feedbackDialog.open(feedback);
            },

            async changeStatus(feedback) {
                try {
                    if (feedback.status === FEEDBACK_STATUS.ACTIVE) {
                        await this.$api.feedbacks.setInactive(feedback.id);
                    } else {
                        await this.$api.feedbacks.setActive(feedback.id);
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
