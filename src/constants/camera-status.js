export const CAMERA_STATUS = {
    0: "Hoạt động",
    1: "Không hoạt động",

};

export const formatCameraStatus = (statusCode) => {
    return CAMERA_STATUS[statusCode] || "Unknown Status";
};