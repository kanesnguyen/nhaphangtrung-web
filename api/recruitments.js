export default (axios) => ({
    getAll: (params) => axios.get('/a/recruitments', { params }).then((_) => _.data),
    getDetail: (recruitmentId) => axios.get(`/a/recruitments/${recruitmentId}`).then((_) => _.data),
    create: (data) => axios.post('/a/recruitments', data).then((_) => _.data),
    update: (recruitmentId, data) => axios.patch(`/a/recruitments/${recruitmentId}`, data).then((_) => _.data),
    delete: (recruitmentId) => axios.delete(`/a/recruitments/${recruitmentId}`).then((_) => _.data),
    setActive: (recruitmentId) => axios.patch(`/a/recruitments/${recruitmentId}/active`).then((_) => _.data),
    setInactive: (recruitmentId) => axios.patch(`/a/recruitments/${recruitmentId}/inactive`).then((_) => _.data),
});
