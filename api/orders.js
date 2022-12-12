export default (axios) => ({
    getAll: (params) => axios.get('/u/orders', { params }).then((_) => _.data),
});
