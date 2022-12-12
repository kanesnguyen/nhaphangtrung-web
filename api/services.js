export default (axios) => ({
    getAll: (params) => axios.get('/a/services', { params }).then((_) => _.data),
});
