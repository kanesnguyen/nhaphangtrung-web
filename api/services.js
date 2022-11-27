export default (axios) => ({
    getAll: (params) => axios.get('/a/services', { params }).then((_) => _.data),
    getDetail: (adsId) => axios.get(`/a/services/${adsId}`).then((_) => _.data),
    create: (data) => axios.post('/a/services', data).then((_) => _.data),
    update: (adsId, data) => axios.patch(`/a/services/${adsId}`, data).then((_) => _.data),
    delete: (adsId) => axios.delete(`/a/services/${adsId}`).then((_) => _.data),
    setActive: (adsId) => axios.patch(`/a/services/${adsId}/active`).then((_) => _.data),
    setInactive: (adsId) => axios.patch(`/a/services/${adsId}/inactive`).then((_) => _.data),
});
