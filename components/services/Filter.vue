<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SearchFilter
            class="col-span-2"
            label="Tìm kiếm"
            placeholder="Tìm kiếm theo tên, nội dung..."
            query="searchKey"
        />
        <SelectFilter
            class="col-span-2"
            label="Trạng thái"
            placeholder="Trạng thái"
            query="status"
            :options="SERVICES_STATUS_OPTIONS"
        />
    </div>
</template>

<script>
    import { SERVICES_STATUS_OPTIONS } from '@/constants/services/status';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';

    export default {
        components: {
            SearchFilter,
            SelectFilter,
        },

        data() {
            return {
                SERVICES_STATUS_OPTIONS,
            };
        },
    };
</script>
