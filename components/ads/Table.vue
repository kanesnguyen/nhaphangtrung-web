<template>
    <div>
        <a-table
            ref="form"
            :data-source="ads"
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
                    <nuxt-link :to="`/ads/${record.id}`" class="hover:underline">
                        {{ record.title }}
                    </nuxt-link>
                </template>
            </a-table-column>
            <a-table-column
                key="views"
                data-index="views"
                title="LƯỢT XEM "
                :width="110"
                align="right"
            >
                <template #default="views">
                    {{ views | numberFormat }}
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
                    <a-tag :color="NEWS_STATUS_COLORS[status]" class="!mr-0">
                        {{ NEWS_STATUS_LABELS[status] }}
                    </a-tag>
                </template>
            </a-table-column>
            <a-table-column
                key="publicAt"
                title="NGÀY ĐĂNG"
                :width="160"
                data-index="publicAt"
                align="center"
            >
                <template #default="publicAt">
                    {{ publicAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="actions"
                :width="60"
            >
                <template #default="record">
                    <a-dropdown>
                        <a-button size="small">
                            <i class="fas fa-ellipsis-h" />
                        </a-button>
                        <a-menu slot="overlay">
                            <a-menu-item class="!py-2">
                                <nuxt-link :to="`/ads/${record.id}`">
                                    <i class="fas fa-edit mr-2 text-info-100" /> Sửa
                                </nuxt-link>
                            </a-menu-item>
                            <a-menu-item v-if="record.status === NEWS_STATUS.ACTIVE" class="!py-2" @click="inactive(record)">
                                <i class="fas fa-lock text-danger-100 mr-2" /> Ngừng hoạt động
                            </a-menu-item>
                            <a-menu-item v-else class="!py-2" @click="active(record)">
                                <i class="fas fa-unlock text-success-100 mr-2" /> Hoạt động
                            </a-menu-item>
                            <a-menu-item class="!py-2" @click="$refs.adsDeleteDialog.open(record)">
                                <i class="fas fa-trash-alt mr-2 text-danger-100" />Xóa
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
            </a-table-column>
        </a-table>
        <NewsDeleteDialog ref="adsDeleteDialog" />
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { NEWS_STATUS, NEWS_STATUS_OPTIONS } from '@/constants/ads/status';
    import NewsDeleteDialog from '@/components/ads/dialogs/Delete.vue';

    export default {
        components: {
            NewsDeleteDialog,
        },

        props: {
            ads: {
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
                NEWS_STATUS,
            };
        },

        computed: {
            NEWS_STATUS_LABELS() {
                return mapDataFromOptions(NEWS_STATUS_OPTIONS, 'value', 'label');
            },

            NEWS_STATUS_COLORS() {
                return mapDataFromOptions(NEWS_STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            // turn on active
            async active(data) {
                try {
                    await this.$api.ads.setActive(data.id);
                    await this.$store.dispatch('ads/fetchAll', this.$route.query);
                    this.$message.success('Bật hoạt động thành công!');
                } catch (error) {
                    this.$handleError(error);
                }
            },

            // set inactive
            async inactive(data) {
                try {
                    await this.$api.ads.setInactive(data.id);
                    await this.$store.dispatch('ads/fetchAll', this.$route.query);
                    this.$message.success('Tắt hoạt động thành công!');
                } catch (error) {
                    this.$handleError(error);
                }
            },
        },
    };
</script>
