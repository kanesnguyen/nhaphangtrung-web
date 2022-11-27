export default (axios) => ({
    getAll: (params) => axios.get('/a/users', { params }).then((_) => _.data),
    getDetail: (libraryId) => axios.get(`/a/users/${libraryId}`).then((_) => _.data),
    create: (data) => axios.post('/a/users', data).then((_) => _.data),
    update: (libraryId, data) => axios.patch(`/a/users/${libraryId}`, data).then((_) => _.data),
    delete: (libraryId) => axios.delete(`/a/users/${libraryId}`).then((_) => _.data),
});
