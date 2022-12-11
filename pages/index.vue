<template>
    <div>
        <h1>Tổng quát</h1>
    </div>
</template>

<script>

    export default {
        components: {
        },

        data() {
            return {
            };
        },

        computed: {
        },

        watch: {
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Tổng quát',
                link: '/',
            }]);
        },

        methods: {
        },

        head() {
            return {
                title: 'Tổng quát | Minh Long CMS',
            };
        },
    };
</script>
