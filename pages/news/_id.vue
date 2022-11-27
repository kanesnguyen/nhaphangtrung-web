<template>
    <div class="flex flex-col gap-4">
        <div class="card flex flex-wrap justify-between items-center">
            <ct-page-header text="Chỉnh sửa tin tức" show-back />
            <div class="flex gap-2">
                <nuxt-link to="/news">
                    <a-button class="w-36" type="primary" ghost>
                        Hủy bỏ
                    </a-button>
                </nuxt-link>
                <a-button
                    class="w-36"
                    :loading="loading"
                    type="primary"
                    @click="$refs.newsForm.submit()"
                >
                    <i class="fas fa-save mr-2" /> Cập nhật
                </a-button>
            </div>
        </div>

        <UpdateForm
            ref="newsForm"
            class="card flex-grow !p-4"
            :news="newsDetail?.news"
            @submit="updateNews"
        />
    </div>
</template>

<script>
    import UpdateForm from '@/components/news/Form.vue';
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
            ...mapState('news', ['newsDetail']),
        },
        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Tin tức',
                link: '/news',
            }, {
                label: 'Cập nhật tin tức',
                link: '/news/update',
            }]);
            this.fetchData();
        },

        methods: {
            _get,

            // fetch detail data
            async fetchData() {
                try {
                    this.fetchLoading = true;
                    await this.$store.dispatch('news/fetchDetail', this.$route.params.id);
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
                    await this.$api.news.update(this.$route.params.id, form);
                    this.$message.success('Chỉnh sửa tin tức thành công');
                    this.$router.push('/news');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
            handleCancel() {
                this.$router.push('/news');
            },

        },
        head() {
            return {
                title: 'Cập nhật tin tức',
            };
        },
    };
</script>
