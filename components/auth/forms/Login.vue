<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        class="space-y-4 w-full"
    >
        <a-form-model-item label="Tài khoản" prop="email">
            <a-input
                v-model="form.email"
                size="large"
                placeholder="Nhập tên đăng nhập"
                @keyup.native.enter="handleSubmit"
            />
        </a-form-model-item>
        <a-form-model-item label="Mật khẩu" prop="password">
            <a-input-password
                v-model="form.password"
                size="large"
                placeholder="Nhập mật khẩu"
                @keyup.native.enter="handleSubmit"
            />
        </a-form-model-item>
        <a-button
            :loading="loading"
            type="primary"
            size="large"
            class="w-full"
            @click="handleSubmit"
        >
            Đăng nhập
        </a-button>
        <div class="mt-2 flex justify-end">
            <nuxt-link class="underline" to="/forgot-password">
                Quên mật khẩu?
            </nuxt-link>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';

    const defaultForm = {
        email: '',
        password: '',
    };

    export default {
        props: {
            loading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                form: _cloneDeep(defaultForm),
                rules: {
                    email: [
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập',
                            trigger: 'blur',
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu',
                            trigger: 'blur',
                        },
                    ],
                },
            };
        },

        methods: {
            handleSubmit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>
