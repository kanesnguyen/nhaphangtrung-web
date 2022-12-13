<template>
    <div>
        <FeedbackFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách khiếu nại" />
                <button @click="$refs.feedbackDialog.open()">
                    <a-button type="primary">
                        <i class="fas fa-plus mr-2" /> Khiếu nại
                    </a-button>
                </button>
            </div>
            <FeedbackTable
                class="mt-4"
                :feedbacks="feedbacks"
                :loading="loading"
                :pagination="pagination"
            />
            <FeedbackDialog ref="feedbackDialog" />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapDataFromOptions } from '@/utils/data';
    import FeedbackTable from '@/components/feedbacks/Table.vue';
    import FeedbackFilter from '@/components/feedbacks/Filter.vue';
    import FeedbackDialog from '@/components/feedbacks/Dialog.vue';

    export default {
        components: {
            FeedbackTable,
            FeedbackFilter,
            FeedbackDialog,
        },
        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                loading: false,
            };
        },
        computed: {
            ...mapState('feedbacks', ['feedbacks', 'pagination']),
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
                label: 'Danh sách khiếu nại',
                link: '/feedbacks',
            }]);
        },

        methods: {
            mapDataFromOptions,

            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('feedbacks/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Danh sách khiếu nại',
            };
        },
    };
</script>
