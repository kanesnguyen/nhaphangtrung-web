export default (axios) => ({
    getAll: (params) => axios.get('/u/transactions', { params }).then((_) => _.data),
    getDetail: (transactionId) => axios.get(`/u/transactions/${transactionId}`).then((_) => _.data),
});
