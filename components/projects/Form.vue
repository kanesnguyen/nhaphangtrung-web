<template>
    <div class="grid grid-cols-12 gap-5 h-full">
        <div class="col-span-8">
            <div class="h-full">
                <span class="block mb-2">Thôn tin dự án</span>
                <Editor v-model="form.content" :disabled="!isEdit" class="h-full" />
            </div>
        </div>
        <div class="col-span-4">
            <a-form-model
                ref="projectForm"
                :model="form"
                :rules="rules"
            >
                <div class="flex flex-col gap-y-8">
                    <a-form-model-item label="Ngôn ngữ">
                        <a-select v-model="language" placeholder="Ngôn ngữ" class="!w-[150px]">
                            <a-select-option value="vi">
                                Tiếng Việt
                            </a-select-option>
                            <a-select-option value="en">
                                Tiếng Anh
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="Tiêu đề" prop="name">
                        <a-input v-model="form.name" :disabled="!isEdit" placeholder="Vui lòng nhập" />
                    </a-form-model-item>
                    <div>
                        <span class="mb-2 block">Ảnh đại diện sản phẩm</span>
                        <div class="flex items-center gap-x-5">
                            <img
                                v-if="thumbnailProject"
                                :src="thumbnailProject"
                                onerror="this.src='/images/default-avatar.png'"
                                alt=""
                                class="w-[104px] h-[104px] rounded-sm object-cover border-solid p-1 border border-gray-50"
                            >
                            <div v-else class="w-[104px] h-[104px] rounded-sm border-dashed border border-gray-50 flex justify-center items-center">
                                <span><i class="fas fa-plus" /></span>
                            </div>
                            <a-upload
                                :disabled="!isEdit"
                                :show-upload-list="false"
                                action=""
                                :transform-file="handlerThumbnail"
                            >
                                <div class="flex gap-x-3">
                                    Tải tệp lên
                                </div>
                            </a-upload>
                        </div>
                    </div>

                    <div>
                        <span class="mb-2 block">Hình ảnh sản phẩm ( tối đa 4 ảnh )</span>
                        <div class="flex items-center gap-x-5">
                            <div v-for="item,index in mediasProject" :key="index" class="relative group">
                                <img
                                    v-if="item.source"
                                    :src="item.source"
                                    onerror="this.src='/images/default-avatar.png'"
                                    alt=""
                                    class="w-[104px] h-[104px] rounded-sm object-cover border-solid p-1 border border-gray-50"
                                >
                                <span
                                    v-if="isEdit"
                                    class="hidden transition duration-500 group-hover:block absolute w-full h-full text-center leading-[104px] top-0 left-0 right-0 after:content-['']
                                            after:absolute after:w-full after:h-full after:top-0 after:left-0 after:right-0 after:bg-black/20 after:z-[0]"
                                    @click="removeItemFileList(index)"
                                ><i class="fas fa-trash text-white relative z-[1] cursor-pointer" /></span>
                            </div>
                            <a-upload
                                v-if="mediasProject.length < 4"
                                :disabled="!isEdit"
                                :show-upload-list="false"
                                :transform-file="handlerPreviewFileList"
                            >
                                <div class="w-[104px] h-[104px] rounded-sm border-dashed border border-gray-50 flex flex-col justify-center gap-y-2 items-center">
                                    <span><i class="fas fa-plus" /></span>
                                    <span>Tải lên</span>
                                </div>
                            </a-upload>
                        </div>
                    </div>

                    <div class="flex gap-5">
                        <span>Đánh dấu nổi bật:</span>
                        <a-switch v-model="form.isHighLight" :disabled="!isEdit" @change="changeIsHighLight" />
                    </div>
                </div>
            </a-form-model>
        </div>
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import { convertToFormData } from '@/utils/form';
    import Editor from '@/components/shared/Editor.vue';

    const defaultForm = {
        name: null,
        content: null,
        description: null,
        thumbnail: null,
        medias: [
            {
                source: 'string',
                type: 'video',
            },
        ],
    };

    export default {
        components: {
            Editor,
        },

        props: {
            project: {
                type: Object,
                default: () => {},
            },
            isEdit: {
                type: Boolean,
                default: true,
            },
        },

        data() {
            return {
                language: 'vi',
                form: this.project ? _cloneDeep(this.project) : _cloneDeep(defaultForm),
                rules: {
                    name: [{ required: true, message: 'Không được để trống trường này', trigger: 'change' }],
                },
                thumbnailProject: null,
                fileThumbnail: [],
                mediasProject: [],
                fileMedias: [],
            };
        },

        mounted() {
            if (this.project) {
                this.thumbnailProject = _cloneDeep(this.project.thumbnail) || '';
                this.mediasProject = _cloneDeep(this.project.medias);
            }
        },

        methods: {
            handlerThumbnail(file) {
                this.fileThumbnail = file;
                this.thumbnailProject = URL.createObjectURL(file);
            },

            handlerPreviewFileList(file) {
                this.fileMedias.push(file);
                this.mediasProject.push({ source: URL.createObjectURL(file) });
            },

            removeItemFileList(key) {
                this.fileMedias = this.fileMedias.filter((item, index) => index !== key);
                this.mediasProject = this.mediasProject.filter((item, index) => index !== key);
                this.form.medias = this.mediasProject.filter((item, index) => index !== key);
            },

            changeIsHighLight() {

            },

            async submit() {
                this.$refs.projectForm.validate(async (valid) => {
                    if (valid) {
                        if (this.fileMedias.length !== 0) {
                            const { data: { fileAttributes } } = await this.$api.uploader.uploadImage(convertToFormData({
                                files: this.fileMedias,
                            }));
                            this.form.medias = [...this.form.medias, ...fileAttributes];
                        }
                        if (this.fileThumbnail.length !== 0) {
                            const thumnail = await this.$api.uploader.uploadImage(convertToFormData({
                                files: this.fileThumbnail,
                            }));
                            this.form.thumbnail = thumnail.data.fileAttributes[0];
                        }
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>

<style lang="scss">
    .ant-upload-list-picture-card {
        .ant-upload-list-item-actions {
            a:nth-child(1) {
                @apply hidden
            }
        }
    }
</style>
