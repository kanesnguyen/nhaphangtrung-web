<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="h-full flex flex-col gap-4">
            <div class="flex items-start gap-4">
                <a-form-model-item prop="title" class="flex-grow">
                    <a-input
                        v-show="language === 'vi'"
                        v-model="form.title"
                        prop="title"
                        class="!text-xl font-semibold"
                        placeholder="Tiêu đề"
                    />
                    <a-input
                        v-show="language === 'en'"
                        v-model="form.titleEn"
                        prop="titleEn"
                        class="!text-xl font-semibold"
                        placeholder="Tiêu đề"
                    />
                </a-form-model-item>
                <a-form-model-item>
                    <a-select v-model="language" placeholder="Ngôn ngữ" class="!w-[150px]">
                        <a-select-option value="vi">
                            Tiếng Việt
                        </a-select-option>
                        <a-select-option value="en">
                            Tiếng Anh
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>
            <div class="flex-grow grid grid-cols-4 gap-4">
                <!-- content -->
                <div ref="editorContainer" class="md:col-span-3 md:order-first col-span-4 order-last">
                    <a-form-model-item class="lg:h-full" prop="content">
                        <Editor
                            v-show="language === 'vi'"
                            v-model="form.content"
                            prop="content"
                            :height="editorHeight"
                            class="h-full"
                        />
                        <Editor
                            v-show="language === 'en'"
                            v-model="form.contentEn"
                            prop="contentEn"
                            :height="editorHeight"
                            class="h-full"
                        />
                    </a-form-model-item>
                </div>

                <!-- input title and published date -->
                <div class="flex flex-col md:col-span-1 md:order-last col-span-4 order-first">
                    <!-- image -->
                    <a-form-model-item label="Ảnh" prop="thumbnail">
                        <ct-image-upload v-model="form.thumbnail" />
                    </a-form-model-item>
                    <a-form-model-item label="Mô tả" prop="shortDescription">
                        <a-textarea
                            v-show="language === 'vi'"
                            v-model="form.shortDescription"
                            placeholder="Nhập mô tả"
                            :rows="4"
                        />
                        <a-textarea
                            v-show="language === 'en'"
                            v-model="form.shortDescriptionEn"
                            placeholder="Nhập mô tả"
                            :rows="4"
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
    import _get from 'lodash/get';
    import Editor from '../shared/Editor.vue';

    const defaultForm = {
        title: '',
        titleEn: '',
        shortDescription: '',
        shortDescriptionEn: '',
        thumbnail: undefined,
        content: '',
        contentEn: '',

    };

    export default {
        components: { Editor },
        props: {
            ads: Object,
        },
        data() {
            return {
                language: 'vi',
                editorHeight: undefined,
                form: this.ads
                    ? _cloneDeep(_pick(this.ads, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                edit: false,
                file: null,
                rules: {
                    title: [{
                        required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur',
                    }],
                    titleEn: [{
                        required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur',
                    }],
                    thumbnail: [{
                        required: true, message: 'Vui lòng chọn ảnh', trigger: 'blur',
                    }],
                    content: [{
                        required: true, message: 'Vui lòng nhập nội dung', trigger: 'blur',
                    }],
                    contentEn: [{
                        required: true, message: 'Vui lòng nhập nội dung', trigger: 'blur',
                    }],
                    shortDescription: [{
                        required: true, message: 'Vui lòng nhập mô tả', trigger: 'blur',
                    }],
                    shortDescriptionEn: [{
                        required: true, message: 'Vui lòng nhập mô tả', trigger: 'blur',
                    }],

                },
            };
        },

        watch: {
            ads() {
                this.empty();
            },

        },
        mounted() {
            this.editorHeight = this.$refs.editorContainer?.offsetHeight;
            console.log(this.$refs.editorContainer.offsetHeight);
        },

        methods: {
            _get,
            empty() {
                this.form = this.ads ? _cloneDeep(_pick(this.ads, Object.keys(defaultForm))) : _cloneDeep(defaultForm);
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
<style lang="scss" scoped>
.ant-upload {
    @apply h-60 w-full #{!important};
}
</style>
