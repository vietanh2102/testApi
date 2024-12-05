import { lazy } from "react";

interface RouteType {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Product = lazy(() => import("../pages/Product/Product"));
const PayPage = lazy(() => import("../pages/PayPage/PayPage"));
const TopProducts = lazy(() => import("../pages/TopProducts/TopProducts"));
const PantProducts = lazy(() => import("../pages/PantProducts/PantProducts"));
const Filter = lazy(() => import("../pages/FilterPage/FilterPage"));

const publicRoutes: RouteType[] = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/product/:id", component: Product },
  { path: "/top", component: TopProducts },
  { path: "/pant", component: PantProducts },
  { path: "/filter/:param", component: Filter },
];
const privateRoutes: RouteType[] = [{ path: "/pay", component: PayPage }];
export { publicRoutes, privateRoutes };
