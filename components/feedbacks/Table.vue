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
                    (text, record, index) =>
                        $helpers.getTableIndex(pagination, index)
                "
            />
            <a-table-column
                key="title"
                title="Tiêu đề"
                :width="150"
                data-index="title"
            />
            <a-table-column
                key="description"
                title="Nội dung"
                :width="300"
                data-index="description"
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
        </a-table>
    </div>
</template>

<script>

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
            };
        },
        computed: {
        },

        methods: {
        },
    };
</script>
