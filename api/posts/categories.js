export default (axios) => ({
    getAll: (params) => axios.get('/s/categories', { params }).then((_) => _.data),
    getDetail: (id) => axios.get(`/s/categories/${id}`).then((_) => _.data),
    create: (data) => axios.post('/s/categories', data).then((_) => _.data),
    update: (id, data) => axios.patch(`/s/categories/${id}`, data).then((_) => _.data),
    delete: (id) => axios.delete(`/s/categories/${id}`).then((_) => _.data),
});
