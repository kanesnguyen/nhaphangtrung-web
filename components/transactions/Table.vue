<template>
    <div>
        <a-table
            :data-source="transactions"
            :pagination="false"
            :scroll="{ x: 1200 }"
            :row-key="(row) => row._id"
            :loading="loading"
        >
            <a-table-column
                key="createdAt"
                data-index="createdAt"
                title="Ngày tạo"
                align="center"
                :width="120"
            >
                <template #default="createdAt">
                    {{ createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="code"
                title="Mã giao dịch"
                :width="150"
                data-index="code"
            >
                <template #default="code">
                    <a-tag color="#f6b900">
                        {{ code }}
                    </a-tag>
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="Nội dung"
                :width="300"
                data-index="title"
            />
            <a-table-column
                key="money"
                title="Số tiền (VNĐ)"
                :width="150"
                data-index="money"
                align="center"
            >
                <template #default="money">
                    {{ money | moneyFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="type"
                title="Loại giao dịch"
                :width="150"
                data-index="type"
                align="center"
            >
                <template #default="status">
                    {{ TYPE_LABEL[status] }}
                </template>
            </a-table-column>
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
                key="surplus"
                title="Số dư"
                align="center"
                :width="150"
            >
                <template #default="transaction">
                    <p v-if="transaction.status === 'success' ">
                        {{ transaction.surplus | moneyFormat }}
                    </p>
                    <p v-else>
                        {{ 'Đang cập nhật' }}
                    </p>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { TRANSACTION_STATUS, TRANSACTION_STATUS_OPTIONS } from '@/constants/transactions/status';
    import { TRANSACTION_TYPE_OPTIONS } from '@/constants/transactions/type';

    export default {
        components: {
        },

        props: {
            transactions: {
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
            await store.dispatch('transactions/fetchAll', query);
        },

        data() {
            return {
                TRANSACTION_STATUS,
                TRANSACTION_STATUS_OPTIONS,
                TRANSACTION_TYPE_OPTIONS,
            };
        },
        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(TRANSACTION_STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(TRANSACTION_STATUS_OPTIONS, 'value', 'color');
            },

            TYPE_LABEL() {
                return this.mapDataFromOptions(TRANSACTION_TYPE_OPTIONS, 'value', 'label');
            },
        },

        methods: {
            mapDataFromOptions,
        },
    };
</script>
