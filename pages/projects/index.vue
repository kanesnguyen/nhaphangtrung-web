<template>
    <div>
        <ProjectsFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách dự án" />
                <nuxt-link to="/projects/create">
                    <a-button type="primary">
                        Thêm dự án mới
                    </a-button>
                </nuxt-link>
            </div>
            <ProjectsTable
                class="mt-4"
                :projects="projects"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import { STATUS, STATUS_OPTIONS } from '@/constants/projects/status';
    import ProjectsTable from '@/components/projects/Table.vue';
    import ProjectsFilter from '@/components/projects/Filter.vue';

    export default {
        components: {
            ProjectsTable,
            ProjectsFilter,
        },

        async fetch() {
            await this.fetchData();
        },

        async asyncData({ store, query }) {
            await store.dispatch('projects/fetchAll', query);
        },

        data() {
            return {
                STATUS,
                STATUS_OPTIONS,
                loading: false,
            };
        },

        computed: {
            ...mapState('projects', ['projects', 'pagination']),
            STATUS_LABEL() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(STATUS_OPTIONS, 'value', 'color');
            },
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('projects/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Dự án',
            };
        },
    };
</script>
