import { Pagination } from "antd";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useGetProductsCategoryQuery } from "../../redux/product.service";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

function TopProducts() {
  const [searchParam, setSearchParam] = useSearchParams();
  const currenPage = Number(searchParam.get("page")) || 1;
  const handlePageChange = (page: number) => {
    searchParam.set("page", String(page));
    setSearchParam(searchParam);
  };
  const { data, isFetching } = useGetProductsCategoryQuery({
    page: currenPage,
    category: "top",
  });
  return isFetching ? (
    <Loading />
  ) : (
    <>
      <h1 className="text-[18px] text-[#444444] font-bold leading-5 text-center my-4">
        Top Products
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] pb-4 xl:p-0 max-w-[1170px] mx-auto">
        {data?.products.map((item) => (
          <CardProduct product={item} key={item.id} />
        ))}
      </div>
      <Pagination
        defaultCurrent={Number(currenPage)}
        total={data?.totalPage}
        align="end"
        pageSize={8}
        onChange={handlePageChange}
      />
    </>
  );
}

export default TopProducts;
