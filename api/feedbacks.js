export default (axios) => ({
    getAll: (params) => axios.get('/u/feedbacks', { params }).then((_) => _.data),
    create: (data) => axios.post('/u/feedbacks', data).then((_) => _.data),
});
