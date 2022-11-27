export default (axios) => ({
    getDetail: () => axios.get('/a/settings').then((_) => _.data),
    update: (data) => axios.patch('/a/settings', data).then((_) => _.data),
});
