export const BARN_STATUS = {
    0: "Hoạt động",
    1: "Không hoạt động",
    2: "Săn sàng",
    3: "Chưa sẵn sàng",
    4: "Đang được sử dụng",
};

export const formatBarnStatus = (statusCode) => {
    return BARN_STATUS[statusCode] || "Unknown Status";
};