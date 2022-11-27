<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="h-full flex flex-col gap-4">
            <div class="flex items-center gap-4">
                <a-form-model-item prop="title" class="flex-grow">
                    <a-input
                        v-show="language === 'vi'"
                        v-model="form.title"
                        class="!text-xl font-semibold"
                        placeholder="Tiêu đề"
                    />
                    <a-input
                        v-show="language === 'en'"
                        v-model="form.titleEn"
                        class="!text-xl font-semibold"
                        placeholder="Tiêu đề"
                    />
                </a-form-model-item>
                <a-select v-model="language" placeholder="Ngôn ngữ" class="!w-[150px]">
                    <a-select-option value="vi">
                        Tiếng Việt
                    </a-select-option>
                    <a-select-option value="en">
                        Tiếng Anh
                    </a-select-option>
                </a-select>
            </div>
            <div class="flex-grow flex flex-wrap lg:flex-nowrap gap-4">
                <div ref="editorContainer" class="flex-grow w-full lg:w-auto lg:h-full order-2 lg:order-1">
                    <Editor
                        v-show="language === 'vi'"
                        v-model="form.content"
                        :height="editorHeight"
                        class="h-full"
                    />
                    <Editor
                        v-show="language === 'en'"
                        v-model="form.contentEn"
                        :height="editorHeight"
                        class="h-full"
                    />
                </div>
                <div class="w-full lg:w-[350px] space-y-2 order-1 lg:order-2">
                    <a-form-model-item label="Thumbnail" prop="thumbnail">
                        <ct-image-upload v-model="form.thumbnail" />
                    </a-form-model-item>
                    <a-form-model-item label="Mức lương" prop="salary">
                        <a-input v-model="form.salary" placeholder="Mức lương" />
                    </a-form-model-item>
                    <a-form-model-item label="Số lượng" prop="quantity">
                        <a-input-number
                            v-model="form.quantity"
                            class="!w-full"
                            :min="1"
                            placeholder="Số lượng"
                        />
                    </a-form-model-item>
                    <a-form-model-item label="Hình thức làm việc" prop="workingForm">
                        <a-input v-model="form.workingForm" placeholder="Hình thức làm việc" />
                    </a-form-model-item>
                    <a-form-model-item label="Địa chỉ" prop="address">
                        <a-input v-model="form.address" placeholder="Địa chỉ" />
                    </a-form-model-item>
                    <a-form-model-item label="Hết hạn" prop="expired">
                        <a-date-picker
                            v-model="form.expired"
                            show-time
                            placeholder="Hết hạn"
                            :disabled-date="(current) => current < moment().startOf('day')"
                        />
                    </a-form-model-item>
                </div>
            </div>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';
    import moment from 'moment';
    import Editor from '@/components/shared/Editor.vue';

    const defaultForm = {
        title: '',
        titleEn: '',
        thumbnail: undefined,
        content: '',
        contentEn: '',
        salary: undefined,
        address: '',
        expired: undefined,
        quantity: undefined,
        workingForm: '',
    };

    export default {
        components: {
            Editor,
        },

        props: {
            recruitment: Object,
        },

        data() {
            return {
                language: 'vi',
                editorHeight: undefined,
                form: this.recruitment ? _cloneDeep(_pick(this.recruitment, Object.keys(defaultForm))) : _cloneDeep(defaultForm),
                rules: {
                    title: [{
                        required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur',
                    }],
                    titleEn: [{
                        required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur',
                    }],
                    thumbnail: [{
                        required: true, message: 'Vui lòng chọn thumbnail', trigger: 'blur',
                    }],
                    content: [{
                        required: true, message: 'Vui lòng nhập nội dung', trigger: 'blur',
                    }],
                    contentEn: [{
                        required: true, message: 'Vui lòng nhập nội dung', trigger: 'blur',
                    }],
                    salary: [{
                        required: true, message: 'Vui lòng nhập mức lương', trigger: 'blur',
                    }],
                    quantity: [{
                        required: true, message: 'Vui lòng nhập số lượng', trigger: 'blur',
                    }],
                },
            };
        },

        watch: {
            recruitment() {
                this.empty();
            },
        },

        mounted() {
            this.editorHeight = this.$refs.editorContainer?.clientHeight;
        },

        methods: {
            moment,

            empty() {
                this.form = this.recruitment ? _cloneDeep(_pick(this.recruitment, Object.keys(defaultForm))) : _cloneDeep(defaultForm);
            },

            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>
