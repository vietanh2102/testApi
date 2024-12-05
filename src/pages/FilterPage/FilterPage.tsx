import { useEffect, useState } from "react";
import { publicInstance } from "../../services/api";
import { ProductType } from "../../types";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/CardProduct/CardProduct";
import Loading from "../../components/Loading/Loading";

function FilterPage() {
  const { param } = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductType[]>([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await publicInstance.get(`products?${param}`);
      setResult(res.data);
      setLoading(false);
    })();
  }, [param]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <p className="text-[18px] text-[#444444] font-bold leading-5  my-8">
        {result.length === 0 ? "No products available" : "Result filter:"}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px] p-[32px] xl:p-0 ">
        {result?.map((item) => (
          <CardProduct product={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

export default FilterPage;
