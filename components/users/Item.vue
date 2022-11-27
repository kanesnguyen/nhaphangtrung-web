<template>
    <div class="card space-y-4">
        <i class="far fa-file-alt text-6xl text-prim-100" />
        <div>
            <div class="font-semibold text-xl line-clamp-1" :title="user.name">
                {{ user.name }}
            </div>
            <div class="text-gray-60 line-clamp-1" :title="user.fileName">
                {{ user.fileName }}
            </div>
            <div class="text-sm text-gray-60">
                {{ user.createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <a-button @click="$refs.libraryDialog.open(user)">
                Chỉnh sửa
            </a-button>
            <a-button type="danger" ghost @click="$refs.libraryDeleteDialog.open(user)">
                xóa
            </a-button>
        </div>
        <LibraryDialog ref="libraryDialog" />
        <LibraryDeleteDialog ref="libraryDeleteDialog" />
    </div>
</template>

<script>
    import LibraryDialog from '@/components/users/Dialog.vue';
    import LibraryDeleteDialog from '@/components/users/dialogs/Delete.vue';

    export default {
        components: {
            LibraryDialog,
            LibraryDeleteDialog,
        },

        props: {
            user: {
                type: Object,
                required: true,
            },
        },
    };
</script>
