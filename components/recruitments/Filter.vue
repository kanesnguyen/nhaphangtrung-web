<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SearchFilter
            class="col-span-2"
            label="Tìm kiếm"
            placeholder="Tìm kiếm theo tên, nội dung..."
            query="freeWord"
        />
        <SelectFilter
            class="col-span-2 md:col-span-1"
            label="Trạng thái"
            placeholder="Trạng thái"
            query="status"
            :options="RECRUITMENT_STATUS_OPTIONS"
        />
    </div>
</template>

<script>
    import { RECRUITMENT_STATUS_OPTIONS } from '@/constants/recruitment/status';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';

    export default {
        components: {
            SearchFilter,
            SelectFilter,
        },

        data() {
            return {
                RECRUITMENT_STATUS_OPTIONS,
            };
        },
    };
</script>
