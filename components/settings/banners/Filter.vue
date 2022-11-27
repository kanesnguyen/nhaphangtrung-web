<template>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SearchFilter
            label="Tìm kiếm"
            placeholder="Tìm kiếm theo tiêu đề..."
            query="freeWord"
        />
        <SelectFilter
            label="Loại"
            placeholder="Loại"
            query="type"
            :clearable="false"
            :options="BANNER_TYPE_OPTIONS"
        />
        <SelectFilter
            label="Vị trí"
            placeholder="Vị trí"
            query="position"
            :options="BANNER_POSITION_OPTIONS"
        />
        <SelectFilter
            label="Trạng thái"
            placeholder="Trạng thái"
            query="status"
            :options="BANNER_STATUS_OPTIONS"
        />
    </div>
</template>

<script>
    import _assign from 'lodash/assign';
    import { BANNER_STATUS_OPTIONS } from '@/constants/settings/banner/status';
    import { BANNER_POSITION_OPTIONS } from '@/constants/settings/banner/position';
    import { BANNER_TYPE, BANNER_TYPE_OPTIONS } from '@/constants/settings/banner/type';
    import SearchFilter from '@/components/filters/Search.vue';
    import SelectFilter from '@/components/filters/Select.vue';

    export default {
        components: {
            SearchFilter,
            SelectFilter,
        },

        data() {
            return {
                BANNER_TYPE_OPTIONS,
                BANNER_STATUS_OPTIONS,
                BANNER_POSITION_OPTIONS,
            };
        },

        mounted() {
            if (!this.$route.query.type) {
                this.$router.push({
                    query: _assign({}, this.$route.query, {
                        type: BANNER_TYPE.HOMEPAGE,
                    }),
                });
            }
        },
    };
</script>
