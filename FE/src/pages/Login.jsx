import React from 'react';
import {Button, Checkbox, Form, Input, notification} from 'antd';
import Logo from '../componets/common/Logo.jsx';
import {loginApi} from "../util/api.js";
import {useNavigate} from "react-router-dom";


const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    const navigate = useNavigate();
    const onFinish = async(values) => {
        const {  email, password } = values;
        const  res= await loginApi( email, password)
        if (res && res.EC === 0 && res.accessToken) {
            localStorage.setItem("accessToken", res.accessToken);
            notification.success({ message: "Login success" });
            navigate("/");
        } else {
            notification.error({
                message: res.EM || "Login error",
            });
        }

    };
    return(

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
                    style={{padding: "40px"}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <div className='text-3xl font-bold text-center text-gray-800' style={{marginBottom: "30px"}}>Login
                    </div>
                    <Form.Item
                        label={<span className="text-[16px] font-semibold text-gray-800">Email</span>}
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Invalid email format!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={<span className=" text-[16px] font-semibold text-gray-800">Password</span>}
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password autoComplete="new-password" style={{ width: "400px" }}/>
                    </Form.Item>


                    <Form.Item className="text-center">
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
}


export default Login;