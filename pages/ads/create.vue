<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="flex flex-col gap-4">
        <div class="card flex flex-wrap justify-between items-center">
            <ct-page-header text="Thêm quảng cáo" show-back />
            <div class="flex gap-2">
                <nuxt-link to="/ads">
                    <a-button class="w-36" type="primary" ghost>
                        Hủy bỏ
                    </a-button>
                </nuxt-link>
                <a-button
                    class="w-36"
                    :loading="loading"
                    type="primary"
                    @click="$refs.adsForm.submit()"
                >
                    <i class="fas fa-save mr-2" /> Lưu
                </a-button>
            </div>
        </div>

        <NewsForm ref="adsForm" class="card flex-grow !p-4" @submit="createNews" />
    </div>
</template>

<script>
    import NewsForm from '@/components/ads/Form.vue';

    export default {
        components: { NewsForm },
        data() {
            return {
                loading: false,
            };
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Quảng cáo',
                link: '/ads',
            }, {
                label: 'Thêm mới quảng cáo',
                link: '/ads/create',
            }]);
        },

        methods: {
            async createNews(form) {
                try {
                    this.loading = true;
                    await this.$api.ads.create(form);
                    this.$message.success('Thêm mới quảng cáo thành công');
                    this.$router.push('/ads');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            handleCancel() {
                this.$router.push('/ads');
            },
        },
        head() {
            return {
                title: 'Thêm mới quảng cáo',
            };
        },
    };
</script>
