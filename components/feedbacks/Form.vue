<template>
    <a-form-model
        ref="feedbackForm"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <a-form-model-item label="Nội dung" prop="content">
            <a-textarea v-model="form.content" placeholder="Nhập nội dung" />
        </a-form-model-item>
        <a-form-model-item class="!mt-2" label="Ảnh người phản hồi" prop="thumbnail">
            <ct-image-upload v-model="form.thumbnail" />
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';

    const defaultForm = {
        content: '',
        thumbnail: '',
    };

    export default {
        props: {
            feedback: Object,
        },
        data() {
            return {
                form: this.feedback
                    ? _cloneDeep(_pick(this.feedback, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                file: null,
                rules: {
                    content: [
                        {
                            required: true,
                            message: 'Vui lòng nhập nội dung',
                            trigger: 'change',
                        },
                    ],
                    thumbnail: [
                        {
                            required: true,
                            message: 'Vui lòng chọn ảnh',
                            trigger: 'blur',
                        },
                    ],
                },
            };
        },

        watch: {
            feedback() {
                this.form = this.feedback
                    ? _cloneDeep(_pick(this.feedback, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm);
            },
        },

        methods: {
            submit() {
                this.$refs.feedbackForm.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>
<style lang="scss">
.ant-upload {
    @apply h-60 w-full #{!important};
}
</style>
