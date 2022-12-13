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

export const FEEDBACK_TYPE = {
    WEIGHT: 'weight',
    DIRTY: 'dirty',
    SERVICE: 'service',
    WRONG: 'wrong',
    SLOW: 'slow',
};

export const FEEDBACK_TYPE_OPTIONS = [{
    label: 'Chiếu khấu cân nặng',
    value: FEEDBACK_TYPE.WEIGHT,
    color: 'orange',
}, {
    label: 'Hàng bị vỡ, ướt, bẩn',
    value: FEEDBACK_TYPE.DIRTY,
    color: 'red',
}, {
    label: 'Chất lượng dịch vụ',
    value: FEEDBACK_TYPE.SERVICE,
    color: 'yellow',
}, {
    label: 'Hàng thiếu, nhầm sai, nhầm hàng',
    value: FEEDBACK_TYPE.WRONG,
    color: 'pink',
}, {
    label: 'Hàng về chậm',
    value: FEEDBACK_TYPE.SLOW,
    color: 'blue',
}];
