export default (axios) => ({
    getAll: (params) => axios.get('/a/projects', { params }).then((_) => _.data),
    getDetail: (id) => axios.get(`/a/projects/${id}`).then((_) => _.data),
    create: (data) => axios.post('/a/projects', data).then((_) => _.data),
    update: (id, data) => axios.patch(`/a/projects/${id}`, data).then((_) => _.data),
    delete: (id) => axios.delete(`/a/projects/${id}`).then((_) => _.data),
    active: (id) => axios.patch(`/a/projects/${id}/active`).then((_) => _.data),
    inActive: (id) => axios.patch(`/a/projects/${id}/inactive`).then((_) => _.data),
});
