export default (axios) => ({
    getAll: (params) => axios.get('/u/recharges', { params }).then((_) => _.data),
    create: (data) => axios.post('/u/recharges', data).then((_) => _.data),
});
