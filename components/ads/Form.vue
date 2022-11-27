<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="h-full flex flex-col gap-4">
            <div class="flex gap-4 items-center">
                <a-form-model-item prop="title" label="Tiêu đề" class="flex-grow">
                    <a-input
                        v-model="form.title"
                        prop="title"
                        class="!text-xl font-semibold"
                    />
                </a-form-model-item>
                <a-form-model-item label="Ngôn ngữ">
                    <a-select v-model="language" placeholder="Ngôn ngữ" class="!w-[150px]">
                        <a-select-option value="vi">
                            Tiếng Việt
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>
            <div>
                <a-form-model-item prop="link" label="Link Tracking" class="flex-grow">
                    <a-input
                        v-model="form.link"
                        prop="link"
                        class="!text-xl font-semibold"
                    />
                </a-form-model-item>
            </div>
            <!-- input title and published date -->
            <div class="grid grid-cols-10 md:order-last order-first w-full gap-4">
                <!-- image -->
                <div class="col-span-12 md:col-span-3 h-[200px]">
                    <a-form-model-item label="Tải ảnh" prop="thumbnail">
                        <ct-image-upload v-model="form.thumbnail" />
                    </a-form-model-item>
                    <a-form-model-item prop="link" label="hoặc nhập link" class="flex-grow">
                        <a-input
                            v-model="form.thumbnail"
                            prop="link"
                            class="!text-xl font-semibold"
                        />
                    </a-form-model-item>
                </div>
                <a-form-model-item label="Mô tả" prop="description" class="col-span-12 md:col-span-5 h-[200px]">
                    <a-textarea
                        v-model="form.description"
                        placeholder="Nhập mô tả"
                        :rows="4"
                    />
                </a-form-model-item>
                <a-form-model-item label="Vị trí hiển thị" class="col-span-12 md:col-span-2 h-[200px]">
                    <a-select
                        v-model="form.position"
                        placeholder="Vị trí"
                        class="!w-[200px]"
                    >
                        <a-select-option v-for="e in position" :key="e.value" :value="e.value">
                            {{ e.label }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';
    import _get from 'lodash/get';

    const defaultForm = {
        title: '',
        position: '',
        thumbnail: '',
        avatar: '',
        link: '',

    };

    export default {
        components: { },
        props: {
            ads: Object,
        },
        data() {
            return {
                language: 'vi',
                form: this.ads
                    ? _cloneDeep(_pick(this.ads, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                file: null,
                position: [
                    {
                        label: 'Banner dưới bài viết',
                        value: 'bottomPost',
                    },
                    {
                        label: 'Hồ sơ Người dùng',
                        value: 'profileUser',
                    },
                    {
                        label: 'Sidebar bài viết',
                        value: 'sidebarPost',
                    },
                    {
                        label: 'Trang chủ',
                        value: 'homePage',
                    },
                ],
                rules: {
                    title: [{
                        required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur',
                    }],
                    // thumbnail: [{
                    //     required: true, message: 'Vui lòng chọn ảnh', trigger: 'blur',
                    // }],
                    position: [{
                        required: true, message: 'Vui lòng chọn vị trí', trigger: 'blur',
                    }],
                    link: [{
                        required: true, message: 'Vui lòng nhập đường dẫn', trigger: 'blur',
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
                    } else {
                        this.$message.error('Cần nhập đủ trường!');
                    }
                });
            },
        },
    };
</script>
<style lang="scss" scoped>
.ant-upload, .ant-form-item-control {
    textarea {
        @apply h-72 w-full #{!important};
    }
}
</style>
