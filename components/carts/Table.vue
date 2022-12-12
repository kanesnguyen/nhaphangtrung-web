<template>
    <div>
        <a-table
            :data-source="carts"
            :pagination="false"
            :scroll="{ x: 1200 }"
            :row-key="(row) => row._id"
            :loading="loading"
        >
            <a-table-column
                key="id"
                title="ID"
                :width="80"
                data-index="id"
            />
            <a-table-column
                key="image"
                title="Ảnh sản phẩm"
                :width="150"
                data-index="image"
            />
            <a-table-column
                key="website"
                title="Website"
                :width="100"
                data-index="website"
            />
            <a-table-column
                key="exchangeRate"
                title="Tỷ giá"
                :width="80"
                data-index="exchangeRate"
            />
            <a-table-column
                key="totalMoney"
                data-index="totalMoney"
                title="Tổng tiền"
                align="center"
                :width="150"
            >
                <template #default="totalMoney">
                    {{ totalMoney }}
                </template>
            </a-table-column>
            <a-table-column
                key="deposit"
                data-index="deposit"
                title="Cọc"
                align="center"
                :width="80"
            >
                <template #default="deposit">
                    {{ deposit }}
                </template>
            </a-table-column>
            <a-table-column
                key="depositAmount"
                data-index="depositAmount"
                title="Đã cọc"
                align="center"
                :width="150"
            >
                <template #default="depositAmount">
                    {{ depositAmount }}
                </template>
            </a-table-column>
            <a-table-column
                key="depositRemaining"
                data-index="depositRemaining"
                title="Còn thiếu"
                align="center"
                :width="150"
            >
                <template #default="depositRemaining">
                    {{ depositRemaining }}
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
                    {{ status }}
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
                data-index="id"
                title="Thao tác"
                align="center"
                :width="150"
            >
                <template #default="id">
                    <span><i class="fas fa-plus" />{{id}}</span>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<script>

    export default {
        components: {
        },

        props: {
            carts: {
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
            await store.dispatch('carts/fetchAll', query);
        },

        data() {
            return {
            };
        },
        computed: {
        },

        methods: {
        },
    };
</script>
