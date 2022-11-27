import Auth from '@/api/auth';
import Feedbacks from '@/api/feedbacks';
import Users from '@/api/users';
import Ads from '@/api/ads';
import ProductCategories from '@/api/posts/categories';
import Posts from '@/api/posts';
import Services from '@/api/services';
import Uploaders from '@/api/uploaders';

export default (context, inject) => {
    const factories = {
        auth: Auth(context.$axios),
        feedbacks: Feedbacks(context.$axios),
        users: Users(context.$axios),
        ads: Ads(context.$axios),
        postCategories: ProductCategories(context.$axios),
        posts: Posts(context.$axios),
        services: Services(context.$axios),
        uploader: Uploaders(context.$axios),
    };

    inject('api', factories);
};
