import {
  DeleteOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Dropdown, MenuProps, message } from "antd";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import Path from "../../components/Path/Path";
import { RootState } from "../../redux/store";
import { logoutUser } from "../../redux/user.slice";
import {
  deIncreaseItem,
  increaseItem,
  removeItem,
} from "../../redux/cart.slice";

function Header() {
  const nav = useNavigate();
  const [bar, setBar] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const cartState = useSelector((state: RootState) => state.carts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const totalItem = cartState.cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  const totalPrice = cartState.cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.price;
  }, 0);

  const handleCLickPay = () => {
    if (user.user.token) {
      nav("/pay");
    } else {
      nav("/login");
      message.info("Login to pay");
    }
    setOpenDrawer(false);
  };

  const showDrawerCart = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawerCart = () => {
    setOpenDrawer(false);
  };
  const items: MenuProps["items"] = [
    {
      label: <Link to={"/"}>Logout</Link>,
      key: "logout",
    },
    {
      label: <Link to={"/pay"}>Your order</Link>,
      key: "order",
    },
  ];
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      dispatch(
        logoutUser({
          id: NaN,
          name: "",
          token: "",
        })
      );
      nav("/");
      message.success("Logout successful");
    }
  };
  return (
    <>
      <header className="w-[100%] mx-auto z-10 h-[80px] flex items-center justify-between fixed top-0 bg-[#f6f8fa] shadow-indigo-500/40 border-b border-slate-300 px-8 md:px-0 md:justify-around ">
        <div className="text-[18px] text-[#444444] font-bold leading-5">
          SHOP
        </div>
        <div className="hidden gap-[16px] md:flex">
          <Path path="/" title="Home" />
          <Path path="/top" title="Top" />
          <Path path="/pant" title="Pant" />
        </div>
        <div className="flex items-center gap-[8px] ">
          {user.user.name ? (
            <Dropdown menu={{ items, onClick }}>
              <Button onClick={(e) => e.preventDefault()}>
                {user.user.name}
                <UserOutlined />
              </Button>
            </Dropdown>
          ) : (
            <>
              <Button>
                <Link to={"/login"}>Login</Link>
              </Button>
              <Button type="primary">
                <Link to={"/register"}>Register</Link>
              </Button>
            </>
          )}
          <Badge count={totalItem} onClick={showDrawerCart}>
            <ShoppingCartOutlined className="text-[22px] cursor-pointer" />
          </Badge>
          <div className="block md:hidden ml-6" onClick={() => setBar(true)}>
            <MenuOutlined />
          </div>
          <Drawer
            title="Cart"
            onClose={onCloseDrawerCart}
            open={openDrawer}
            footer={
              <div className="flex justify-between py-4">
                <p className="text-[20px] font-bold ">
                  <span className="text-red-400">Total: </span>
                  {totalPrice.toLocaleString()}đ
                </p>
                <Button onClick={handleCLickPay}>Pay now</Button>
              </div>
            }
          >
            {cartState.cart.map((item, index) => (
              <div className="flex mb-4" key={index}>
                <img src={item.image[0]} alt="img" className="max-w-[150px]" />
                <div className="ml-2">
                  <p className="text-base font-semibold line-clamp-1 mb-2">
                    {item.title}
                  </p>
                  <p className=" my-2">Size: {item.size}</p>
                  <div className="flex items-center my-2">
                    <p className="mr-2">Quantity:</p>

                    <Button
                      size="small"
                      onClick={() =>
                        dispatch(
                          deIncreaseItem({ id: item.id, size: item.size })
                        )
                      }
                    >
                      <MinusOutlined />
                    </Button>
                    <p className="mx-2"> {item.quantity}</p>
                    <Button
                      size="small"
                      onClick={() =>
                        dispatch(increaseItem({ id: item.id, size: item.size }))
                      }
                    >
                      <PlusOutlined />
                    </Button>
                  </div>
                  <p className=" my-2">
                    Price: {(item.price * item.quantity).toLocaleString()}đ
                  </p>
                  <Button
                    size="small"
                    onClick={() =>
                      dispatch(removeItem({ id: item.id, size: item.size }))
                    }
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            ))}
          </Drawer>
        </div>
        <Drawer onClose={() => setBar(false)} open={bar}>
          <Path path="/" title="Home" setBar={setBar} />
          <Path path="/top" title="Top" setBar={setBar} />
          <Path path="/pant" title="Pant" setBar={setBar} />
        </Drawer>
      </header>
    </>
  );
}

export default Header;
