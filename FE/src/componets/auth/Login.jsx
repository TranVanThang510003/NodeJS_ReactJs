import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import Logo from '../common/Logo.jsx';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const onFinish = async (values) => {
    const { email, password } = values;
    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      notification.success({ message: "Login success" });
      navigate("/");
    } else {
      notification.error({
        message: resultAction.payload || "Login error",
      });
    }
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/img/register.jpg')" }}
    >
      <div className="absolute top-4 left-4 flex items-center ">
        <Logo width={60} height={60}/>
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-3xl">
        <Form
          name="basic"
          style={{ padding: "40px" }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <div className="text-3xl font-bold text-center text-gray-800 mb-6">Login</div>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid email format!' }
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password autoComplete="new-password" style={{ width: "400px" }}/>
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
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
            <div className="mt-4 text-sm text-gray-700">
              Don't have an account?{' '}
              <span
                className="text-blue-700 hover:underline cursor-pointer"
                onClick={() => navigate('/register')}
              >
            Register here
            </span>
            </div>


    </Form.Item>
</Form>
</div>
</div>
)
  ;
};

export default Login;
