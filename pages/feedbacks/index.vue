<template>
    <div>
        <FeedbackFilter class="card" />
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Feedback khách hàng" />
                <a-button type="primary" @click="$refs.feedbackDialog.open()">
                    Thêm feedback
                </a-button>
            </div>
            <FeedbackTable
                class="mt-4"
                :feedbacks="feedbacks"
                :loading="loading"
                :pagination="pagination"
            />
        </div>
        <FeedbackDialog ref="feedbackDialog" />
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
                label: 'Phản hồi',
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
                title: 'Phản hồi',
            };
        },
    };
</script>
