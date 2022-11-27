<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <a-form-model-item class="col-span-2" label="Tiêu đề" prop="name">
                <a-input v-model="form.name" placeholder="Tiêu đề" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="File" prop="source">
                <ct-file-upload v-model="form.source" @change="(source, fileAttributes) => handleFileChange(fileAttributes)" />
            </a-form-model-item>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';

    const defaultForm = {
        name: '',
        type: undefined,
        fileType: undefined,
        fileName: undefined,
        source: undefined,
    };

    export default {
        props: {
            user: Object,
            type: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                form: this.user
                    ? _cloneDeep(_pick(this.user, Object.keys(defaultForm)))
                    : _cloneDeep({
                        ...defaultForm,
                        type: this.type,
                    }),
                rules: {
                    title: [
                        { required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur' },
                    ],
                    source: [
                        { required: true, message: 'Vui lòng tải file lên', trigger: 'change' },
                    ],
                },
            };
        },

        methods: {
            handleFileChange(fileAttributes) {
                this.form.fileType = fileAttributes.type;
                this.form.fileName = fileAttributes.originalname;
                this.form.source = fileAttributes.source;
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
