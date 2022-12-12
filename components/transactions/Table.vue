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
                :width="150"
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
            />
            <a-table-column
                key="title"
                title="Nội dung"
                :width="300"
                data-index="title"
            />
            <a-table-column
                key="money"
                title="Số tiền"
                :width="150"
                data-index="money"
                align="center"
            />
            <a-table-column
                key="type"
                title="Loại giao dịch"
                :width="150"
                data-index="type"
                align="center"
            />
            <a-table-column
                key="surplus"
                data-index="surplus"
                title="Số dư"
                align="center"
                :width="150"
            >
                <template #default="surplus">
                    {{ surplus }}
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
            };
        },
        computed: {
        },

        methods: {
        },
    };
</script>
