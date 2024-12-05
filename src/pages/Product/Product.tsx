import {
  Button,
  Carousel,
  InputNumber,
  InputNumberProps,
  message,
  Radio,
  RadioChangeEvent,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/product.service";
import styled from "styled-components";
import { createRef, RefObject, useEffect, useState } from "react";
import sizeImg from "../../assets/size.webp";
import { CartType, ProductType } from "../../types";
import { publicInstance } from "../../services/api";
import CardProduct from "../../components/CardProduct/CardProduct";
import Loading from "../../components/Loading/Loading";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/cart.slice";
import { valueType } from "antd/es/statistic/utils";
import { CarouselRef } from "antd/es/carousel";
const CarouselWrapper = styled(Carousel)`
  > .slick-arrow {
    color: black;
  }
  > .slick-dots li button {
    background: black;
    opacity: 30%;
  }
  > .slick-dots li.slick-active button {
    background: black;
  }
`;
function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useGetProductQuery(Number(id));
  const [similarProduct, setSimilarProduct] = useState<ProductType[]>([]);
  const carouselRef: RefObject<CarouselRef> = createRef<CarouselRef>();
  useEffect(() => {
    const getSimilarProduct = async () => {
      const res = await publicInstance.get(
        `products?detail=${data?.detail}&_limit=4`
      );
      if (res.data) {
        setSimilarProduct(res.data);
      }
    };
    getSimilarProduct();
  }, [data]);
  const [size, setSize] = useState("");
  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  const [quantity, setQuantity] = useState<valueType | null>(1);
  const handleQuantityChange: InputNumberProps["onChange"] = (value) => {
    setQuantity(value);
  };
  const dispatch = useDispatch();
  const handleClickAddCart = () => {
    if (size === "") {
      return message.error("Please select size");
    }
    if (data) {
      const item: CartType = {
        ...data,
        size: size,
        quantity: Number(quantity),
        total: Number(quantity) * Number(data.price),
      };
      dispatch(addCart(item));
      message.success("Add successful");
    }
  };
  const handleClickBuy = () => {
    if (size === "") {
      return message.error("Please select size");
    }
    handleClickAddCart();
    navigate("/pay");
  };

  return isFetching ? (
    <Loading />
  ) : (
    <>
      <div className="block lg:flex px-8 ">
        <div className="w-full mx-auto md:max-w-[500px]">
          <CarouselWrapper arrows infinite={true} ref={carouselRef}>
            {data?.image.map((item, index) => (
              <div key={index}>
                <img className="mx-auto" src={item} alt="img" />
              </div>
            ))}
          </CarouselWrapper>
          <div className="flex gap-2 mt-2">
            {data?.image.map((item, index) => (
              <img
                src={item}
                key={item}
                alt="img"
                className="max-w-[100px] border cursor-pointer"
                onClick={() => carouselRef.current?.goTo(index)}
              />
            ))}
          </div>
        </div>

        <div className=" mt-8  lg:flex-1 lg:mt-0 ml-8">
          <div className="text-center font-bold ">{data?.title}</div>
          <div className="text-center">{data?.price.toLocaleString()}đ</div>
          <div className="w-full mt-8 text-left">
            <h1 className=" font-bold  mb-[5px]">Size:</h1>
            <Radio.Group value={size} onChange={handleSizeChange}>
              {data?.size.map((item) => (
                <Radio.Button value={item} key={item}>
                  {item}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <div className="w-full mt-8 text-left">
            <h1 className=" font-bold  mb-[5px]">Quantity:</h1>
            <InputNumber
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="mt-4">
            <Button
              size="large"
              type="primary"
              block
              className="mb-2"
              onClick={handleClickAddCart}
            >
              Add to cart
            </Button>
            <Button
              size="large"
              block
              className="bg-red"
              onClick={handleClickBuy}
            >
              Buy Now
            </Button>
          </div>
          <p className="font-bold  mt-8">Table Size:</p>
          <img
            className="max-w-[300px]  mx-auto"
            src={sizeImg}
            alt="size img"
          />
        </div>
      </div>
      <div className="mt-8 px-8">
        <p className="text-[24px] font-medium leading-5 text-center my-12">
          You may be interested in
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 ">
          {similarProduct.map((item) => (
            <CardProduct product={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
