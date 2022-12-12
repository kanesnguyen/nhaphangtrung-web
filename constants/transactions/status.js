export const TRANSACTION_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    WAIT: 'wait',
};

export const TRANSACTION_STATUS_OPTIONS = [{
    label: 'Đã xử lý',
    value: TRANSACTION_STATUS.ACTIVE,
    color: 'green',
}, {
    label: 'Đã hủy',
    value: TRANSACTION_STATUS.INACTIVE,
    color: 'red',
}, {
    label: 'Chờ duyệt',
    value: TRANSACTION_STATUS.WAIT,
    color: 'yellow',
}];
