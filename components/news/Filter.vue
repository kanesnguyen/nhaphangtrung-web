<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SearchFilter
            class="col-span-2"
            label="Tìm kiếm"
            placeholder="Tìm kiếm theo tên, nội dung..."
            query="freeWord"
        />
        <SelectFilter
            class="col-span-2"
            label="Trạng thái"
            placeholder="Trạng thái"
            query="status"
            :options="NEWS_STATUS_OPTIONS"
        />
    </div>
</template>

<script>
    import { NEWS_STATUS_OPTIONS } from '@/constants/news/status';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';

    export default {
        components: {
            SearchFilter,
            SelectFilter,
        },

        data() {
            return {
                NEWS_STATUS_OPTIONS,
            };
        },
    };
</script>
