<template>
    <div class="card">
        <div class="flex justify-between items-center mt-2.5 border-b-[1px] border-solid border-gray-40 pb-5">
            <ct-page-header text="Danh sách danh mục" />
            <a-button type="primary" @click="$refs.CategoriesDialog.open()">
                <i class="fas fa-plus-circle mr-2.5" />
                Thêm danh mục
            </a-button>
        </div>
        <div class="mt-10">
            <div
                v-for="(items, index) in categories"
                :key="index"
                class="flex justify-between items-center pb-3 gap-5"
            >
                <div class="flex-1 pt-3 mb-auto">
                    <a-collapse>
                        <a-collapse-panel
                            :key="items.id"
                            :header="items.name"
                            :disabled="false"
                        >
                            <template v-if="items.children.length > 0">
                                <div v-for="item in items.children" :key="item.id" class="flex justify-between items-center w-full mb-3 pl-3 sm:pl-20">
                                    <span class="text-lg font-medium">{{ item.name }}</span>
                                    <a-popover placement="bottomRight" class="z-0">
                                        <template slot="content" trigger="click">
                                            <div class="w-40 cursor-pointer action-button" @click="$refs.CategoryChildren.open(item)">
                                                Chỉnh sửa
                                            </div>
                                            <div
                                                class="mt-3 cursor-pointer action-button text-red-100"
                                                @click="() => {
                                                    $refs.ConfirmDialog.open(),
                                                    categorySelected = item
                                                }"
                                            >
                                                Xóa danh mục
                                            </div>
                                        </template>
                                        <div class=" cursor-pointer">
                                            <i class="fas fa-ellipsis-h mr-3" />
                                        </div>
                                    </a-popover>
                                </div>
                            </template>
                            <div v-else>
                                <a-empty />
                            </div>
                        </a-collapse-panel>
                    </a-collapse>
                </div>
                <div class="flex gap-5 mb-auto pt-7">
                    <span>Ngày tạo: {{ items.createdAt | dateFormat }}</span>
                    <a-popover placement="bottomRight" class="z-0">
                        <template slot="content" trigger="click">
                            <div class="w-40 cursor-pointer action-button" @click="$refs.CategoriesDialog.open(items)">
                                Chỉnh sửa danh mục
                            </div>
                            <div class="mt-3 w-40 cursor-pointer action-button" @click="$refs.CategoryChildren.open(undefined, items.id)">
                                Thêm danh mục con
                            </div>
                            <div
                                class="mt-3 cursor-pointer action-button text-red-100"
                                @click="() => {
                                    $refs.ConfirmDialog.open(),
                                    categorySelected = items
                                }"
                            >
                                Xóa
                            </div>
                        </template>
                        <div class=" cursor-pointer">
                            <i class="fas fa-ellipsis-h mr-3" />
                        </div>
                    </a-popover>
                </div>
            </div>
        </div>

        <ConfirmDialog
            ref="ConfirmDialog"
            title="Xóa danh mục"
            content="Bạn chắc chắn muốn xóa danh mục này chứ"
            :loading="loading"
            @confirm="deleteCategory"
        />
        <CategoriesDialog ref="CategoriesDialog" />
        <CategoryChildren ref="CategoryChildren" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import CategoriesDialog from '@/components/products/dialogs/Categories.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
    import CategoryChildren from '@/components/products/dialogs/CategoriesChilldren.vue';

    export default {
        components: {
            ConfirmDialog,
            CategoriesDialog,
            CategoryChildren,
        },

        async fetch() {
            await this.fetchData();
        },

        data() {
            return {
                loading: false,
                categorySelected: {},
            };
        },

        computed: {
            ...mapState('products/categories', ['categories']),
        },

        methods: {
            async fetchData() {
                try {
                    await this.$store.dispatch('products/categories/fetchAll');
                } catch (error) {
                    this.$handleError(error);
                }
            },

            async deleteCategory() {
                try {
                    this.loading = true;
                    await this.$api.productCategories.delete(this.categorySelected.id);
                    this.$message.success('Xóa danh mục thành công');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                    this.$message.error('Xóa danh mục thất bại');
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
