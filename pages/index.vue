<template>
    <div>
        <div class="grid grid-cols-10 gap-4">
            <div class="col-span-7">
                <LineChart />
            </div>
            <div class="col-span-3 pb-4">
                <UserNew />
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            <div class="sm:col-span-6 sm:grid-cols-1 lg:col-span-8 xl:col-span-12 xl:grid-cols-4 grid items-center gap-5">
                <a-spin v-for="item in items" :key="item.title" :spinning="loading">
                    <div class="bg-[#3aa554] duration-150 relative overflow-hidden flex items-center p-6 shadow-md hover:shadow-xl rounded-md bg-gradient-to-r">
                        <i :class="[item.icon]" class="text-4xl text-white" />
                        <span class="ml-5 text-white">
                            <h3 class="text-white uppercase">{{ item.title }}</h3>
                            <span class="text-4xl mr-1">{{ item.amount }}</span> {{ item.label }}
                        </span>
                        <span class="absolute rounded-full -right-28 -top-16 w-44 h-44 bg-white opacity-30" />
                        <span class="absolute rounded-full -right-6 top-14 w-44 h-44 bg-white opacity-40" />
                    </div>
                </a-spin>
            </div>
            <div class="sm:col-span-12 grid grid-cols-12 items-stretch gap-5 xl:col-span-12 ">
                <DashboardChart
                    title="Thống kê truy cập"
                    tooltip="Lượng người truy cập thông qua các trang mạng xã hội."
                    :labels="['Facebook', 'Instagram', 'Tiktok']"
                />
                <DashboardChart
                    title="Thống kê lượt tương tác"
                    tooltip="Lượt tương tác đến từ những lần quẹt thẻ của bạn."
                    :labels="['Follow', 'View', 'Match']"
                />
                <DashboardChart
                    title="Thống kê thiết bị"
                    tooltip="Thống kê thiết bị bạn đang sử dụng"
                    :labels="['GenDoor', 'GenLight', 'GenSmartKey']"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import DashboardChart from '@/components/dashboard/Chart.vue';
    import LineChart from '@/components/dashboard/LineChart.vue';
    import UserNew from '@/components/dashboard/UserNew.vue';

    export default {
        components: {
            DashboardChart,
            LineChart,
            UserNew,
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
            items() {
                return [{
                    title: 'Lượt Xem',
                    amount: 1,
                    icon: 'fas fa-users',
                    label: 'lượt',
                }, {
                    title: 'Đã lưu',
                    amount: 2,
                    icon: 'fas fa-chalkboard',
                    label: 'liên hệ',
                }, {
                    title: 'Liên kết',
                    amount: 3,
                    icon: 'fas fa-microchip',
                    label: 'thiết bị',
                }, {
                    title: 'Liên kết',
                    amount: 3,
                    icon: 'fas fa-microchip',
                    label: 'thiết bị',
                }];
            },
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
            moment,
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
