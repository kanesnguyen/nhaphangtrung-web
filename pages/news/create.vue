<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="flex flex-col gap-4">
        <div class="card flex flex-wrap justify-between items-center">
            <ct-page-header text="Thêm tin tức" show-back />
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
                    <i class="fas fa-save mr-2" /> Lưu
                </a-button>
            </div>
        </div>

        <NewsForm ref="newsForm" class="card flex-grow !p-4" @submit="createNews" />
    </div>
</template>

<script>
    import NewsForm from '@/components/news/Form.vue';

    export default {
        components: { NewsForm },
        data() {
            return {
                loading: false,
            };
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Tin tức',
                link: '/news',
            }, {
                label: 'Thêm mới tin tức',
                link: '/news/create',
            }]);
        },

        methods: {
            async createNews(form) {
                try {
                    this.loading = true;
                    await this.$api.news.create(form);
                    this.$message.success('Thêm mới tin tức thành công');
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
                title: 'Thêm mới tin tức',
            };
        },
    };
</script>
