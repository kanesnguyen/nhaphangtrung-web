<template>
    <div>
        <a-table
            :data-source="orders"
            :pagination="false"
            :scroll="{ x: 1200 }"
            :row-key="(row) => row._id"
            :loading="loading"
        >
            <a-table-column
                key="code"
                title="ID"
                :width="80"
                data-index="code"
                align="center"
            />
            <a-table-column
                key="image"
                title="Ảnh sản phẩm"
                :width="150"
                data-index="image"
                align="center"
            >
                <template #default="image">
                    <img :src="image" alt="/" class="rounded-md h-20 w-full object-cover">
                </template>
            </a-table-column>
            <a-table-column
                key="website"
                title="Website"
                :width="100"
                data-index="website"
                align="center"
            />
            <a-table-column
                key="exchangeRate"
                title="Tỷ giá"
                :width="80"
                data-index="exchangeRate"
                align="center"
            />
            <a-table-column
                key="totalMoney"
                data-index="totalMoney"
                title="Tổng tiền (VNĐ)"
                align="center"
                :width="150"
            >
                <template #default="totalMoney">
                    {{ totalMoney | moneyFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="deposit"
                data-index="deposit"
                title="Cọc (%)"
                align="center"
                :width="100"
            >
                <template #default="deposit">
                    {{ deposit | moneyFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="depositAmount"
                data-index="depositAmount"
                title="Đã cọc (VNĐ)"
                align="center"
                :width="150"
            >
                <template #default="depositAmount">
                    {{ depositAmount | moneyFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="depositRemaining"
                data-index="depositRemaining"
                title="Còn thiếu (VNĐ)"
                align="center"
                :width="150"
            >
                <template #default="depositRemaining">
                    {{ depositRemaining | moneyFormat }}
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
                key="createdAt"
                data-index="createdAt"
                title="Ngày đặt"
                align="center"
                :width="150"
            >
                <template #default="createdAt">
                    {{ createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="action"
                data-index="code"
                title="Thao tác"
                align="center"
                :width="150"
                fixed="right"
            >
                <template #default="code">
                    <nuxt-link :to="`/orders/${code}`">
                        <a-button
                            type="primary"
                            shape="circle"
                        >
                            <i class="fas fa-eye text-lg" />
                        </a-button>
                    </nuxt-link>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { ORDER_STATUS, ORDER_STATUS_OPTIONS } from '@/constants/orders/status';

    export default {
        components: {
        },

        props: {
            orders: {
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
            await store.dispatch('orders/fetchAll', query);
        },

        data() {
            return {
                ORDER_STATUS,
                ORDER_STATUS_OPTIONS,
            };
        },
        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(ORDER_STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(ORDER_STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            mapDataFromOptions,
        },
    };
</script>
