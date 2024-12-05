import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../types";
interface GetProductType {
  products: ProductType[];
  totalPage: number;
}
interface GetProductCategory {
  page: number;
  category: string;
}
export const ProductApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductType, number>({
      query: (page) => `products?_page=${page}&_limit=8`,
      transformResponse: (products: ProductType[], meta) => {
        return {
          products,
          totalPage: Number(meta?.response?.headers.get("x-total-count")),
        };
      },
    }),
    getProduct: builder.query<ProductType, number>({
      query: (id) => `products/${id}`,
    }),
    getProductsCategory: builder.query<GetProductType, GetProductCategory>({
      query: ({ page, category }) =>
        `products?category=${category}&_page=${page}&_limit=8`,
      transformResponse: (products: ProductType[], meta) => {
        return {
          products,
          totalPage: Number(meta?.response?.headers.get("x-total-count")),
        };
      },
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsCategoryQuery,
} = ProductApi;
