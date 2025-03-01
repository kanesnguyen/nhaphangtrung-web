<template>
    <div :class="`w-full 'bg-white' : 'bg-[#18191a]' px-3 xl:px-0 h-[calc(100vh-80px)] overflow-auto pb-4`">
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="grid grid-cols-10 gap-4 pt-4">
                <div class="col-span-12 xl:col-span-7 p-3 rounded-md bg-white">
                    <p>
                        1. Thông tin cơ bản
                    </p>
                    <a-form-model-item
                        prop="title"
                        label="Tiêu đề bài viết"
                        class="!mb-5"
                    >
                        <a-input
                            v-model="form.title"
                            placeholder="Nhập tiêu đề bài viết"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Mô tả ngắn" prop="description">
                        <a-textarea
                            v-model="form.description"
                            placeholder="Mô tả ngắn cho bài viết"
                            :auto-size="{ minRows: 2, maxRows: 3 }"
                            :disabled="isEdit"
                        />
                    </a-form-model-item>
                    <Editor :content-props="form.content" :is-edit="isEdit" @getContent="getContent" />
                </div>
                <div :class="`col-span-12 xl:col-span-3`">
                    <div class="bg-white p-3 mb-3  rounded-md">
                        <p>
                            2. Hình ảnh đại diện
                        </p>
                        <div class="flex flex-col items-center gap-y-8 mb-6 w-full">
                            <img
                                v-if="thumbnail"
                                :src="thumbnail"
                                onerror="this.src='/images/default-avatar.png'"
                                alt=""
                                class="w-full h-[200px] rounded-md object-cover"
                            >
                            <div v-else class="w-full h-[200px] rounded-md border-dashed border border-gray-400 flex justify-center items-center">
                                <span><i class="fas fa-plus" /></span>
                            </div>
                            <input
                                id="thumbnailImage"
                                class="!hidden"
                                type="file"
                                accept="image/jpeg, image/png"
                                :disabled="isEdit"
                                @change="previewThumbnail"
                            >
                            <div class="flex gap-x-2">
                                <div v-if="!isEdit" class="flex items-center w-fit px-2 py-1 rounded-lg border cursor-pointer border-[#f6b900] hover:bg-[#f6b900] hover:text-[#fff] transition duration-150 ease-out hover:ease-in border-[#d3d3d3]" @click="openSelectFile">
                                    <p class="mb-0 px-3 text-sm text-black">
                                        {{ fileName ? 'Thay đổi' : 'Upload' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p class="text-black">
                            3. Danh mục bài viết
                        </p>
                        <div class="flex flex-col items-center gap-y-8 mb-6 w-full">
                            <a-select
                                :v-model="JSON.stringify(form.category)"
                                placeholder="Danh mục"
                                class="w-full"
                                @change="selectCategory"
                            >
                                <a-select-option v-for="item in categories" :key="item.id" :value="JSON.stringify(item)">
                                    {{ item.label }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>
                </div>
            </div>
        </a-form-model>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import _cloneDeep from 'lodash/cloneDeep';
    import Editor from '@/components/shared/Editor.vue';

    const form = {
        title: '',
        description: '',
        content: '',
        category: null,
    };
    export default {
        layout: 'default',
        components: {
            Editor,
        },
        props: {
            post: {
                type: Object,
                default: () => {},
            },
            isEdit: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                thumbnail: this.post ? this.post.thumbnail : null,
                fileName: null,
                submited: false,
                form: this.post ? _cloneDeep(this.post) : _cloneDeep(form),
                rules: {
                    title: [
                        { required: true, message: 'Vui lòng nhập Tiêu đề', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: 'Vui lòng nhập Nội dung bài viết', trigger: 'blur' },
                    ],
                },
            };
        },

        computed: {
            ...mapState('posts/categories', ['categories']),
        },
        methods: {
            openSelectFile() {
                document.querySelector('#thumbnailImage').click();
            },
            previewThumbnail() {
                const imageSelect = document.querySelector('#thumbnailImage').files[0];
                this.fileName = imageSelect.name;
                this.thumbnail = URL.createObjectURL(imageSelect);
            },
            handlerThumbnail() {
                const formData = new FormData();
                const imageSelected = document.querySelector('#thumbnailImage').files[0];
                formData.append('image', imageSelected);
                this.$axios.post('http://localhost:8000/images/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err))
                    .finally(() => false);
            },
            selectCategory(category) {
                const categoryParse = JSON.parse(category);
                this.form.category = {
                    categoryId: categoryParse.id,
                    label: categoryParse.label,
                    slug: categoryParse.slug,
                };
            },
            getContent(content) {
                this.form.content = content;
            },
            async submit() {
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

<style lang="scss">
    .ant-upload-list-picture-card {
        .ant-upload-list-item-actions {
            a:nth-child(1) {
                @apply hidden
            }
        }
    }
</style>
