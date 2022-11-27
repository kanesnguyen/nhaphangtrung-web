<template>
    <div class="flex flex-wrap flex-col gap-4">
        <div class="card flex items-center justify-between">
            <ct-page-header text="Liên hệ" />
            <div class="flex gap-2">
                <a-button
                    type="primary"
                    class="w-36"
                    ghost
                    @click="$router.push('/')"
                >
                    Hủy
                </a-button>
                <a-button
                    type="primary"
                    class="w-36"
                    :loading="loading"
                    @click="$refs.contactForm.submit()"
                >
                    Cập nhật
                </a-button>
            </div>
        </div>
        <div class="card flex-grow">
            <ContactForm ref="contactForm" :contact="contact" @submit="updateContact" />
        </div>
    </div>
</template>

<script>
    import ContactForm from '@/components/settings/contact/Form.vue';

    export default {
        components: {
            ContactForm,
        },

        async fetch() {
            try {
                const { data: { systemSetting: contact } } = await this.$api.contact.getDetail();
                this.contact = contact;
            } catch (error) {
                this.$handleError(error);
            }
        },

        data() {
            return {
                contact: {},
                loading: false,
            };
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Liên hệ',
                link: '/contact',
            }]);
        },

        methods: {
            async updateContact(form) {
                try {
                    this.loading = true;
                    await this.$api.contact.update(form);
                    this.$message.success('Cập nhật thông tin thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Liên hệ',
            };
        },
    };
</script>
