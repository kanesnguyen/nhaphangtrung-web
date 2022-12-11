<template>
    <div class="flex flex-col gap-4">
        <div class="card flex flex-wrap justify-between items-center">
            <ct-page-header text="Chỉnh sửa dịch vụ" show-back />
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
                    <i class="fas fa-save mr-2" /> Cập nhật
                </a-button>
            </div>
        </div>

        <ServiceForm
            ref="ServiceForm"
            class="card flex-grow !p-4"
            :service="service"
            @submit="updateService"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ServiceForm from '@/components/services/Form.vue';
    import _get from 'lodash/get';

    export default {
        components: { ServiceForm },

        async fetch() {
            this.fetchData();
        },

        async asyncData({ store, params }) {
            await store.dispatch('services/fetchDetail', params.id);
        },

        data() {
            return {
                fetchLoading: true,
                loading: false,
            };
        },
        computed: {
            ...mapState('services', ['service']),
        },
        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Dịch vụ',
                link: '/',
            }, {
                label: 'Cập nhật dịch vụ',
                link: `/services/${this.service.id}`,
            }]);
        },

        methods: {
            _get,
            async fetchData() {
                try {
                    this.fetchLoading = true;
                    await this.$store.dispatch('services/fetchDetail', this.$route.params.id);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.fetchLoading = false;
                }
            },
            async updateService(form) {
                try {
                    this.loading = true;
                    await this.$api.services.update(this.$route.params.id, form);
                    this.$message.success('Chỉnh sửa dịch vụ thành công');
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
                title: 'Cập nhật dịch vụ | Minh Long CMS',
            };
        },
    };
</script>
