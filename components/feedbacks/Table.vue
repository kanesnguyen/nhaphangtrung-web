<template>
    <div>
        <a-table
            :data-source="feedbacks"
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
                :custom-render="
                    (text, record, index) =>index
                "
            />
            <a-table-column
                key="orderCode"
                title="Mã đơn hàng"
                :width="150"
                data-index="orderCode"
            />
            <a-table-column
                key="type"
                title="Hình thức"
                :width="250"
                data-index="type"
            >
                <template #default="type">
                    {{ TYPE_LABEL[type] }}
                </template>
            </a-table-column>
            <a-table-column
                key="description"
                title="Nội dung"
                :width="300"
                data-index="description"
            />
            <a-table-column
                key="status"
                data-index="status"
                title="Trạng thái"
                align="center"
                :width="150"
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
        </a-table>
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import {
        FEEDBACK_STATUS, FEEDBACK_STATUS_OPTIONS, FEEDBACK_TYPE, FEEDBACK_TYPE_OPTIONS,
    } from '@/constants/feedbacks/status';

    export default {
        components: {
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
                FEEDBACK_TYPE,
                FEEDBACK_TYPE_OPTIONS,
            };
        },
        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(FEEDBACK_STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(FEEDBACK_STATUS_OPTIONS, 'value', 'color');
            },

            TYPE_LABEL() {
                return this.mapDataFromOptions(FEEDBACK_TYPE_OPTIONS, 'value', 'label');
            },
        },

        methods: {
            mapDataFromOptions,
        },
    };
</script>
