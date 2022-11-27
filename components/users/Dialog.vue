<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${user ? 'Chỉnh sửa' : 'Thêm mới'} thư viện`"
        width="650px"
    >
        <LibraryForm
            ref="libraryForm"
            :type="type"
            :user="user"
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
                {{ user ? 'Cập nhật' : 'Thêm mới' }}
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import LibraryForm from '@/components/users/Form.vue';

    export default {
        components: {
            LibraryForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                user: null,
                type: undefined,
            };
        },

        methods: {
            open(type, user) {
                this.user = user;
                this.type = type;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.user) {
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
                    await this.$api.users.create(form);
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
                    await this.$api.users.update(this.user.id, form);
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
