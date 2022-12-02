<template>
    <div class="bg-[#fff] h-full  rounded-md  py-3 mb-4">
        <h4 class="text-center mb-3">
            Người dùng mới
        </h4>
        <a-empty v-if="list.length === 0 " description="Không có thông tin" />
        <div v-else>
            <RecycleScroller
                class="scroller"
                :items="list"
                :item-size="56"
                key-field="id"
            >
                <div class="">
                    <RowAvtar />
                </div>a
            </RecycleScroller>
        </div>
    </div>
</template>

<script>
    import { RecycleScroller } from 'vue-virtual-scroller';

    export default {
        components: {
            RecycleScroller,
        },

        props: {
        },

        data() {
            return {
                list: [

                ],
            };
        },
    };
</script>

<style lang="scss">
</style>
