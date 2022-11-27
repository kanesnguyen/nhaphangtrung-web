<template>
    <a-modal
        v-model="visible"
        width="500px"
        :mask-closable="false"
        destroy-on-close
        title="Xóa quảng cáo"
    >
        <div>
            Xác nhận xóa bản ghi
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
                @click="deleteAds"
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
                ads: {},
            };
        },
        methods: {
            open(ads) {
                this.ads = ads;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async deleteAds() {
                try {
                    this.loading = true;
                    if (this.ads) {
                        await this.$api.ads.delete(this.ads._id);
                    }
                    this.close();
                    this.$message.success('Xóa quảng cáo thành công');
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
