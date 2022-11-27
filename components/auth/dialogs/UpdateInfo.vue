<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        title="Cập nhật thông tin cá nhân"
    >
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
            layout="vertical"
            :colon="false"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <a-form-model-item label="Họ và tên" prop="fullName">
                    <a-input v-model="form.fullName" placeholder="Nhập nội dung" />
                </a-form-model-item>
                <a-form-model-item label="Username" prop="username">
                    <a-input v-model="form.username" placeholder="Nhập nội dung" />
                </a-form-model-item>
                <a-form-model-item label="Email" prop="email">
                    <a-input v-model="form.email" placeholder="Nhập nội dung" />
                </a-form-model-item>
                <a-form-model-item label="Số điện thoại" prop="phoneNumber">
                    <a-input v-model="form.phoneNumber" placeholder="Nhập nội dung" />
                </a-form-model-item>
            </div>
        </a-form-model>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="updateProfile"
            >
                Cập nhật
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import { phoneValidator } from '@/utils/form';

    export default {
        data() {
            return {
                visible: false,
                loading: false,
                room: null,
                form: {},
                rules: {
                    fullName: [{
                        required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur',
                    }],
                    username: [{
                        required: true, message: 'Vui lòng nhập username', trigger: 'blur',
                    }],
                    phoneNumber: [{
                        validator: phoneValidator, trigger: 'blur',
                    }],
                    email: [{
                        type: 'email', message: 'Vui lòng nhập đúng định dạng email', trigger: 'blur',
                    }],
                },
            };
        },

        methods: {
            open() {
                this.form = {
                    fullName: this.$auth.user.fullName,
                    email: this.$auth.user.email,
                    phoneNumber: this.$auth.user.phoneNumber,
                    username: this.$auth.user.username,
                };
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async updateProfile() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            await this.$api.auth.updateProfile(this.form);
                            this.$message.success('Cập nhật thông tin cá nhân thành công');
                            this.close();
                            await this.$auth.fetchUser();
                        } catch (error) {
                            this.$handleError(error);
                        } finally {
                            this.loading = false;
                        }
                    }
                });
            },
        },
    };
</script>
