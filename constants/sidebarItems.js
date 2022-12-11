export default [{
    route: '/',
    label: 'Tổng quát',
    icon: 'fas fa-home',
}, {
    route: '/posts',
    label: 'Lĩnh vực kinh doanh',
    icon: 'fas fa-cube',
    childs: [{
        label: 'Tư vấn truyền thông',
        route: '/posts/tu-van-truyen-thong',
    }, {
        label: 'Hệ thống phân phối',
        route: '/posts/he-thong-phan-phoi',
    }, {
        label: 'Thực phẩm dinh dưỡng',
        route: '/posts/thuc-pham-dinh-duong',
    }, {
        label: 'Thực phẩm chức năng',
        route: '/posts/thuc-pham-chuc-nang',
    }, {
        label: 'Logictics',
        route: '/posts/logictics',
    }, {
        label: 'Bất động sản',
        route: '/posts/bat-dong-san',
    }],
}, {
    route: '/feedbacks',
    label: 'Phản hồi',
    icon: 'fas fa-comments',
}];
