export const ORDER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    WAIT: 'wait',
    STOCKING: 'stocking',
};

export const ORDER_STATUS_OPTIONS = [{
    label: 'Đã xử lý',
    value: ORDER_STATUS.ACTIVE,
    color: 'green',
}, {
    label: 'Đã hủy',
    value: ORDER_STATUS.INACTIVE,
    color: 'red',
}, {
    label: 'Chờ duyệt',
    value: ORDER_STATUS.WAIT,
    color: 'yellow',
}, {
    label: 'Còn hàng',
    value: ORDER_STATUS.STOCKING,
    color: 'green',
}];
