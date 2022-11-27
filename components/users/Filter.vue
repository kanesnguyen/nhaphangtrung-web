<template>
    <div class="grid grid-cols-12 gap-4">
        <SearchFilter
            class="col-span-4 md:col-span-4"
            label="Tìm kiếm"
            placeholder="Tìm kiếm theo tên, nội dung..."
            query="searchKey"
        />
        <SelectRemoteFilter
            class="col-span-4 md:col-span-4"
            placeholder="Danh mục"
            query="categoryIds"
            router
            label="Danh mục"
            option-label="name"
            option-value="id"
            store="posts.categories"
            store-prop="categories"
        />
        <SelectFilter
            class="col-span-4 md:col-span-4"
            label="Trạng thái"
            placeholder="Trạng thái"
            query="status"
            :options="USER_STATUS_OPTIONS"
        />
    </div>
</template>

<script>
    import { USER_STATUS_OPTIONS } from '@/constants/users/status';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectRemoteFilter from '@/components/filters/SelectRemote.vue';
    import SelectFilter from '@/components/filters/Select.vue';

    export default {
        components: {
            SearchFilter,
            SelectFilter,
            SelectRemoteFilter,
        },

        data() {
            return {
                USER_STATUS_OPTIONS,
            };
        },
    };
</script>
