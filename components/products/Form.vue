<template>
    <div class="grid grid-cols-12 gap-5">
        <div class="col-span-8 flex flex-col gap-y-5">
            <div>
                <span class="block mb-2">Thông số kỹ thuật</span>
                <Editor v-if="language === 'vi'" v-model="form.specifications" :disabled="!isEdit" />
                <Editor v-else v-model="form.specificationsEn" :disabled="!isEdit" />
            </div>
            <div>
                <span class="block mb-2">Ưu điểm ứng dụng</span>
                <Editor v-if="language === 'en'" v-model="form.benefit" :disabled="!isEdit" />
                <Editor v-else v-model="form.benefitEn" :disabled="!isEdit" />
            </div>
        </div>
        <div class="col-span-4">
            <a-form-model
                ref="productForm"
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
                    <a-form-model-item label="Chọn danh mục" prop="categoryId">
                        <SelectRemote
                            v-model="form.categoryId"
                            class="col-span-4 md:col-span-4"
                            placeholder="Danh mục"
                            query="categoryIds"
                            :router="false"
                            fetch-url="products/categories/fetchAll"
                            option-label="name"
                            option-value="id"
                            store="products.categories"
                            store-prop="categories"
                            :disabled="!isEdit"
                        />
                    </a-form-model-item>
                    <a-form-model-item label="Tên sản phẩm" prop="name">
                        <a-input
                            v-if="language === 'vi'"
                            v-model="form.name"
                            :disabled="!isEdit"
                            placeholder="Vui lòng nhập"
                        />
                        <a-input
                            v-else
                            v-model="form.nameEn"
                            :disabled="!isEdit"
                            placeholder="Vui lòng nhập"
                        />
                    </a-form-model-item>
                    <div>
                        <span class="mb-2 block">Ảnh đại diện sản phẩm</span>
                        <div class="flex items-center gap-x-5">
                            <img
                                v-if="thumbnailProduct.source"
                                :src="thumbnailProduct.source"
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
                        <span class="mb-2 block">Hình ảnh sản phẩm ( tối đa 3 ảnh )</span>
                        <div class="flex items-center gap-x-5">
                            <div v-for="item,index in mediasProduct" :key="index" class="relative group">
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
                                v-if="mediasProduct.length < 3"
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

                    <a-form-model-item label="Mô tả sản phẩm" prop="description">
                        <a-textarea
                            v-if="language === 'vi'"
                            v-model="form.description"
                            :disabled="!isEdit"
                            placeholder="Mô tả"
                            :auto-size="{ minRows: 7, maxRows: 7 }"
                        />
                        <a-textarea
                            v-else
                            v-model="form.descriptionEn"
                            :disabled="!isEdit"
                            placeholder="Mô tả"
                            :auto-size="{ minRows: 7, maxRows: 7 }"
                        />
                    </a-form-model-item>
                </div>
            </a-form-model>
        </div>
    </div>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import { convertToFormData } from '@/utils/form';
    import Editor from '@/components/shared/Editor.vue';
    import SelectRemote from '@/components/filters/SelectRemote.vue';

    const defaultForm = {
        name: null,
        categoryId: null,
        specifications: null,
        benefit: null,
        description: null,
        thumbnail: null,
        medias: [
            {
                isThumbnail: true,
                source: 'string',
                type: 'image',
            },
        ],
    };

    export default {
        components: {
            Editor,
            SelectRemote,
        },

        props: {
            product: {
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
                form: this.product ? _cloneDeep(this.product) : _cloneDeep(defaultForm),
                rules: {
                    name: [{ required: true, message: 'Không được để trống trường này', trigger: 'change' }],
                    categoryId: [{ required: true, message: 'Không được để trống trường này', trigger: 'change' }],
                    description: [{ required: true, message: 'Không được để trống trường này', trigger: 'change' }],
                },
                thumbnailProduct: {
                    source: '',
                },
                cacheThumnail: {},
                fileThumbnail: [],
                mediasProduct: [],
                fileMedias: [],
            };
        },

        mounted() {
            if (this.product) {
                this.thumbnailProduct = _cloneDeep(this.product.medias).find((product) => product.isThumbnail === true) || {};
                this.cacheThumnail = _cloneDeep(this.product.medias).find((product) => product.isThumbnail === true);
                this.form.medias = _cloneDeep(this.product.medias).filter((item) => item.isThumbnail === false);
                this.mediasProduct = _cloneDeep(this.product.medias).filter((item) => item.isThumbnail === false);
            }
        },

        methods: {
            handlerThumbnail(file) {
                this.fileThumbnail = file;
                this.thumbnailProduct.source = URL.createObjectURL(file);
            },

            handlerPreviewFileList(file) {
                this.fileMedias.push(file);
                this.mediasProduct.push({ source: URL.createObjectURL(file) });
            },

            removeItemFileList(key) {
                this.fileMedias = this.fileMedias.filter((item, index) => index !== key);
                this.mediasProduct = this.mediasProduct.filter((item, index) => index !== key);
                this.form.medias = this.mediasProduct.filter((item, index) => index !== key);
            },

            async submit() {
                this.$refs.productForm.validate(async (valid) => {
                    if (valid) {
                        if (this.fileMedias) {
                            const { data: { fileAttributes } } = await this.$api.uploader.uploadImage(convertToFormData({
                                files: this.fileMedias,
                            }));
                            this.form.medias = [...this.form.medias, ...fileAttributes];
                        }
                        if (this.fileThumbnail.length !== 0) {
                            const thumnail = await this.$api.uploader.uploadImage(convertToFormData({
                                files: this.fileThumbnail,
                            }));
                            this.form.medias = [...this.form.medias, { ...thumnail.data.fileAttributes[0], isThumbnail: true }];
                        } else {
                            this.form.medias = [...this.form.medias, { ...this.cacheThumnail }];
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
