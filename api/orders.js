export default (axios) => ({
    getAll: (params) => axios.get('/u/orders', { params }).then((_) => _.data),
    getDetail: (orderId) => axios.get(`/u/orders/${orderId}`).then((_) => _.data),
    create: (data) => axios.post('/u/orders', data).then((_) => _.data),
    update: (orderId, data) => axios.patch(`/u/orders/${orderId}`, data).then((_) => _.data),
    delete: (orderId) => axios.delete(`/u/orders/${orderId}`).then((_) => _.data),
    setActive: (orderId) => axios.patch(`/u/orders/${orderId}/active`).then((_) => _.data),
    setInactive: (orderId) => axios.patch(`/u/orders/${orderId}/inactive`).then((_) => _.data),
});
