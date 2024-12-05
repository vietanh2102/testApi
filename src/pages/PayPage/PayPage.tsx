import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Table, TableProps } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { CartType, RegisterType } from "../../types";
import { rules } from "../../rules";
import { publicInstance } from "../../services/api";

function PayPage() {
  const cart = useAppSelector((state) => state.carts);
  const totalPrice = cart.cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.price;
  }, 0);
  const user = useAppSelector((state) => state.user);
  const [form] = Form.useForm();
  const handleClickOrder = async (
    value: Omit<RegisterType, "password" | "confirmPassword">
  ) => {
    const orderInfo = {
      idUser: user.user.id,
      cartInfo: {
        info: value,
        orderAt: new Date().toDateString(),
      },
      carts: cart.cart,
    };
    try {
      await publicInstance.post(`orders`, orderInfo);
      message.success("Order successful");
      form.resetFields();
    } catch (err) {
      console.log(err);
      message.error("Try again");
    }
  };
  const columns: TableProps<CartType>["columns"] = [
    {
      title: "Product",
      dataIndex: "image",
      key: "image",
      render: (src: string[]) => <img src={src[0]} alt="img" />,
      width: 150,
    },
    {
      title: "",
      dataIndex: "title",
      key: "title",
      render: (text: string[]) => <p className="text-left">{text}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text: number) => <p>{text.toLocaleString()}đ</p>,
    },
  ];
  return (
    <>
      <div className="flex text-[38px] my-6">
        <ShoppingCartOutlined />
        <p className=" font-light ml-2">Your Order</p>
      </div>
      <Table<CartType>
        columns={columns}
        dataSource={cart.cart}
        pagination={false}
        rowKey={(columns) => columns.id}
      />
      <div className="flex justify-end my-8">
        <p className="text-[22px] font-bold">
          Total:{" "}
          <span className="text-red-400">{totalPrice.toLocaleString()}đ</span>
        </p>
      </div>
      <div className="my-8">
        <p className="text-[22px] font-bold my-8">Information:</p>
        <Form
          form={form}
          onFinish={handleClickOrder}
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
        </Form>
        <Flex justify="end">
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            Order
          </Button>
        </Flex>
      </div>
    </>
  );
}

export default PayPage;
