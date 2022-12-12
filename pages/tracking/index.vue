<template>
    <div>
        <div class="card">
            <div class="flex justify-between items-center">
                <ct-page-header text="Tracking đơn hàng" />
            </div>
            <div class="mt-4">
                <a-form-model
                    ref="form"
                    :model="form"
                    :rules="rules"
                    class="space-y-4 w-full grid grid-cols-10 gap-4"
                >
                    <a-form-model-item prop="idTracking" class="col-span-8">
                        <a-input
                            v-model="form.idTracking"
                            size="large"
                            placeholder="Nhập mã vận đơn"
                            @keyup.native.enter="handleSubmit"
                        />
                    </a-form-model-item>

                    <a-button
                        :loading="loading"
                        type="primary"
                        size="large"
                        class="col-span-2 !mt-0"
                        @click="handleSubmit"
                    >
                        Kiểm tra
                    </a-button>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        components: {
        },
        data() {
            return {
                form: {
                    idTracking: '',
                },
            };
        },
        computed: {
        },
        watch: {
        },
        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Tracking đơn hàng',
                link: '/tracking',
            }]);
        },

        methods: {
            async handleSubmit() {
                try {
                    await this.$api.order.tracking({
                        idTracking: this.form.idTracking,
                    });
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },

        head() {
            return {
                title: 'Tracking đơn hàng',
            };
        },
    };
</script>
