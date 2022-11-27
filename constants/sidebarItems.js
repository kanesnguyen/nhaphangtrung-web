export default [{
    route: '/',
    label: 'Dịch vụ',
    icon: 'fas fa-home',
}, {
    route: '/products',
    label: 'Sản phẩm',
    icon: 'fas fa-cube',
    childs: [{
        label: 'Danh sách sản phẩm',
        route: '/products',
    }, {
        label: 'Danh mục sản phẩm',
        route: '/products/categories',
    }],
}, {
    route: '/projects',
    label: 'Dự án',
    icon: 'fas fa-file-invoice',
}, {
    route: '/news',
    label: 'Tin tức',
    icon: 'fas fa-newspaper',
}, {
    route: '/libraries',
    label: 'Thư viện',
    icon: 'fas fa-images',
    childs: [{
        label: 'Chứng chỉ',
        route: '/libraries/certificate',
    }, {
        label: 'Profile',
        route: '/libraries/profile',
    }],
}, {
    label: 'Tuyển dụng',
    route: '/recruitments',
    icon: 'fas fa-address-card',
}, {
    route: '/partners',
    label: 'Đối tác',
    icon: 'far fa-list-alt',
}, {
    route: '/feedbacks',
    label: 'Phản hồi khách hàng',
    icon: 'fas fa-comments',
}, {
    route: '/settings',
    label: 'Cài đặt hệ thống',
    icon: 'fas fa-cog',
    childs: [{
        label: 'Banner',
        route: '/settings/banners',
    }, {
        route: '/settings/contact',
        label: 'Liên hệ',
        icon: 'fas fa-phone-alt',
    }],
}];
