export default (axios) => ({
    getAll: (params) => axios.get('/a/services', { params }).then((_) => _.data),
    getDetail: (newsId) => axios.get(`/a/services/${newsId}`).then((_) => _.data),
    create: (data) => axios.post('/a/services', data).then((_) => _.data),
    update: (newsId, data) => axios.patch(`/a/services/${newsId}`, data).then((_) => _.data),
    delete: (newsId) => axios.delete(`/a/services/${newsId}`).then((_) => _.data),
    setActive: (newsId) => axios.patch(`/a/services/${newsId}/active`).then((_) => _.data),
    setInactive: (newsId) => axios.patch(`/a/services/${newsId}/inactive`).then((_) => _.data),
});
