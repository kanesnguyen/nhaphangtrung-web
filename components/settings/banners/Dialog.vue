<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${banner ? 'Chỉnh sửa' : 'Thêm mới'} banner`"
        width="650px"
    >
        <BannerForm ref="bannerForm" :banner="banner" @submit="handleSubmit" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.bannerForm.submit()"
            >
                {{ banner ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import BannerForm from '@/components/settings/banners/Form.vue';

    export default {
        components: {
            BannerForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                banner: null,
            };
        },

        methods: {
            open(banner) {
                this.banner = banner;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.banner) {
                    await this.updateBanner(form);
                } else {
                    await this.createBanner(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createBanner(form) {
                try {
                    this.loading = true;
                    await this.$api.banners.create(form);
                    this.close();
                    this.$message.success('Thêm banner thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateBanner(form) {
                try {
                    this.loading = true;
                    await this.$api.banners.update(this.banner.id, form);
                    this.close();
                    this.$message.success('Cập nhật thông tin banner thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
