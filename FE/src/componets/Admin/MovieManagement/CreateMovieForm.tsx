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
import type { UploadFile } from 'antd';
import { uploadToCloudinary } from '../../../util/uploadToCloudinary.js';
import { createMovieApi } from '../../../util/api';
import { Dayjs } from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface CreateMovieFormProps {
    onSubmit?: (data: any) => void;
}

interface FormValues {
    title: string;
    originalTitle: string;
    country: string;
    releaseDate: Dayjs;
    genres: string[];
    description: string;
    poster?: UploadFile[];
}

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

const CreateMovieForm: React.FC<CreateMovieFormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm<FormValues>();

    const onFinish = async (values: FormValues) => {
        try {
            let posterUrl = '';

            console.log("Values từ form:", values);

            if (values.poster && values.poster.length > 0) {
                const fileObj = values.poster?.[0]?.originFileObj as File | undefined;
                if (fileObj) {
                    posterUrl = await uploadToCloudinary(fileObj);
                    console.log("Poster URL:", posterUrl);
                }
            }

            const formatted = {
                title: values.title,
                originalTitle: values.originalTitle,
                country: values.country,
                releaseDate: values.releaseDate.toDate(),
                genres: values.genres,
                description: values.description,
                poster: posterUrl,
            };

            const res = await createMovieApi(formatted);
            console.log('Phim đã được tạo:', res.data);

            message.success('Tạo phim thành công!');
            form.resetFields();
            onSubmit?.(formatted);
        } catch (error) {
            console.error('Lỗi khi tạo phim:', error);
            message.error('Tạo phim thất bại!');
        }
    };

    return (
        <Form<FormValues>
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ padding: '0 20px' }}
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
                        (option?.label as string).toLowerCase().includes(input.toLowerCase())
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

            <Form.Item
                name="poster"
                label="Ảnh poster"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                }}
            >
                <Upload
                    name="poster"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false} // Ngăn upload tự động
                    customRequest={({ onSuccess }) => {
                        setTimeout(() => {
                            onSuccess && onSuccess("ok"); // Giả lập upload thành công
                        }, 0);
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
