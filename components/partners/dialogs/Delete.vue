<template>
    <a-modal
        v-model="visible"
        width="500px"
        :mask-closable="false"
        destroy-on-close
        title="Xóa đối tác"
    >
        <div>
            Xác nhận xóa đối tác <strong>{{ partner.name }}</strong>
        </div>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="danger"
                @click="deletePartner"
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
                partner: {},
            };
        },

        methods: {
            open(partner) {
                this.partner = partner;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async deletePartner() {
                try {
                    this.loading = true;
                    if (this.partner) {
                        await this.$api.partners.delete(this.partner.id);
                    }
                    this.close();
                    this.$message.success('Xóa đối tác thành công');
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
