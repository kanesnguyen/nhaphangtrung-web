<template>
    <div>
        <a-table
            :data-source="products.map(e => ({...e,exchangeRate}))"
            :pagination="false"
            :scroll="{ x: 1200 }"
            :row-key="(row) => row._id"
            :loading="loading"
        >
            <a-table-column
                key="index"
                title="STT"
                align="center"
                :width="60"
                :custom-render="(text, record, index) => index"
            />
            <a-table-column
                key="image"
                title="Sản phẩm"
                :width="400"
                align="center"
            >
                <template #default="product">
                    <div class="flex items-start justify-start gap-2">
                        <img :src="product.image" alt="/" class="rounded-md h-[80px] w-[80px] object-cover mr-2">
                        <div class="flex items-start flex-col text-left truncate">
                            <h5>{{ product.name }}</h5>
                            <p>Mã sản phẩm: {{ product.type }}</p>
                        </div>
                    </div>
                </template>
            </a-table-column>
            <a-table-column
                key="numberProduct"
                title="Số lượng"
                :width="100"
                data-index="numberProduct"
                align="center"
            />
            <a-table-column
                key="exchangeRate"
                title="Tỷ giá"
                :width="80"
                data-index="exchangeRate"
                align="center"
            />
            <a-table-column
                key="totalMoney"
                title="Tổng tiền (VNĐ)"
                align="center"
                :width="150"
            >
                <template #default="product">
                    {{ product.price * product.numberProduct | moneyFormat }}
                </template>
            </a-table-column>
            <a-table-column
                key="status"
                data-index="status"
                title="Trạng thái"
                align="center"
                :width="150"
            >
                <template #default="status">
                    <a-tag :color="STATUS_COLOR[status]">
                        {{ STATUS_LABEL[status] }}
                    </a-tag>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<script>
    import { mapDataFromOptions } from '@/utils/data';
    import { ORDER_STATUS, ORDER_STATUS_OPTIONS } from '@/constants/orders/status';

    export default {
        components: {
        },

        props: {
            products: {
                type: Array,
                default: () => [],
            },
            loading: {
                type: Boolean,
                default: false,
            },
            pagination: {
                type: Object,
                required: false,
            },
            exchangeRate: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                ORDER_STATUS,
                ORDER_STATUS_OPTIONS,
            };
        },
        computed: {
        },

        watch: {
        },
        methods: {
            mapDataFromOptions,
        },
    };
</script>
