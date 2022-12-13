<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        title="Tạo khiếu nại"
    >
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
            layout="vertical"
            :colon="false"
        >
            <div class="grid grid-cols-1 gap-y-4">
                <a-form-model-item label="Mã đơn hàng" prop="orderCode">
                    <a-input v-model="form.orderCode" placeholder="Nhập mã đơn hàng" />
                </a-form-model-item>
                <a-form-model-item label="Hình thức" prop="type">
                    <a-select
                        v-model="form.type"
                        class="w-full"
                        placeholder="Chọn loại vấn đề"
                        show-search
                    >
                        <a-select-option
                            v-for="(item, index) in FEEDBACK_TYPE_OPTIONS"
                            :key="index"
                            :value="item.value"
                        >
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="Mô tả chi tiết" prop="desciption">
                    <a-textarea
                        v-model="form.description"
                        placeholder="Nhập mô tả"
                        :auto-size="{ minRows: 4, maxRows: 5 }"
                    />
                </a-form-model-item>
                <a-form-model-item label="Hình ảnh" prop="image">
                    <a-upload
                        :file-list="fileList"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture-card"
                        @preview="handlePreview"
                    >
                        <div v-if="fileList.length < 5">
                            <i class="fas fa-upload" />
                            <div class="ant-upload-text">
                                Upload
                            </div>
                        </div>
                    </a-upload>
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
                @click="submit"
            >
                Gửi
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import { FEEDBACK_TYPE_OPTIONS } from '@/constants/feedbacks/status';

    export default {
        components: {
        },

        data() {
            return {
                previewVisible: false,
                previewImage: '',
                fileList: [],
                FEEDBACK_TYPE_OPTIONS,
                visible: false,
                loading: false,
                room: null,
                form: {
                    orderCode: '',
                    type: '',
                    desciption: '',
                },
                rules: {
                    orderCode: [{
                        required: true, message: 'Vui lòng nhập Mã đơn hàng', trigger: 'blur',
                    }],
                    type: [{
                        required: true, message: 'Vui lòng chọn loại vấn đề', trigger: 'blur',
                    }],
                    description: [{
                        required: true, message: 'Vui lòng mô tả chi tiết vấn đề', trigger: 'blur',
                    }],
                },
            };
        },

        methods: {
            open() {
                this.form = {
                    orderCode: '',
                    type: '',
                    description: '',
                };
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            chandleCancel() {
                this.previewVisible.value = false;
            },

            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = () => resolve(reader.result);

                    reader.onerror = (error) => reject(error);
                });
            },
            async handlePreview(file) {
                if (!file.url && !file.preview) {
                    file.preview = await this.getBase64(file.originFileObj);
                }

                this.previewImage.value = file.url || file.preview;
                this.previewVisible.value = true;
            },

            handleChange({ fileList: newFileList }) {
                this.fileList.value = newFileList;
            },

            async submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            await this.$api.feedbacks.create(this.form);
                            this.$message.success('Đã gửi khiếu nại');
                            this.close();
                            await this.$store.dispatch('feedbacks/fetchAll', this.$route.query);
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
