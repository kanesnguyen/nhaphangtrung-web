<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header :text="`${project.name}`" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/projects">
                        <a-button>
                            Hủy bỏ
                        </a-button>
                    </nuxt-link>
                    <a-button type="primary" @click="$refs.ProjectForm.submit()">
                        Cập nhật
                    </a-button>
                </div>
            </div>
        </div>

        <div class="card mt-4 h-full !pb-10">
            <ProjectForm
                ref="ProjectForm"
                :project="project"
                :is-edit="true"
                @submit="submitForm"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ProjectForm from '@/components/projects/Form.vue';

    export default {
        components: {
            ProjectForm,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ store, params }) {
            await store.dispatch('projects/fetchDetail', params);
        },

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapState('projects', ['project']),
        },

        watch: {
            '$route.query': {
                handler() {
                    this.fetchData();
                },
            },
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Sản phẩm',
                link: '/projects',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('projects/fetchDetail', this.$route.params);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async submitForm(payload) {
                try {
                    this.loading = true;
                    await this.$api.projects.update(this.project.id, payload);
                    this.$nuxt.refresh();
                    this.$message.success('Chỉnh sửa dự án thành công');
                    this.$router.push('/projects');
                } catch (e) {
                    this.$message.error('Chỉnh sửa dự án thất bại');
                    this.$handleError(e);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Chỉnh sửa dự án',
            };
        },
    };
</script>
