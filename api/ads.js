export default (axios) => ({
    getAll: (params) => axios.get('/a/ads', { params }).then((_) => _.data),
    getDetail: (adsId) => axios.get(`/a/ads/${adsId}`).then((_) => _.data),
    create: (data) => axios.post('/a/ads', data).then((_) => _.data),
    update: (adsId, data) => axios.patch(`/a/ads/${adsId}`, data).then((_) => _.data),
    delete: (adsId) => axios.delete(`/a/ads/${adsId}`).then((_) => _.data),
    setActive: (adsId) => axios.patch(`/a/ads/${adsId}/active`).then((_) => _.data),
    setInactive: (adsId) => axios.patch(`/a/ads/${adsId}/inactive`).then((_) => _.data),
});
