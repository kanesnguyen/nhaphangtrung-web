export default (axios) => ({
    getAll: (params) => axios.get('/a/product_categories', { params }).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/product_categories/${id}`).then((_) => _.data),
    create: (data) => axios.post('/a/product_categories', data).then((_) => _.data),
    update: (id, data) => axios.patch(`/a/product_categories/${id}`, data).then((_) => _.data),
    delete: (id) => axios.delete(`/a/product_categories/${id}`).then((_) => _.data),
});
