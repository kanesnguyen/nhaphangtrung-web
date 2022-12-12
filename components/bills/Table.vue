<template>
    <div>
        <a-table
            :data-source="bills"
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
                    (text, record, index) =>
                        $helpers.getTableIndex(pagination, index)
                "
            />
            <a-table-column
                key="id"
                title="ID"
                :width="150"
                data-index="id"
            />
            <a-table-column
                key="username"
                title="Usename"
                :width="150"
                data-index="username"
            />
            <a-table-column
                key="totalMoney"
                title="Tổng tiền"
                :width="300"
                data-index="totalMoney"
            />
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
                key="action"
                data-index="id"
                title="Thao tác"
                align="center"
                :width="150"
            >
                <template #default="id">
                    <a-button class="!mr-0" size="small" @click="printBill(id)">
                        <i class="fas fa-ellipsis-h" />
                    </a-button>
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
            bills: {
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
            await store.dispatch('bills/fetchAll', query);
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
