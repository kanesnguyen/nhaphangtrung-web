export default (axios) => ({
    getAll: (params) => axios.get('/a/libraries', { params }).then((_) => _.data),
    getDetail: (libraryId) => axios.get(`/a/libraries/${libraryId}`).then((_) => _.data),
    create: (data) => axios.post('/a/libraries', data).then((_) => _.data),
    update: (libraryId, data) => axios.patch(`/a/libraries/${libraryId}`, data).then((_) => _.data),
    delete: (libraryId) => axios.delete(`/a/libraries/${libraryId}`).then((_) => _.data),
});
