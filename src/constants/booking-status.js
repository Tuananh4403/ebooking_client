export const BOOKING_STATUS = {
    0: "Đang chờ xác nhận",
    1: "Đã xác nhận",
    2: "Đang trong quá trình",
    3: "Hoàn tất",
    4: "Đã hủy",
    5: "Khách không đến"
};

export const formatBookingStatus = (statusCode) => {
    return BOOKING_STATUS[statusCode] || "Unknown Status";
};