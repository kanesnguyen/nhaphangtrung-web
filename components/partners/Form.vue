<template>
    <a-form-model
        ref="partnersForm"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <a-form-model-item label="Đối tác" prop="name">
            <a-input v-model="form.name" placeholder="Nhập tên đối tác" />
        </a-form-model-item>
        <a-form-model-item class="!mt-2" label="Thumbnail" prop="thumbnail">
            <ct-image-upload v-model="form.thumbnail" />
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';

    const defaultForm = {
        name: '',
        thumbnail: '',
    };

    export default {
        props: {
            partner: Object,
        },
        data() {
            return {
                // check to switch choosing data whether edit or create screen
                form: this.partner
                    ? _cloneDeep(_pick(this.partner, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                file: null,
                rules: {
                    name: [
                        {
                            required: true,
                            message: 'Vui lòng nhập tên',
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
            partner() {
                this.form = this.partner
                    ? _cloneDeep(_pick(this.partner, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm);
            },
        },

        methods: {
            submit() {
                this.$refs.partnersForm.validate((valid) => {
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
