<template>
    <div>
        <a-table
            :data-source="banners"
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
                key="image"
                data-index="image"
                title="ẢNH"
                :width="120"
                align="center"
            >
                <template #default="image">
                    <img :src="image" loading="lazy" class="object-cover w-[100px] mx-auto aspect-video rounded-sm">
                </template>
            </a-table-column>
            <a-table-column
                key="title"
                title="TIÊU ĐỀ"
                :width="350"
            >
                <template #default="record">
                    <div>
                        {{ record.title }}
                    </div>
                    <div v-if="record.linkDirect" class="flex items-center gap-2 !text-info-100">
                        <i class="fas fa-location-arrow" />
                        <a :href="record.linkDirect" class="line-clamp-1 hover:underline">
                            {{ record.linkDirect }}
                        </a>
                    </div>
                </template>
            </a-table-column>
            <a-table-column
                key="position"
                data-index="position"
                title="VỊ TRÍ"
                :width="150"
                align="center"
            >
                <template #default="position">
                    {{ BANNER_POSITION_LABELS[position] }}
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                title="TRẠNG THÁI"
                :width="160"
                align="center"
            >
                <template #default="record">
                    <a-switch :checked="record.status === BANNER_STATUS.ACTIVE" :loading="changeStatusLoading" @change="toggleBannerStatus(record)" />
                </template>
            </a-table-column>
            <a-table-column
                key="createdAt"
                title="NGÀY TẠO"
                :width="170"
                data-index="createdAt"
                align="center"
            >
                <template #default="createdAt">
                    {{ createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
                </template>
            </a-table-column>
            <a-table-column
                key="actions"
                :width="140"
                align="right"
            >
                <div slot="default" slot-scope="record" class="flex items-center justify-end gap-2">
                    <a-button @click="$refs.bannerDialog.open(record)">
                        <i class="fas fa-edit text-info-100" />
                    </a-button>
                    <a-button type="danger" @click="$refs.bannerDeleteDialog.open(record)">
                        <i class="fas fa-trash-alt" />
                    </a-button>
                </div>
            </a-table-column>
        </a-table>
        <BannerDialog ref="bannerDialog" />
        <BannerDeleteDialog ref="bannerDeleteDialog" />
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { BANNER_STATUS } from '@/constants/settings/banner/status';
    import { BANNER_POSITION_OPTIONS } from '@/constants/settings/banner/position';
    import BannerDialog from '@/components/settings/banners/Dialog.vue';
    import BannerDeleteDialog from '@/components/settings/banners/dialogs/Delete.vue';

    export default {
        components: {
            BannerDialog,
            BannerDeleteDialog,
        },

        props: {
            banners: {
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
                BANNER_STATUS,
                changeStatusLoading: false,
            };
        },

        computed: {
            BANNER_POSITION_LABELS() {
                return mapDataFromOptions(BANNER_POSITION_OPTIONS, 'value', 'label');
            },
        },

        methods: {
            async toggleBannerStatus(banner) {
                try {
                    this.changeStatusLoading = true;
                    await this.$api.banners.update(banner.id, {
                        status: banner.status === BANNER_STATUS.ACTIVE ? BANNER_STATUS.INACTIVE : BANNER_STATUS.ACTIVE,
                    });
                    this.$message.success('Cập nhật trạng thái thành công');
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.changeStatusLoading = false;
                }
            },
        },
    };
</script>
