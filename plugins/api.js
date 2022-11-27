import Auth from '@/api/auth';
import Banners from '@/api/settings/banners';
import Contact from '@/api/settings/contact';
import Feedbacks from '@/api/feedbacks';
import Libraries from '@/api/libraries';
import News from '@/api/news';
import ProductCategories from '@/api/products/categories';
import Partners from '@/api/partners';
import Products from '@/api/products';
import Projects from '@/api/projects';
import Recruitments from '@/api/recruitments';
import Services from '@/api/services';
import Uploaders from '@/api/uploaders';

export default (context, inject) => {
    const factories = {
        auth: Auth(context.$axios),
        banners: Banners(context.$axios),
        contact: Contact(context.$axios),
        feedbacks: Feedbacks(context.$axios),
        libraries: Libraries(context.$axios),
        news: News(context.$axios),
        productCategories: ProductCategories(context.$axios),
        partners: Partners(context.$axios),
        products: Products(context.$axios),
        projects: Projects(context.$axios),
        recruitments: Recruitments(context.$axios),
        services: Services(context.$axios),
        uploader: Uploaders(context.$axios),
    };

    inject('api', factories);
};
