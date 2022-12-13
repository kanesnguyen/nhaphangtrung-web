<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Tổng quan đơn hàng" />
            </div>
            <div class="mt-3">
                <div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Trạng thái đơn hàng: </h5>
                        </div>
                        <div v-if="order">
                            <h5>{{ order.status }}</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Kho nhận: </h5>
                        </div>
                        <div v-if="order">
                            <h5>{{ order.receivingWarehouse }}</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div>
                <div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Tổng tiền đơn hàng: </h5>
                        </div>
                        <div v-if="order&& order.totalMoney">
                            <h5>{{ order.totalMoney | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Phương thức VC: </h5>
                        </div>
                        <div v-if="order&& order.shipping">
                            <h5>{{ order.shipping.method }}</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div><div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Số tiền phải cọc: </h5>
                        </div>
                        <div v-if="order&& order.totalMoney && order.deposit">
                            <h5>{{ (order.deposit * order.totalMoney / 100) | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Đóng gỗ: </h5>
                        </div>
                        <div>
                            <h5>Không</h5>
                        </div>
                    </div>
                </div><div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Đã thanh toán: </h5>
                        </div>
                        <div v-if="order&& order.depositAmount">
                            <h5>{{ order.depositAmount | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Phí đặc biệt 1: </h5>
                        </div>
                        <div>
                            <h5>Không</h5>
                        </div>
                    </div>
                </div><div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Còn lại: </h5>
                        </div>
                        <div v-if="order&& order.depositRemaining">
                            <h5 class="font-bold text-[red]">{{ order.depositRemaining | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Phí đặc biệt 1: </h5>
                        </div>
                        <div>
                            <h5>Không</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Thông tin đơn hàng" />
            </div>
            <div class="mt-3">
                <div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Tiền hàng: </h5>
                        </div>
                        <div v-if="order&& order.totalMoney">
                            <h5>{{ order.totalMoney | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Tổng tiền đơn hàng: </h5>
                        </div>
                        <div v-if="order && order.totalMoney && order.shipping">
                            <h5>{{ (order.totalMoney + order.shipping.fee) | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div>
                <div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Phí mua hàng: </h5>
                        </div>
                        <div v-if="order&& order.shipping">
                            <h5>{{ order.shipping.fee | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Số tiền phải cọc: </h5>
                        </div>
                        <div v-if="order&& order.totalMoney && order.deposit">
                            <h5>{{ (order.deposit * order.totalMoney / 100) | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div><div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Phí đóng gỗ: </h5>
                        </div>
                        <div>
                            <h5>{{ 0 | moneyFormat }} VNĐ</h5>
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Đã thanh toán: </h5>
                        </div>
                        <div v-if="order&& order.depositAmount">
                            <h5>{{ order.depositAmount | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div><div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Phí ship nội địa TQ: </h5>
                        </div>
                        <div>
                            <h5>{{ 0 | moneyFormat }} VNĐ</h5>
                        </div>
                    </div>
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Còn lại: </h5>
                        </div>
                        <div v-if="order&& order.depositRemaining && order.shipping">
                            <h5 class="font-bold text-[red]">{{ order.depositRemaining + order.shipping.fee | moneyFormat }} VNĐ</h5>
                        </div>
                        <div v-else class="animate-pulse">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div><div class=" grid grid-cols-2 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-2" style="border-bottom: 1px solid #cdcdcd">
                        <div>
                            <h5>Phí vận chuyển TQVN: </h5>
                        </div>
                        <div>
                            <h5>{{ 0 | moneyFormat }} VNĐ</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Thông tin khách hàng" />
            </div>
            <div class="mt-3">
                <div class=" grid grid-cols-1 gap-16">
                    <div class="col-span-10 py-2 px-3 grid grid-cols-10" style="border-bottom: 1px solid #cdcdcd">
                        <div class="col-span-3">
                            <h5>Khách hàng: </h5>
                        </div>
                        <div v-if="order&& order.customer" class="col-span-7">
                            <h5>{{ order.customer.name }}</h5>
                        </div>
                        <div v-else class="animate-pulse col-span-7">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div>
                <div class=" grid grid-cols-1 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-10" style="border-bottom: 1px solid #cdcdcd">
                        <div class="col-span-3">
                            <h5>Địa chỉ: </h5>
                        </div>
                        <div v-if="order&& order.customer" class="col-span-7">
                            <h5>{{ order.customer.address }}</h5>
                        </div>
                        <div v-else class="animate-pulse col-span-7">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div><div class=" grid grid-cols-1 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-10" style="border-bottom: 1px solid #cdcdcd">
                        <div class="col-span-3">
                            <h5>Email: </h5>
                        </div>
                        <div v-if="order&& order.customer" class="col-span-7">
                            <h5>{{ order.customer.email }}</h5>
                        </div>
                        <div v-else class="animate-pulse col-span-7">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div><div class=" grid grid-cols-1 gap-16">
                    <div class="col-span-1 py-2 px-3 grid grid-cols-10" style="border-bottom: 1px solid #cdcdcd">
                        <div class="col-span-3">
                            <h5>Số điện thoại: </h5>
                        </div>
                        <div v-if="order&& order.customer" class="col-span-7">
                            <h5>{{ order.customer.phone }}</h5>
                        </div>
                        <div v-else class="animate-pulse col-span-7">
                            <div class="h-4 w-full bg-[#c5c5c5] rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Danh sách sản phẩm" />
            </div>
            <div class="mt-4">
                <Table :products="order.products" :exchangeRate="order.exchangeRate" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Table from '@/components/orders/_id/Table.vue';

    export default {
        components: {
            Table,
        },
        async fetch() {
            await this.fetchData();
        },
        data() {
            return {
                form: {
                },
                data: [],
                options: [],
            };
        },
        computed: {
            ...mapState('orders', ['order']),
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
                label: 'Chi tiết đơn hàng',
                link: '/orders',
            }]);
        },

        methods: {
            async fetchData() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('orders/fetchDetail', this.$route.params.id);
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },

        head() {
            return {
                title: 'Chi tiết đơn hàng',
            };
        },
    };
</script>
