export default (axios) => ({
    getAll: (type, params) => axios.get(`/a/banners/${type}`, { params }).then((_) => _.data),
    getDetail: (bannerId) => axios.get(`/a/banners/${bannerId}/show`).then((_) => _.data),
    create: (data) => axios.post('/a/banners', data).then((_) => _.data),
    update: (bannerId, data) => axios.patch(`/a/banners/${bannerId}`, data).then((_) => _.data),
    delete: (bannerId) => axios.delete(`/a/banners/${bannerId}`).then((_) => _.data),
    reorder: (type, position, data) => axios.patch(`/a/banners/${type}/${position}/reorder`, data).then((_) => _.data),
});
