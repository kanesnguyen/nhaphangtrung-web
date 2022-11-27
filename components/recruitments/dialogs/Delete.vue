<template>
    <a-modal
        v-model="visible"
        width="500px"
        :mask-closable="false"
        destroy-on-close
        title="Xóa tin tuyển dụng"
    >
        <div>
            Xác nhận xóa tin tuyển dụng <strong>{{ recruitment.title }}</strong>
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
                @click="deleteRecruitment"
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
                recruitment: {},
            };
        },

        methods: {
            open(recruitment) {
                this.recruitment = recruitment;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async deleteRecruitment() {
                try {
                    this.loading = true;
                    if (this.recruitment) {
                        await this.$api.recruitments.delete(this.recruitment.id);
                    }
                    this.close();
                    this.$message.success('Xóa tin tuyển dụng thành công');
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
