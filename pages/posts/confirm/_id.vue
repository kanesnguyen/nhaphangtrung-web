<template>
    <div>
        <div class="card mt-4">
            <div class="flex justify-between items-center">
                <ct-page-header text="Chi tiết bài viết" />
                <div class="flex gap-x-5">
                    <nuxt-link to="/posts/confirm">
                        <a-button>
                            Quay lại
                        </a-button>
                    </nuxt-link>
                    <p @click="() => { $refs.confirmReject.open(), postSelected = post }">
                        <a-button type="primary">
                            Hủy bỏ
                        </a-button>
                    </p>
                    <p @click="() => { $refs.confirmPass.open(), postSelected = post }">
                        <a-button type="primary">
                            Phê duyệt
                        </a-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <ProductForm :isEdit="true" :post="post" />
        </div>
        <ConfirmDialog
            ref="confirmReject"
            title="Không phê duyệt bài viết"
            content="Bạn chắc chắn không phê duyệt bài viết ?"
            @confirm="confirmReject"
        />
        <ConfirmDialog
            ref="confirmPass"
            title="Duyệt bài viết"
            content="Bạn chắc chắn duyệt bài viết này chứ ?"
            @confirm="confirmPass"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ProductForm from '@/components/posts/Form.vue';
    import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';

    export default {
        components: {
            ProductForm,
            ConfirmDialog,
        },

        async asyncData({ store, params }) {
            await store.dispatch('posts/fetchDetail', params);
        },

        data() {
            return {
                loading: false,
                postSelected: null,
            };
        },

        computed: {
            ...mapState('posts', ['post']),
        },

        watch: {
            '$route.query': {
                handler() {
                    this.fetchData();
                },
            },
        },

        mounted() {
            this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [{
                label: 'Bài viết',
                link: '/posts/confirm',
            }]);
        },

        methods: {
            async confirmReject() {
                try {
                    await this.$api.postConfirms.reject(this.postSelected.slug);
                    this.$message.success('Thao tác thành công');
                    this.$router.push('/posts/confirm');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
            async confirmPass() {
                try {
                    await this.$api.postConfirms.confirm(this.postSelected.slug);
                    this.$message.success('Phê duyệt thành công');
                    this.$router.push('/posts/confirm');
                    this.$nuxt.refresh();
                } catch (e) {
                    this.$handleError(e);
                }
            },
        },

        head() {
            return {
                title: 'Xem chi tiết bài viết',
            };
        },
    };
</script>
