<template>
    <a-modal
        v-model="visible"
        width="500px"
        :mask-closable="false"
        destroy-on-close
        title="Xóa tài liệu"
    >
        <div>
            Xác nhận xóa tài liệu <strong>{{ library.name }}</strong>
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
                @click="deleteLibrary"
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
                library: {},
            };
        },

        methods: {
            open(library) {
                this.library = library;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async deleteLibrary() {
                try {
                    this.loading = true;
                    if (this.library) {
                        await this.$api.libraries.delete(this.library.id);
                    }
                    this.close();
                    this.$message.success('Xóa tài liệu thành công');
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
