import React from 'react';
import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Upload,
    message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadToCloudinary } from '../../../util/uploadToCloudinary.js';
import { createMovieApi } from '../../../util/api.js';

const { TextArea } = Input;
const { Option } = Select;

const genres = [
    { label: '🐉 Tu Tiên', value: 'Tu Tiên' },
    { label: '👻 Dị Giới', value: 'Dị Giới' },
    { label: '🌀 Chuyển Sinh', value: 'Chuyển Sinh' },
    { label: '👽 Viễn Tưởng', value: 'Viễn Tưởng' },
    { label: '🔫 Hành Động', value: 'Hành Động' },
    { label: '🧑‍🤝‍🧑 Tình Yêu', value: 'Tình Yêu' },
    { label: '🏫 Học Đường', value: 'Học Đường' },
    { label: '😈 Kinh Dị', value: 'Kinh Dị' },
    { label: '🏄‍♂️ Thể Thao', value: 'Thể Thao' },
    { label: '🕵️‍♂️ Hình Sự', value: 'Hình Sự' },
    { label: '🐷 Harem', value: 'Harem' },
];

const CreateMovieForm = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            let posterUrl = '';

            // Upload ảnh nếu có
            console.log("Values từ form:", values); // Kiểm tra toàn bộ values
            if (values.poster?.fileList && values.poster.fileList.length > 0) {
                const file = values.poster.fileList[0].originFileObj || values.poster.fileList[0];
                console.log("File được chọn:", file);
                if (file) {
                    posterUrl = await uploadToCloudinary(file);
                    console.log("Poster URL:", posterUrl);
                } else {
                    console.log("File không hợp lệ hoặc không có originFileObj");
                }
            } else {
                console.log("Không có file trong fileList");
            }

            const formatted = {
                title: values.title,
                originalTitle: values.originalTitle,
                country: values.country,
                releaseDate: values.releaseDate.toDate(), // kiểu Date
                genres: values.genres, // array
                description: values.description,
                poster: posterUrl, // link ảnh đã upload
            };

            const res = await createMovieApi(formatted);
            console.log('Phim đã được tạo:', res.data);

            message.success('Tạo phim thành công!');
            form.resetFields();
        } catch (error) {
            console.error('Lỗi khi tạo phim:', error);
            message.error('Tạo phim thất bại!');
        }
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ padding: '60px' }}
            initialValues={{ country: 'Nhật Bản' }}
        >
            <Form.Item name="title" label="Tên phim (Tiếng Việt)" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="originalTitle" label="Tên gốc" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="country" label="Quốc gia" rules={[{ required: true }]}>
                <Select>
                    <Option value="Nhật Bản">Nhật Bản</Option>
                    <Option value="Hàn Quốc">Hàn Quốc</Option>
                    <Option value="Trung Quốc">Trung Quốc</Option>
                </Select>
            </Form.Item>

            <Form.Item name="releaseDate" label="Ngày phát hành" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="genres" label="Thể loại" rules={[{ required: true }]}>
                <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    optionLabelProp="label"
                    placeholder="Chọn thể loại"
                    filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {genres.map((genre) => (
                        <Option key={genre.value} value={genre.value} label={genre.label}>
                            {genre.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item name="poster" label="Ảnh poster" valuePropName="file">
                <Upload
                    name="poster"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false} // Ngăn upload tự động
                    customRequest={({ file, onSuccess }) => {
                        setTimeout(() => {
                            onSuccess("ok"); // Giả lập upload thành công
                        }, 0);
                    }}
                    onChange={(info) => {
                        console.log("File thay đổi:", info.file);
                        if (info.file.status === 'removed') {
                            console.log("File đã bị xóa");
                        }
                    }}
                >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Tạo phim
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateMovieForm;