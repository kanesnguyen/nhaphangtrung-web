<template>
    <div>
        <a-table
            :data-source="projects"
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
                        class="w-[100px] rounded aspect-video object-cover"
                        loading=";azy"
                        :src="thumbnail"
                        alt="/"
                    >
                </template>
            </a-table-column>
            <a-table-column
                key="name"
                title="Tiêu đề"
                :width="350"
            >
                <template #default="record">
                    <nuxt-link :to="`/projects/${record.id}`" class="hover:underline">
                        {{ record.name }}
                    </nuxt-link>
                </template>
            </a-table-column>
            <a-table-column
                key="isHighlight"
                title="Nổi bật"
                :width="80"
                align="center"
            >
                <template #default="record">
                    <span class="line-clamp-3"><i :class="record.isHighLight ? `fas fa-star text-warning-100` : `far fa-star`" class="text-2xl" /></span>
                </template>
            </a-table-column>
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
            <a-table-column
                :width="60"
                align="right"
            >
                <template #default="scope">
                    <a-dropdown :trigger="['click']">
                        <a-button class="!mr-0" size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <nuxt-link :to="`/projects/${scope.id}`">
                                    Xem chi tiết
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item>
                                <nuxt-link :to="`/projects/${scope.id}/edit`">
                                    Chỉnh sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item class="capitalize" @click="changeStatus(scope)">
                                {{ scope.isHighLight ? 'Đánh dấu nổi bật' : 'Bỏ đánh dấu nổi bật' }}
                            </a-menu-item>
                            <a-menu-item class="capitalize" @click="changeStatus(scope)">
                                {{ scope.status === STATUS.ACTIVE ? 'Ngưng hoạt động' : 'Cho phép hoạt động' }}
                            </a-menu-item>
                            <a-menu-item class="!text-danger-100" @click="() => { $refs.confirmDelete.open(), projectsSelected = scope }">
                                Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { STATUS, STATUS_OPTIONS } from '@/constants/projects/status';

    export default {
        components: {
        },

        props: {
            projects: {
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
            await store.dispatch('projects/fetchAll', query);
        },

        data() {
            return {
                STATUS,
                STATUS_OPTIONS,
                projectsSelected: null,
            };
        },

        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            mapDataFromOptions,
        },
    };
</script>
