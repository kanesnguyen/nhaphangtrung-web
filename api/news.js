export default (axios) => ({
    getAll: (params) => axios.get('/a/news', { params }).then((_) => _.data),
    getDetail: (newsId) => axios.get(`/a/news/${newsId}`).then((_) => _.data),
    create: (data) => axios.post('/a/news', data).then((_) => _.data),
    update: (newsId, data) => axios.patch(`/a/news/${newsId}`, data).then((_) => _.data),
    delete: (newsId) => axios.delete(`/a/news/${newsId}`).then((_) => _.data),
    setActive: (newsId) => axios.patch(`/a/news/${newsId}/active`).then((_) => _.data),
    setInactive: (newsId) => axios.patch(`/a/news/${newsId}/inactive`).then((_) => _.data),
});
