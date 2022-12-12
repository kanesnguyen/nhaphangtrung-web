export const FEEDBACK_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    WAIT: 'wait',
};

export const FEEDBACK_STATUS_OPTIONS = [{
    label: 'Đã xử lý',
    value: FEEDBACK_STATUS.ACTIVE,
    color: 'green',
}, {
    label: 'Đã hủy',
    value: FEEDBACK_STATUS.INACTIVE,
    color: 'red',
}, {
    label: 'Chờ duyệt',
    value: FEEDBACK_STATUS.WAIT,
    color: 'yellow',
}];
