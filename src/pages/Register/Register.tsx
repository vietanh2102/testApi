import { Button, Form, Input, message } from "antd";
import { rules } from "../../rules";
import { RegisterType } from "../../types";
import instance from "../../services/api";
import { AxiosError } from "axios";

function Register() {
  const [form] = Form.useForm();
  const handleCLickSubmit = async (value: RegisterType) => {
    await instance
      .post(`register`, value)
      .then((res) => {
        if (res.data) {
          message.success("Register successful");
        }
        form.resetFields();
      })
      .catch((res: AxiosError) => {
        message.error(`${res.response?.data}, Try again`);
      });
  };
  return (
    <div className="w-full max-w-[900px] mx-auto p-4">
      <p className="text-[18px]  font-bold leading-5 text-center">
        Register new account
      </p>
      <Form
        form={form}
        onFinish={handleCLickSubmit}
        id="myForm"
        layout="vertical"
      >
        <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
          <Input size="large" placeholder="Enter your Email" />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={rules.name} hasFeedback>
          <Input size="large" placeholder="Enter your Name" />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={rules.phone} hasFeedback>
          <Input size="large" placeholder="Enter your Phone" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={rules.address}
          hasFeedback
        >
          <Input size="large" placeholder="Enter your Address" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password size="large" placeholder="Enter your Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password
            size="large"
            placeholder="Enter your Confirm Password"
          />
        </Form.Item>
      </Form>
      <Button form="myForm" key="submit" htmlType="submit" type="primary">
        Submit
      </Button>
    </div>
  );
}

export default Register;
