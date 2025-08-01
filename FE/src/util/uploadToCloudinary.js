import axios from 'axios';

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset"); // Đảm bảo preset đúng

    try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dydblio2c/image/upload", // Xác nhận cloud_name
            formData
        );
        console.log("Upload thành công, URL:", res.data.secure_url);
        return res.data.secure_url;
    } catch (error) {
        console.error("Lỗi upload:", error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở form
    }
};