<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="flex flex-col gap-4">
        <div class="card flex flex-wrap justify-between items-center">
            <ct-page-header text="Thêm mới dịch vụ" show-back />
            <div class="flex gap-2">
                <nuxt-link to="/">
                    <a-button class="w-36" type="primary" ghost>
                        Hủy bỏ
                    </a-button>
                </nuxt-link>
                <a-button
                    class="w-36"
                    :loading="loading"
                    type="primary"
                    @click="$refs.ServiceForm.submit()"
                >
                    <i class="fas fa-save mr-2" /> Lưu
                </a-button>
            </div>
        </div>

        <ServiceForm ref="ServiceForm" class="card flex-grow !p-4" @submit="createServices" />
    </div>
</template>

<script>
    import ServiceForm from '@/components/services/Form.vue';

    export default {
        components: { ServiceForm },
        data() {
            return {
                loading: false,
            };
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Dịch vụ',
                link: '/',
            }, {
                label: 'Thêm mới dịch vụ',
                link: '/services/create',
            }]);
        },

        methods: {
            async createServices(form) {
                try {
                    this.loading = true;
                    await this.$api.services.create(form);
                    this.$message.success('Thêm mới dịch vụ thành công');
                    this.$router.push('/');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            handleCancel() {
                this.$router.push('/');
            },
        },
        head() {
            return {
                title: 'Thêm mới dịch vụ | EIH CMS',
            };
        },
    };
</script>
