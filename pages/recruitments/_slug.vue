<template>
    <div class="flex flex-col gap-4">
        <div class="card flex flex-wrap justify-between items-center">
            <ct-page-header text="Chỉnh sửa tin tuyển dụng" show-back />
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
                    <i class="fas fa-save mr-2" /> Cập nhật
                </a-button>
            </div>
        </div>
        <RecruitmentForm
            ref="recruitmentForm"
            :recruitment="recruitment"
            class="card flex-grow !p-4"
            @submit="updateRecruitment"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import RecruitmentForm from '@/components/recruitments/Form.vue';

    export default {
        components: {
            RecruitmentForm,
        },

        async fetch() {
            const recruitmentId = this.$route.params.slug?.split('-')?.at?.(-1);
            await this.$store.dispatch('recruitments/fetchDetail', recruitmentId);
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Tin tuyển dụng',
                link: '/recruitments',
            }, {
                label: this.recruitment.title,
                link: `/recruitments/${this.recruitment.slug}-${this.recruitment.id}`,
            }]);
        },

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapState('recruitments', ['recruitment']),
        },

        methods: {
            async updateRecruitment(form) {
                try {
                    this.loading = true;
                    await this.$api.recruitments.update(this.recruitment.id, form);
                    this.$message.success('Chỉnh sửa tin tuyển dụng thành công');
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
                title: `${this.recruitment.title}`,
            };
        },
    };
</script>
