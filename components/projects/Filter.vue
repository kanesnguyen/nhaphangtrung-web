<template>
    <div class="grid grid-cols-12 gap-8 bg-white rounded px-8 py-5">
        <SearchFilter
            label="Tìm kiếm"
            size="large"
            class="col-span-6"
        />
        <SelectFilter
            label="Trạng thái"
            query="status"
            :options="STATUS_OPTIONS"
            size="large"
            placeholder="Vui lòng chọn"
            class="col-span-6"
        />
    </div>
</template>

<script>
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';
    import { STATUS, STATUS_OPTIONS } from '@/constants/projects/status';

    export default {
        components: {
            SearchFilter,
            SelectFilter,
        },

        data() {
            return {
                STATUS,
                STATUS_OPTIONS,
            };
        },
    };
</script>
