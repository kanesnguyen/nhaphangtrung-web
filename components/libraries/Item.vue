<template>
    <div class="card space-y-4">
        <i class="far fa-file-alt text-6xl text-prim-100" />
        <div>
            <div class="font-semibold text-xl line-clamp-1" :title="library.name">
                {{ library.name }}
            </div>
            <div class="text-gray-60 line-clamp-1" :title="library.fileName">
                {{ library.fileName }}
            </div>
            <div class="text-sm text-gray-60">
                {{ library.createdAt | dateFormat('HH:mm dd/MM/yyyy') }}
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <a-button @click="$refs.libraryDialog.open(library)">
                Chỉnh sửa
            </a-button>
            <a-button type="danger" ghost @click="$refs.libraryDeleteDialog.open(library)">
                xóa
            </a-button>
        </div>
        <LibraryDialog ref="libraryDialog" />
        <LibraryDeleteDialog ref="libraryDeleteDialog" />
    </div>
</template>

<script>
    import LibraryDialog from '@/components/libraries/Dialog.vue';
    import LibraryDeleteDialog from '@/components/libraries/dialogs/Delete.vue';

    export default {
        components: {
            LibraryDialog,
            LibraryDeleteDialog,
        },

        props: {
            library: {
                type: Object,
                required: true,
            },
        },
    };
</script>
