<template>
    <div class="flex items-center justify-center flex-col">
        <img src="" alt="image"/>
        <h2>Tính năng đang cập nhật</h2>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Danh sách Quản lý',
                link: '/users/manager',
            }]);
        },
        head() {
            return {
                title: 'Danh sách Quản lý',
            };
        },
    };
</script>
