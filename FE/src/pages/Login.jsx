import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from '../componets/common/Logo.jsx';
const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const Login = () => (
    <div
        className="relative flex justify-center items-center h-screen bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/img/register.jpg')" }}
    >
        {/* Logo ở góc trái */}
        <div className="absolute top-0 left-0 flex items-center ">
           <Logo width={60} height={60} />
        </div>

        {/* Form đăng ký */}
        <div className="bg-white/30 backdrop-blur-sm rounded-3xl">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: "100%", padding: "60px" }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label={<span className=" text-[16px] font-semibold text-gray-800">Username</span>}
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<span className=" text-[16px] font-semibold text-gray-800">Password</span>}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item label={null}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            backgroundColor: '#2f2f2f',
                            borderColor: '#2f2f2f',
                            color: '#fff',
                            height: "48px",
                            fontSize: "18px",
                            padding: "0 24px",
                            borderRadius: "12px",
                            fontWeight: 600,
                        }}
                    >
                        Log In
                    </Button>

                </Form.Item>
            </Form>
        </div>
    </div>
);

export default Login;