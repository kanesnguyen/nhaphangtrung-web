export default (axios) => ({
    updateProfile: (data) => axios.patch('/a/accounts', data).then((_) => _.data),
    updatePassword: (data) => axios.patch('/a/accounts/change_password', data).then((_) => _.data),

    // password
    forgotPassword: (data) => axios.post('/a/passwords/forgot_password', data).then((_) => _.data),
    verifyOtp: (data) => axios.post('/a/passwords/verify_otp', data).then((_) => _.data),
    newPassword: (email, token, data) => axios.post(`/a/passwords?email=${email}&token=${token}`, data).then((_) => _.data),
});
