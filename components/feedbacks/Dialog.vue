<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="feedback ? 'Chỉnh sửa phản hồi' : 'Thêm phản hồi'"
    >
        <FeedbackForm
            ref="feedbackForm"
            :feedback="feedback"
            @submit="handleSubmit"
        />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="px-8" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="px-8"
                type="primary"
                @click="$refs.feedbackForm.submit()"
            >
                {{ feedback ? "Cập nhật" : "Thêm phản hồi" }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import FeedbackForm from '@/components/feedbacks/Form.vue';

    export default {
        components: {
            FeedbackForm,
        },
        data() {
            return {
                visible: false,
                loading: false,
                feedback: null,
            };
        },

        methods: {
            open(feedback) {
                this.visible = true;
                this.feedback = feedback;
            },

            close() {
                this.visible = false;
            },
            async handleSubmit(form) {
                if (this.feedback) {
                    await this.updateFeedback(form);
                } else {
                    await this.createFeedback(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createFeedback(data) {
                try {
                    this.loading = true;
                    await this.$api.feedbacks.create(data);
                    this.close();
                    this.$message.success('Thêm thành công!');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            async updateFeedback(data) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('feedbacks/update', {
                        id: this.feedback.id,
                        data,
                    });
                    this.$message.success('Cập nhật thành công!');
                    this.close();
                } catch (error) {
                    this.$handleError(error);
                    this.$message.error('Cập nhật không thành công!');
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
