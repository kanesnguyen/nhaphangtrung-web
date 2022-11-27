<template>
    <div class="flex flex-col gap-4">
        <div class="card flex flex-wrap justify-between items-center">
            <ct-page-header text="Chỉnh sửa quảng cáo" show-back />
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
                    <i class="fas fa-save mr-2" /> Cập nhật
                </a-button>
            </div>
        </div>

        <UpdateForm
            ref="adsForm"
            class="card flex-grow !p-4"
            :ads="adsDetail?.ads"
            @submit="updateNews"
        />
    </div>
</template>

<script>
    import UpdateForm from '@/components/ads/Form.vue';
    import _get from 'lodash/get';
    import { mapState } from 'vuex';

    export default {
        components: { UpdateForm },

        data() {
            return {
                fetchLoading: true,
                loading: false,
            };
        },
        computed: {
            ...mapState('ads', ['adsDetail']),
        },
        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Quảng cáo',
                link: '/ads',
            }, {
                label: 'Cập nhật quảng cáo',
                link: '/ads/update',
            }]);
            this.fetchData();
        },

        methods: {
            _get,

            // fetch detail data
            async fetchData() {
                try {
                    this.fetchLoading = true;
                    await this.$store.dispatch('ads/fetchDetail', this.$route.params.id);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.fetchLoading = false;
                }
            },

            // update data
            async updateNews(form) {
                try {
                    this.loading = true;
                    await this.$api.ads.update(this.$route.params.id, form);
                    this.$message.success('Chỉnh sửa quảng cáo thành công');
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
                title: 'Cập nhật quảng cáo',
            };
        },
    };
</script>
