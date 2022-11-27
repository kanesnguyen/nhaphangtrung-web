<template>
    <a-modal
        v-model="visible"
        width="500px"
        :mask-closable="false"
        destroy-on-close
        title="Xóa phản hồi"
    >
        <div>
            Xác nhận xóa phản hồi <strong>{{ feedback.content }}</strong>
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
                @click="deleteFeedback"
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
                feedback: {},
            };
        },

        methods: {
            open(feedback) {
                this.feedback = feedback;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async deleteFeedback() {
                try {
                    this.loading = true;
                    if (this.feedback) {
                        await this.$api.feedbacks.delete(this.feedback.id);
                    }
                    this.close();
                    this.$message.success('Xóa phản hồi thành công');
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
