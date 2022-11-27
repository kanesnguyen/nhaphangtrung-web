export default (axios) => ({
    getAll: (params) => axios.get('/a/partners', { params }).then((_) => _.data),
    getDetail: (partnerId) => axios.get(`/a/partners/${partnerId}`).then((_) => _.data),
    create: (data) => axios.post('/a/partners', data).then((_) => _.data),
    update: (partnerId, data) => axios.patch(`/a/partners/${partnerId}`, data).then((_) => _.data),
    delete: (partnerId) => axios.delete(`/a/partners/${partnerId}`).then((_) => _.data),
    setActive: (partnerId) => axios.patch(`/a/partners/${partnerId}/active`).then((_) => _.data),
    setInactive: (partnerId) => axios.patch(`/a/partners/${partnerId}/inactive`).then((_) => _.data),
});
