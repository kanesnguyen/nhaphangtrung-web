<template>
    <a-modal
        v-model="visible"
        width="500px"
        :mask-closable="false"
        destroy-on-close
        title="Xóa banner"
    >
        <div>
            Xác nhận xóa banner <strong>{{ banner.title }}</strong>
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
                @click="deleteBanner"
            >
                Xác nhận
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    export default {
        data() {
            return {
                visible: false,
                loading: false,
                banner: {},
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

            async deleteBanner() {
                try {
                    this.loading = true;
                    if (this.banner) {
                        await this.$api.banners.delete(this.banner.id);
                    }
                    this.close();
                    this.$message.success('Xóa banner thành công');
                    await this.$nuxt.refresh();
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
