<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Quy định thanh toán" />
            </div>
            <div class="mt-3">
                <p>
                    Để kết thúc quá trình đặt hàng, quý khách <b>thanh toán</b> một khoản tiền đặt cọc trước cho <b>NHẬP HÀNG TRUNG</b> để chúng tôi thực hiện giao dịch mua hàng theo yêu cầu trên đơn hàng.
                </p>
                <p>
                    - Số tiền đặt cọc trước bao gồm:
                </p>
                <ul>
                    <li><strong>+ Tiền hàng</strong>: giá sản phẩm trên website đặt hàng Trung Quốc, số tiền này <b>NHẬP HÀNG TRUNG</b> thu hộ cho nhà cung cấp. </li>
                    <li><strong>+ Phí dịch vụ</strong>: là phí khách hàng trả cho <b>NHẬP HÀNG TRUNG</b> để tiến hành thu mua theo đơn hàng đã đặt.</li>
                </ul>
            </div>
        </div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Hình thức thanh toán" />
            </div>
            <div class="mt-3">
                <h6>
                    <b>1. Thanh toán trực tiếp</b>
                </h6>
                <p>
                    - Khách hàng có thể đặt cọc trực tiếp tại địa chỉ:
                </p>
                <ul>
                    <li><strong>+ Khu vực miền Bắc</strong>: Số 66 - Ngõ 66 P. Dịch Vọng Hậu, Dịch Vọng Hậu, Cầu Giấy, Hà Nội </li>
                    <li><strong>+ Khu vực miền Nam</strong>: Trường Sơn, Phường 2, Tân Bình, Hồ Chí Minh</li>
                </ul>
                <h6>
                    <b>2. Chuyển khoản</b>
                </h6>
                <p>
                    - Nội dung chuyển khoản theo cú pháp <strong>NAP + Username + SĐT</strong>
                </p>
            </div>
        </div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Thông tin chuyển khoản" />
            </div>
            <div class="mt-3">
                <div class="flex justify-between items-center">
                    <div>
                        <h2>Số tài khoản: <span class="px-2 py-1 rounded-md bg-[#f6b900] text-white">90898989899</span></h2>
                        <h2>Chủ tài khoản: <span class="px-2 py-1 rounded-md bg-[#f6b900] text-white">NGUYEN HUY HOANG</span></h2>
                        <h2>Ngân hàng: <span class="px-2 py-1 rounded-md bg-[#f6b900] text-white">MB BANK</span></h2>
                    </div>
                    <img class="w-28" src="/images/mbbank.jpg" alt="">
                </div>
            </div>
            <div class="pt-3 " style="border-top: 1px solid #dcdcdc">
                <div class="flex justify-between items-center">
                    <div>
                        <h2>Số tài khoản: <span class="px-2 py-1 rounded-md bg-[#f6b900] text-white">19039533303018</span></h2>
                        <h2>Chủ tài khoản: <span class="px-2 py-1 rounded-md bg-[#f6b900] text-white">NGUYEN HUY HOANG</span></h2>
                        <h2>Ngân hàng: <span class="px-2 py-1 rounded-md bg-[#f6b900] text-white">TECHCOMBANK</span></h2>
                    </div>
                    <img class="w-28" src="/images/techcombank.webp" alt="">
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Xác nhận chuyển khoản" />
            </div>
            <div class="mt-4">
                <a-form-model
                    ref="form"
                    :model="form"
                    :rules="rules"
                    class="space-y-4 w-full"
                >
                    <a-form-model-item prop="account" label="Đã chuyển vào tài khoản:">
                        <a-select
                            v-model="form.account"
                            class="w-full"
                            placeholder="Chọn tài khoản"
                            show-search
                        >
                            <a-select-option
                                v-for="(item, index) in RECHARGE_STATUS_OPTIONS"
                                :key="index"
                                :value="item.value"
                            >
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item prop="money" label="Số tiền đã chuyển:">
                        <a-input
                            v-model="form.money"
                            size="large"
                            class="w-full"
                            placeholder="Nhập số tiền đã chuyển (VNĐ)"
                        />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Nội dung" prop="description">
                        <a-textarea
                            v-model="form.description"
                            placeholder="Nội dung"
                            :auto-size="{ minRows: 4, maxRows: 5 }"
                        />
                    </a-form-model-item>
                    <a-button
                        :loading="loading"
                        type="primary"
                        size="large"
                        class="col-span-2"
                        @click="handleSubmit"
                    >
                        Gửi xác nhận
                    </a-button>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        RECHARGE_STATUS, RECHARGE_STATUS_OPTIONS,
    } from '@/constants/recharges/status';

    export default {
        components: {
        },
        data() {
            return {
                RECHARGE_STATUS,
                RECHARGE_STATUS_OPTIONS,
                form: {
                    account: '',
                    money: 0,
                    description: '',
                },
                loading: false,
                rules: {
                    account: [{
                        required: true, message: 'Vui lòng chọn ngân hàng', trigger: 'blur',
                    }],
                    money: [{
                        required: true, message: 'Vui lòng nhập số tiền', trigger: 'blur',
                    }],
                    description: [{
                        required: true, message: 'Vui lòng mô tả chi tiết vấn đề', trigger: 'blur',
                    }],
                },
            };
        },
        computed: {
            STATUS_LABEL() {
                return this.mapDataFromOptions(RECHARGE_STATUS_OPTIONS, 'value', 'label');
            },

            STATUS_COLOR() {
                return this.mapDataFromOptions(RECHARGE_STATUS_OPTIONS, 'value', 'color');
            },
        },
        watch: {
        },
        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Nạp tiền',
                link: '/recharge',
            }]);
        },

        methods: {
            async handleSubmit() {
                try {
                    if (this.form.account !== '' && this.form.description !== '' && this.form.money !== 0) {
                        this.loading = true;
                        await this.$api.recharges.create(this.form);
                        this.loading = false;
                        this.$message.success('Gửi yêu cầu thành công');
                    }
                    this.form = {
                        account: '',
                        money: 0,
                        description: '',
                    };
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },

        head() {
            return {
                title: 'Nạp tiền',
            };
        },
    };
</script>
