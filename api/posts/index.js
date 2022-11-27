export default (axios) => ({
    getAll: (params) => axios.get('/a/posts', { params }).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/posts/${id}`).then((_) => _.data),
    create: (data) => axios.post('/a/posts', data).then((_) => _.data),
    update: (id, data) => axios.patch(`/a/posts/${id}`, data).then((_) => _.data),
    delete: (id) => axios.delete(`/a/posts/${id}`).then((_) => _.data),
    active: (id) => axios.patch(`/a/posts/${id}/active`).then((_) => _.data),
    inActive: (id) => axios.patch(`/a/posts/${id}/inactive`).then((_) => _.data),
});
