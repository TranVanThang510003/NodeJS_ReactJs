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

    const onFinish = (values) => {
        const formatted = {
            ...values,
            releaseDate: values.releaseDate.format('YYYY-MM-DD'),
            genres: values.genres,
            poster: values.poster?.file?.name || '',
            video: values.video?.file?.name || values.videoUrl || '',
        };
        console.log('Dữ liệu phim:', formatted);
        onSubmit(formatted);
        message.success('Tạo phim thành công!');
        form.resetFields();
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
                <Upload name="poster" listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
            </Form.Item>

            <Form.Item name="videoUrl" label="Link video (nếu có)">
                <Input placeholder="https://example.com/video.mp4" />
            </Form.Item>

            <Form.Item name="video" label="Hoặc upload video" valuePropName="file">
                <Upload name="video" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Tải video lên</Button>
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
