import Auth from '@/api/auth';
import Feedbacks from '@/api/feedbacks';
import Libraries from '@/api/users';
import News from '@/api/ads';
import ProductCategories from '@/api/posts/categories';
import Products from '@/api/posts';
import Services from '@/api/services';
import Uploaders from '@/api/uploaders';

export default (context, inject) => {
    const factories = {
        auth: Auth(context.$axios),
        feedbacks: Feedbacks(context.$axios),
        users: Libraries(context.$axios),
        ads: News(context.$axios),
        productCategories: ProductCategories(context.$axios),
        posts: Products(context.$axios),
        services: Services(context.$axios),
        uploader: Uploaders(context.$axios),
    };

    inject('api', factories);
};
