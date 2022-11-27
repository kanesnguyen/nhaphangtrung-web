<template>
    <a-modal
        v-model="visible"
        width="500px"
        :mask-closable="false"
        destroy-on-close
        title="Xóa tin tức"
    >
        <div>
            Xác nhận xóa tin <strong>{{ news.title }}</strong>
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
                @click="deleteNews"
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
                news: {},
            };
        },
        methods: {
            open(news) {
                this.news = news;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async deleteNews() {
                try {
                    this.loading = true;
                    if (this.news) {
                        await this.$api.news.delete(this.news.id);
                    }
                    this.close();
                    this.$message.success('Xóa tin tức thành công');
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
