import { Link } from "react-router-dom";
import { ProductType } from "../../types";

interface Props {
  product: ProductType;
}
function CardProduct({ product }: Props) {
  const { id, image, title, price } = product;

  return (
    <div className=" overflow-hidden  relative group">
      <div className="w-full flex justify-center items-center  h-auto">
        <div className=" flex justify-center items-center ">
          <Link to={`/product/${id}`}>
            <img
              className="w-full max-h-[208px]  group-hover:scale-105 transition duration-300"
              src={image[0]}
              alt="img"
            />
          </Link>
        </div>
      </div>

      <div className="text-center my-[10px]  ">
        <Link
          className="group-hover:underline  group-hover:text-red-500 line-clamp-1 max-w-[212px] mx-auto"
          to={`/product/${id}`}
        >
          {title}
        </Link>
        <div className=" font-semibold">
          {price.toLocaleString()}
          <span className=" underline decoration-slice">đ</span>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
