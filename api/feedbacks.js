export default (axios) => ({
    getAll: (params) => axios.get('/u/feedbacks', { params }).then((_) => _.data),
    getDetail: (feedbackId) => axios.get(`/u/feedbacks/${feedbackId}`).then((_) => _.data),
    create: (data) => axios.post('/u/feedbacks', data).then((_) => _.data),
    update: (feedbackId, data) => axios.patch(`/u/feedbacks/${feedbackId}`, data).then((_) => _.data),
    delete: (feedbackId) => axios.delete(`/u/feedbacks/${feedbackId}`).then((_) => _.data),
    setActive: (feedbackId) => axios.patch(`/u/feedbacks/${feedbackId}/active`).then((_) => _.data),
    setInactive: (feedbackId) => axios.patch(`/u/feedbacks/${feedbackId}/inactive`).then((_) => _.data),
});
