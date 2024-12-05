export interface ProductType {
  title: string;
  price: number;
  color: string;
  category: string;
  detail: string;
  image: string[];
  id: number;
  size: string[];
}
export interface CartType extends Omit<ProductType, "size"> {
  quantity: number;
  size: string;
  total: number | string;
}
export interface RegisterType {
  email: string;
  name: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}
export interface ProfileUser extends RegisterType {
  id: number;
  cart: CartType[];
}
export interface User {
  id: number;
  name: string;
  token: string;
}

export interface UpdateCartItemType {
  id: number;
  size: string;
}
export interface FilterType {
  color: string;
  detail: string;
  price: number[];
}
