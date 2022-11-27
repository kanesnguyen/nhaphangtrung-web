<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${library ? 'Chỉnh sửa' : 'Thêm mới'} thư viện`"
        width="650px"
    >
        <LibraryForm
            ref="libraryForm"
            :type="type"
            :library="library"
            @submit="handleSubmit"
        />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.libraryForm.submit()"
            >
                {{ library ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import LibraryForm from '@/components/libraries/Form.vue';

    export default {
        components: {
            LibraryForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                library: null,
                type: undefined,
            };
        },

        methods: {
            open(type, library) {
                this.library = library;
                this.type = type;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.library) {
                    await this.updateLibrary(form);
                } else {
                    await this.createLibrary(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createLibrary(form) {
                try {
                    this.loading = true;
                    await this.$api.libraries.create(form);
                    this.close();
                    this.$message.success('Thêm thư viện thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateLibrary(form) {
                try {
                    this.loading = true;
                    await this.$api.libraries.update(this.library.id, form);
                    this.close();
                    this.$message.success('Cập nhật thông tin thư viện thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
