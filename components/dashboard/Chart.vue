<template>
    <div class="relative col-span-12 sm:col-span-12 lg:col-span-6 xl:col-span-4 bg-white rounded-md shadow-light">
        <span class="absolute z-0 text-2xl sm:text-3xl text-prim-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {{ totalData }}
        </span>
        <div class="flex items-center px-4 py-2 border-b border-gray-200">
            <h4 class="flex-1 mb-0">
                {{ title }}
            </h4>
            <a-tooltip placement="bottom">
                <template slot="title">
                    <span class="text-xs">{{ tooltip }}</span>
                </template>
                <i class="fa-solid fa-circle-info text-xl leading-5 text-gray-500 hover:text-prim-900" />
            </a-tooltip>
        </div>
        <div v-if="chartDataSet.length" class="relative px-4 py-2">
            <Doughnut
                :data="data"
                class="max-w-[300px] mx-auto"
                :options="customChart || chartOptions"
            />
        </div>
        <div v-else class="px-4 py-2 relative">
            <Doughnut
                class="max-w-[300px] mx-auto"
                :data="emptyData.data"
                :options="emptyData.options"
            />
            <span class="absolute text-lg text-gray-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No Data
            </span>
        </div>
    </div>
</template>

<script>
    import Doughnut from '@/components/shared/Chart';

    export default {
        components: {
            Doughnut,
        },

        props: {
            dataChart: {
                type: Array,
            },
            totalData: {
                type: String,
                default: '10',
            },
            customChart: {
                type: Object,
            },
            customData: {
                type: Object,
            },
            tooltip: {
                type: String,
                default: '/',
            },
            title: {
                type: String,
                default: 'Record',
            },
            labels: {
                type: Array,
            },
        },

        data() {
            return {
                chartOptions: {
                    responsive: true,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            align: 'left',
                            boxWidth: 12,
                            padding: 20,
                        },
                    },
                    tooltips: {
                        displayColors: false,
                        xPadding: 15,
                        yPadding: 10,
                    },
                },
                emptyData: {
                    data: {
                        labels: ['No data', 'No data', 'No data'],
                        datasets: [
                            {
                                backgroundColor: ['#f2f2f2', '#f2f2f2', '#f2f2f2'],
                                data: [1, 1, 1],
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        tooltips: {
                            enabled: false,
                        },
                    },
                },
                chartDataSet: this.dataChart || [1, 1, 1],
            };
        },

        computed: {
            data() {
                return {
                    labels: this.labels,
                    datasets: [
                        {
                            backgroundColor: ['#ff6b6b', '#6bcb77', '#4d96ff'],
                            data: this.chartDataSet || [1, 1, 1],
                        },
                    ],
                };
            },
        },

        watch: {
            dataChart() {
                this.chartDataSet = this.dataChart || [1, 1, 1];
            },
        },
    };
</script>

<style lang="scss">
    .chartjs-render-monitor {
        @apply relative z-10;
    }
</style>
