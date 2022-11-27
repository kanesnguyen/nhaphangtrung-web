export default (axios) => ({
    getAll: (params) => axios.get('/a/products', { params }).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/products/${id}`).then((_) => _.data),
    create: (data) => axios.post('/a/products', data).then((_) => _.data),
    update: (id, data) => axios.patch(`/a/products/${id}`, data).then((_) => _.data),
    delete: (id) => axios.delete(`/a/products/${id}`).then((_) => _.data),
    active: (id) => axios.patch(`/a/products/${id}/active`).then((_) => _.data),
    inActive: (id) => axios.patch(`/a/products/${id}/inactive`).then((_) => _.data),
});
