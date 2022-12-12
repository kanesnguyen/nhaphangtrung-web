import Auth from '@/api/auth';
import Feedbacks from '@/api/feedbacks';
import Users from '@/api/users';
import Transactions from '@/api/transactions';
import PostCategories from '@/api/posts/categories';
import PostConfirms from '@/api/posts/confirm';
import Posts from '@/api/posts';
import Services from '@/api/services';
import Uploaders from '@/api/uploaders';

export default (context, inject) => {
    const factories = {
        auth: Auth(context.$axios),
        feedbacks: Feedbacks(context.$axios),
        users: Users(context.$axios),
        transactions: Transactions(context.$axios),
        postCategories: PostCategories(context.$axios),
        postConfirms: PostConfirms(context.$axios),
        posts: Posts(context.$axios),
        services: Services(context.$axios),
        uploader: Uploaders(context.$axios),
    };

    inject('api', factories);
};
