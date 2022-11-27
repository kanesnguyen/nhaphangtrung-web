<template>
    <div class="flex flex-col gap-4">
        <div class="card flex flex-wrap justify-between items-center">
            <ct-page-header text="Thêm mới tin tuyển dụng" show-back />
            <div class="flex gap-2">
                <nuxt-link to="/recruitments">
                    <a-button class="w-36" type="primary" ghost>
                        Hủy
                    </a-button>
                </nuxt-link>
                <a-button
                    class="w-36"
                    :loading="loading"
                    type="primary"
                    @click="$refs.recruitmentForm.submit()"
                >
                    <i class="fas fa-save mr-2" /> Lưu
                </a-button>
            </div>
        </div>
        <RecruitmentForm ref="recruitmentForm" class="card flex-grow !p-4" @submit="createRecruitment" />
    </div>
</template>

<script>
    import RecruitmentForm from '@/components/recruitments/Form.vue';

    export default {
        components: {
            RecruitmentForm,
        },

        data() {
            return {
                loading: false,
            };
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Tin tuyển dụng',
                link: '/recruitments',
            }, {
                label: 'Thêm mới',
                link: '/recruitments/create',
            }]);
        },

        methods: {
            async createRecruitment(form) {
                try {
                    this.loading = true;
                    await this.$api.recruitments.create(form);
                    this.$message.success('Thêm mới tin tuyển dụng thành công');
                    this.$router.push('/recruitments');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Thêm mới tin tuyển dụng',
            };
        },
    };
</script>
