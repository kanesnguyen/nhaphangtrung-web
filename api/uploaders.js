export default (axios) => ({
    getFiles: (path) => axios.get(`/uploaders/${path}`).then((_) => _.data),
    uploadImage: (payload) => axios.post('/uploaders/image', payload).then((_) => _.data),
    uploadVideo: (payload) => axios.post('/uploaders/video', payload).then((_) => _.data),
    uploadFile: (payload) => axios.post('/uploaders/file', payload).then((_) => _.data),
});
