export const COOKIE_DOMAIN = 'localhost'

export const SYS_API_URL = `http://${COOKIE_DOMAIN}:5001`

export const TRANSACTION_STATUS =  [
    {
        code: 0,
        name: 'Mới'
    },
    {
        code: 1,
        name: 'Thành Công'
    },
    {
        code: 2,
        name: 'Thất bại'
    },
    {
        code: 3,
        name: 'Chờ xác nhận'
    },
];
export const TRANSACTION_TYPE =  [
    {
        code: 0,
        name: 'Nạp tiền'
    },
    {
        code: 1,
        name: 'Rút tiền'
    },
    {
        code: 2,
        name: 'Thanh toán đặt phòng'
    },
    {
        code: 3,
        name: 'Hoàn tiền hủy đặt phòng'
    },
];