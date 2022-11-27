<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :title="partner ? 'Chỉnh sửa đối tác' : 'Thêm đối tác'"
    >
        <PartnersForm
            ref="partnersForm"
            :partner="partner"
            @submit="handleSubmit"
        />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.partnersForm.submit()"
            >
                {{ partner ? "Cập nhật" : "Thêm đối tác" }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import PartnersForm from '@/components/partners/Form.vue';

    export default {
        components: {
            PartnersForm,
        },
        data() {
            return {
                visible: false,
                loading: false,
                partner: null,
            };
        },

        methods: {
            open(partner) {
                this.visible = true;
                this.partner = partner;
            },

            close() {
                this.visible = false;
            },
            async handleSubmit(form) {
                if (this.partner) {
                    await this.updatePartner(form);
                } else {
                    await this.createPartner(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createPartner(data) {
                try {
                    this.loading = true;
                    await this.$api.partners.create(data);
                    this.close();
                    this.$message.success('Thêm thành công!');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            async updatePartner(data) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('partners/update', {
                        id: this.partner.id,
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
