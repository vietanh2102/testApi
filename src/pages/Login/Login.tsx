import { Button, Form, Input, message } from "antd";
import { rules } from "../../rules";
import { publicInstance } from "../../services/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/user.slice";

function Login() {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = (value: User) => {
    (async () => {
      await publicInstance
        .post(`login`, value)
        .then((res) => {
          if (res.data) {
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("id", res.data.user.id);
            localStorage.setItem("name", res.data.user.name);
            const user = {
              id: res.data.user.id,
              name: res.data.user.name,
              token: res.data.accessToken,
            };
            dispatch(loginUser(user));
            nav("/");
          }
          message.success("Login successful");
        })
        .catch((res: AxiosError) => {
          message.error(`${res.response?.data} . Try again`);
        });
    })();
  };
  return (
    <div className="w-full max-w-[900px] mx-auto p-4">
      <p className="text-[18px]  font-bold leading-5 text-center">Login</p>
      <Form form={form} onFinish={handleLogin} id="myForm" layout="vertical">
        <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
          <Input size="large" placeholder="Enter your Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Enter your Password" />
        </Form.Item>
      </Form>
      <Button form="myForm" key="submit" htmlType="submit" type="primary">
        Login
      </Button>
    </div>
  );
}

export default Login;
