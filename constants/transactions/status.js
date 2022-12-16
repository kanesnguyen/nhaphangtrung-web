export const TRANSACTION_STATUS = {
    SUCCESS: 'success',
    CANCEL: 'cancel',
    WAIT: 'wait',
};

export const TRANSACTION_STATUS_OPTIONS = [{
    label: 'Thành công',
    value: TRANSACTION_STATUS.SUCCESS,
    color: 'green',
}, {
    label: 'Đã hủy',
    value: TRANSACTION_STATUS.CANCEL,
    color: 'red',
}, {
    label: 'Chờ duyệt',
    value: TRANSACTION_STATUS.WAIT,
    color: 'yellow',
}];
