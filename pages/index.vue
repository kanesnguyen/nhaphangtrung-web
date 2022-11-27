<template>
    <div>
        <h1>Tổng quát</h1>
    </div>
</template>

<script>

    export default {
        components: {
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
                label: 'Tổng quát',
                link: '/',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    // await this.$store.dispatch('services/fetchAll', this.$route.query);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Tổng quát | JOURNAL CMS',
            };
        },
    };
</script>
