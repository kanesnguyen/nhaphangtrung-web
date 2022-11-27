<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Thêm dự án" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/projects">
                        <a-button>
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button type="primary" @click="$refs.ProjectForm.submit()">
                        Thêm dự án
                    </a-button>
                </div>
            </div>
        </div>

        <div class="card mt-4 h-full !pb-10">
            <ProjectForm
                ref="ProjectForm"
                :is-edit="true"
                @submit="submitForm"
            />
        </div>
    </div>
</template>

<script>
    import ProjectForm from '@/components/projects/Form.vue';

    export default {
        components: {
            ProjectForm,
        },

        data() {
            return {
                loading: false,
            };
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Dự án',
                link: '/projects',
            }]);
        },

        methods: {
            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.projects.create(payload);
                    this.$nuxt.refresh();
                    this.$message.success('Thêm mới dự án thành công.');
                } catch (e) {
                    this.$message.error('Thêm mới dự án thất bại!');
                    this.$handleError(e);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Thêm mới dự án',
            };
        },
    };
</script>
