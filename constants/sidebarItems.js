export default [{
    route: '/',
    label: 'Tổng quát',
    icon: 'fas fa-home',
}, {
    route: '/posts',
    label: 'Bài viết',
    icon: 'fas fa-cube',
    childs: [{
        label: 'Danh sách bài viết',
        route: '/posts',
    }, {
        label: 'Cần phê duyệt',
        route: '/posts/confirm',
    }, {
        label: 'Danh mục bài viết',
        route: '/posts/categories',
    }],
}, {
    route: '/ads',
    label: 'Quảng cáo',
    icon: 'fas fa-newspaper',
}, {
    route: '/users',
    label: 'Người dùng',
    icon: 'fas fa-users',
    childs: [{
        label: 'Tác giả',
        route: '/users/author',
    }, {
        label: 'Quản lý',
        route: '/users/manager',
    }],
}, {
    route: '/feedbacks',
    label: 'Phản hồi',
    icon: 'fas fa-comments',
}];
