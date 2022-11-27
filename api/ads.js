export default (axios) => ({
    getAll: (params) => axios.get('/a/ads', { params }).then((_) => _.data),
    getDetail: (adsId) => axios.get(`/a/ads/${adsId}`).then((_) => _.data),
    create: (data) => axios.post('/a/ads/create', data).then((_) => _.data),
    update: (adsId, data) => axios.patch(`/a/ads/${adsId}/update`, data).then((_) => _.data),
    delete: (adsId) => axios.delete(`/a/ads/${adsId}/delete`).then((_) => _.data),
});
