export default (axios) => ({
    getAll: (params) => axios.get('/s/feedbacks', { params }).then((_) => _.data),
    getDetail: (feedbackId) => axios.get(`/s/feedbacks/${feedbackId}`).then((_) => _.data),
    create: (data) => axios.post('/s/feedbacks', data).then((_) => _.data),
    update: (feedbackId, data) => axios.patch(`/s/feedbacks/${feedbackId}`, data).then((_) => _.data),
    delete: (feedbackId) => axios.delete(`/s/feedbacks/${feedbackId}`).then((_) => _.data),
    setActive: (feedbackId) => axios.patch(`/s/feedbacks/${feedbackId}/active`).then((_) => _.data),
    setInactive: (feedbackId) => axios.patch(`/s/feedbacks/${feedbackId}/inactive`).then((_) => _.data),
});
