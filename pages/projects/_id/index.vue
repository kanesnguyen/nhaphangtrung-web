<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header show-back :text="`${project.name}`" />
                <div class="flex gap-x-5">
                    <nuxt-link :to="`/projects/${project.id}/edit`">
                        <a-button type="primary">
                            Chỉnh sửa dự án
                        </a-button>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <div class="card mt-4 h-full !pb-10">
            <ProjectForm
                ref="ProjectForm"
                :is-edit="false"
                :project="project"
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
                label: 'Dự án',
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
        },

        head() {
            return {
                title: 'Chi tiết dự án',
            };
        },
    };
</script>
