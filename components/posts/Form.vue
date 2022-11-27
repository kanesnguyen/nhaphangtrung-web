<template>
    <div :class="`w-full 'bg-white' : 'bg-[#18191a]' px-3 xl:px-0 h-[calc(100vh-80px)] overflow-auto pb-4`">
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
        >
            <div class="grid grid-cols-10 gap-4 pt-4">
                <div :class="`col-span-7 p-3 rounded-md 'bg-white'`">
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
                        />
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="Mô tả ngắn" prop="description">
                        <a-textarea
                            v-model="form.description"
                            :class="`${theme ? 'text-black' : 'dark-theme'}`"
                            placeholder="Mô tả ngắn cho bài viết"
                            :auto-size="{ minRows: 2, maxRows: 3 }"
                        />
                    </a-form-model-item>
                    <Editor @getContent="getContent" />
                </div>
                <div :class="`col-span-3`">
                    <div :class="`${theme ? 'bg-white' : 'bg-[#242526]'}  p-3 mb-3  rounded-md`">
                        <p :class="`${theme ? 'text-black' : 'text-[#fff]'}`">
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
                                @change="previewThumbnail"
                            >
                            <div class="flex gap-x-2">
                                <div :class="`flex items-center w-fit px-2 py-1 rounded-lg border cursor-pointer border-[#3aa554] hover:bg-[#3aa554] hover:text-[#fff] transition duration-150 ease-out hover:ease-in 'border-[#d3d3d3]' : 'border-[#3a3b3c]' }`" @click="openSelectFile">
                                    <p :class="`mb-0 px-3 text-sm 'text-black' : 'text-[#fff]'}`">
                                        {{ fileName ? 'Thay đổi' : 'Upload' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p :class="`${theme ? 'text-black' : 'text-[#fff]'}`">
                            3. Danh mục bài viết
                        </p>
                        <div :class="`flex flex-col items-center gap-y-8 mb-6 w-full 'light-mode' : 'dark-mode'}`">
                            <a-select
                                placeholder="Danh mục"
                                class="w-full"
                                @change="selectCategory"
                            >
                                <a-select-option v-for="item in topics" :key="item.id" :value="JSON.stringify(item)">
                                    {{ item.label }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>

                    <button :class="`w-full ${!theme ? 'bg-[#3aa554] !text-white font-semibold' : 'bg-[#3aa554] !text-[#f5f5f5] border-[#242526]'} flex items-center justify-center px-3 py-2 rounded-md border cursor-pointer hover:border-[#3aa554] transition duration-150 ease-out hover:ease-in`" @click="submit">
                        <p :class="`mb-0  text-sm text-center`">
                            Gửi bài viết
                        </p>
                    </button>
                </div>
            </div>
        </a-form-model>
    </div>
</template>

<script>
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
        data() {
            return {
                thumbnail: null,
                fileName: null,
                submited: false,
                form: _cloneDeep(form),
                rules: {
                    title: [
                        { required: true, message: 'Vui lòng nhập Tiêu đề', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: 'Vui lòng nhập Mô tả cho bài viết', trigger: 'blur' },
                    ],
                },
            };
        },

        computed: {
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
                const upPost = await this.create({ ...this.form, thumbnail: this.fileName });
                const upImage = await this.handlerThumbnail();
                if (upPost && upImage) {
                    this.$message.success('Gửi bài viết thành công!');
                    this.form = _cloneDeep(form);
                    this.fileName = '';
                    this.thumbnail = '';
                }
                URL.revokeObjectURL(this.thumbnail);
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
