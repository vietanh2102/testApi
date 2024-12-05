import { Drawer, Pagination } from "antd";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useGetProductsQuery } from "../../redux/product.service";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import FilterProducts from "../../components/FilterProducts/FilterProducts";

function Home() {
  const [searchParam, setSearchParam] = useSearchParams();
  const currenPage = searchParam.get("page") || 1;
  const { data, isFetching } = useGetProductsQuery(Number(currenPage));

  const handlePageChange = (page: number) => {
    searchParam.set("page", String(page));
    setSearchParam(searchParam);
  };

  const [showFilter, setShowFilter] = useState(false);
  if (isFetching) {
    return <Loading />;
  }
  return (
    <div className="flex justify-between">
      <div className="hidden md:block w-[275px]">
        <FilterProducts />
      </div>
      <div className="block m-auto">
        <h1 className="text-[18px] text-[#444444] font-bold leading-5 text-center my-9">
          My Products
        </h1>
        <a className="md:hidden" onClick={() => setShowFilter(true)}>
          <FilterOutlined />
          <span className="ml-2 ">Filter</span>
        </a>
        <Drawer
          title="Filter"
          onClose={() => setShowFilter(false)}
          open={showFilter}
          placement="left"
        >
          <FilterProducts />
        </Drawer>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] py-[32px] xl:p-0 ">
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
      </div>
    </div>
  );
}

export default Home;
