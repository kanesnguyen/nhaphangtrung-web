<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <a-form-model-item class="col-span-2" label="Tiêu đề" prop="title">
                <a-input v-model="form.title" placeholder="Tiêu đề" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="Ảnh" prop="image">
                <ct-image-upload v-model="form.image" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2" label="Link điều hướng" prop="linkDirect">
                <a-input v-model="form.linkDirect" placeholder="Link điều hướng" />
            </a-form-model-item>
            <a-form-model-item class="col-span-2 md:col-span-1" label="Loại" prop="type">
                <a-select v-model="form.type" placeholder="Loại">
                    <a-select-option
                        v-for="bannerType in BANNER_TYPE_OPTIONS"
                        :key="bannerType.value"
                        :value="bannerType.value"
                    >
                        {{ bannerType.label }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item class="col-span-2 md:col-span-1" label="Vị trí" prop="position">
                <a-select v-model="form.position" placeholder="Vị trí">
                    <a-select-option
                        v-for="bannerPosition in BANNER_POSITION_OPTIONS"
                        :key="bannerPosition.value"
                        :value="bannerPosition.value"
                    >
                        {{ bannerPosition.label }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _pick from 'lodash/pick';
    import { BANNER_POSITION, BANNER_POSITION_OPTIONS } from '@/constants/settings/banner/position';
    import { BANNER_TYPE, BANNER_TYPE_OPTIONS } from '@/constants/settings/banner/type';

    const defaultForm = {
        title: '',
        linkDirect: '',
        position: BANNER_POSITION.TOP,
        image: '',
        type: BANNER_TYPE.HOMEPAGE,
    };

    export default {
        props: {
            banner: Object,
        },

        data() {
            return {
                BANNER_POSITION_OPTIONS,
                BANNER_TYPE_OPTIONS,
                form: this.banner
                    ? _cloneDeep(_pick(this.banner, Object.keys(defaultForm)))
                    : _cloneDeep(defaultForm),
                rules: {
                    title: [
                        { required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur' },
                    ],
                    image: [
                        { required: true, message: 'Vui lòng tải ảnh lên', trigger: 'change' },
                    ],
                },
            };
        },

        methods: {
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
