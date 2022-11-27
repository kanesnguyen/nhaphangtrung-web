<!-- eslint-disable vue/no-unused-components -->
<template>
    <div class="flex flex-col items-center">
        <a-alert
            v-if="error"
            class="!mt-3 w-full"
            :message="error"
            type="warning"
            show-icon
        />
        <LoginForm
            :loading="loading"
            class="!mt-3 min-w-[200px] max-w-md w-full"
            @submit="login"
        />
    </div>
</template>

<script>
    import LoginForm from '@/components/auth/forms/Login.vue';
    import { message } from 'ant-design-vue';

    export default {
        layout: 'auth',

        auth: 'guest',

        components: {
            LoginForm,
        },

        data() {
            return {
                encryptor: null,
                loading: false,
                error: null,
            };
        },

        mounted() {
            // encrypt password
            const { JSEncrypt } = require('jsencrypt');
            this.encryptor = (msg) => {
                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(process.env.RSA_PUBLIC_KEY);

                return encrypt.encrypt(msg);
            };
        },

        methods: {
            login(form) {
                this.loading = true;

                this.$auth
                    .loginWith('local', {
                        data: form,
                    })
                    .then(async () => {
                        // login success and set data into localStorage
                        this.$auth.$storage.setLocalStorage('data', form);
                        message.success('Đăng nhập thành công');
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        this.$handleError(error, (_error) => {
                            const errorData = _error?.response?.data;
                            this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác';
                            if (errorData?.code === 401) {
                                this.$forceUpdate();
                            }
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        },

        head() {
            return {
                title: 'Đăng nhập | Nuxt Boilerplate',
            };
        },
    };
</script>
