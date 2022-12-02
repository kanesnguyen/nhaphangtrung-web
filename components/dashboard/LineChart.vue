<template>
    <div>
        <div class="bg-[#fff]  rounded-md w-full py-3 mb-4">
            <h4 class="text-center mb-3">
                Thống kê tổng quát
            </h4>
            <div class=" w-full h-[300px] p-3">
                <line-chart
                    style="height: 100%"
                    :chart-data="purpleLineChart.chartData"
                    :gradient-colors="purpleLineChart.gradientColors"
                    :gradient-stops="purpleLineChart.gradientStops"
                    :extra-options="purpleLineChart.extraOptions"
                />
            </div>
            <div class="flex gap-4 justify-center">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <p class="mb-0">Lượt xem bài viết</p>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-[#3aa554] rounded-full"></div>
                    <p class="mb-0">Lượt click Ads</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import LineChart from '@/components/shared/LineChart';
    import * as chartConfigs from '@/configs/chartConfig';

    const config = {
        colors: {
            default: '#344675',
            primary: '#42b883',
            info: '#1d8cf8',
            danger: '#fd5d93',
            teal: '#00d6b4',
            primaryGradient: ['rgba(76, 211, 150, 0.1)', 'rgba(53, 183, 125, 0)', 'rgba(119,52,169,0)'],
        },
    };

    const now = new Date();
    const length = 15;

    const daysArray = Array.from({ length }, (_, days) => {
        const day = new Date(now);
        day.setDate(now.getDate() - days);
        return day;
    });
    const analystic = [
        {
            view: 106,
            clickAds: 30,
        }, {
            view: 134,
            clickAds: 24,
        }, {
            view: 162,
            clickAds: 32,
        }, {
            view: 199,
            clickAds: 37,
        }, {
            view: 168,
            clickAds: 24,
        }, {
            view: 142,
            clickAds: 34,
        }, {
            view: 176,
            clickAds: 23,
        }, {
            view: 163,
            clickAds: 22,
        }, {
            view: 266,
            clickAds: 37,
        }, {
            view: 256,
            clickAds: 26,
        }, {
            view: 194,
            clickAds: 32,
        }, {
            view: 267,
            clickAds: 35,
        }, {
            view: 120,
            clickAds: 31,
        }, {
            view: 189,
            clickAds: 40,
        }, {
            view: 292,
            clickAds: 90,
        },
    ];
    export default {
        components: {
            LineChart,
        },
        data() {
            return {
                chartOptions: {
                    responsive: true,
                },
                purpleLineChart: {
                    extraOptions: chartConfigs.purpleChartOptions,
                    chartData: {
                        labels: daysArray.reverse().map((e) => moment(e).format('DD/MM')),
                        datasets: [{
                                       label: 'Lượt xem bài viết',
                                       fill: true,
                                       borderColor: '#ff6b6b',
                                       borderWidth: 2,
                                       borderDash: [],
                                       borderDashOffset: 0.0,
                                       pointBackgroundColor: '#ff6b6b',
                                       pointBorderColor: 'rgba(255,255,255,0)',
                                       pointHoverBackgroundColor: '#ff6b6b',
                                       pointBorderWidth: 20,
                                       pointHoverRadius: 4,
                                       pointHoverBorderWidth: 15,
                                       pointRadius: 4,
                                       data: analystic.map((e) => e.view),
                                   },
                                   {
                                       label: 'Lượt click Ads',
                                       fill: true,
                                       borderColor: '#3aa554',
                                       borderWidth: 2,
                                       borderDash: [],
                                       borderDashOffset: 0.0,
                                       pointBackgroundColor: '#3aa554',
                                       pointBorderColor: 'rgba(255,255,255,0)',
                                       pointHoverBackgroundColor: '#3aa554',
                                       pointBorderWidth: 20,
                                       pointHoverRadius: 4,
                                       pointHoverBorderWidth: 15,
                                       pointRadius: 4,
                                       data: analystic.map((e) => e.clickAds),
                                   }],
                    },
                    gradientColors: config.colors.primaryGradient,
                    gradientStops: [1, 0.2, 0],
                },
            };
        },

    };
</script>
