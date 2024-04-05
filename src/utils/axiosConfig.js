import axios from "axios";
import Cookies from "js-cookie";

const axiosConfig = axios.create({ baseURL: "http://localhost:3000" });
export const request = ({ ...option }) => {
  //   axiosConfig.defaults.headers.common.Authorization = "Bearer token";
  axiosConfig.defaults.headers.common.Accept = "application/json";
  axiosConfig.defaults.headers.common["Content-Type"] = "application/json";
  const onSuccess = (res) => res;
  const onError = (err) => err;
  return axiosConfig(option).then(onSuccess).catch(onError);
};

//========================================================================================getAllProducts
export const getAllProducts = async ()=>{
  return await request({url:"/products"})
}
//========================================================================================getCategoryProducts
export const getCategoryProducts = async (category) => {
  return await request({ url: `/products?category=${category}` });
};

//========================================================================================getSingleProducts
export const getSingleProduct = async (id) => {
  // return await request({url:`/shop/${cat}/${id}`})
  return await request({ url: `/products/${id}` });
};

//========================================================================================Post User
export const postNewUser = async (userData) => {
  return await request({ url: "/users", method: "post", data: userData }).then(
    (res) => {
      Cookies.set("token", "heyDaug", {
        expires: 7,
        secure: true,
        sameSite: "strict",
      }),
      Cookies.set("daugid", res.data.id, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      })
    }
  );
};
//========================================================================================get User Data
export const GetUserData = async ()=>{
  return await request({url:`users/${Cookies.get('daugid')}`, method:"get"})
}
//========================================================================================Patch User Data
export const patchUserData= async (data)=>{
  return await request({url:`users/${data.id}`, method:"patch", data: data})
}
//========================================================================================Post User LOGIN
export const axiosLoginUser = async (userData) => {
  return await request({ url: "/login", method: "post", data: userData }).then(
    (res) => {

      Cookies.set("token", "heyDaug", {
        expires: 7,
        secure: true,
        sameSite: "strict",
      }),
      Cookies.set("daugid", res.data.id, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      })
    }
  );
};
//========================================================================================Post product to cart
export const postProductToCart= async(data,quan)=>{
return await request({url:"/cartlist", method:"post", data:{data, quantity:quan, userId:Cookies.get('daugid')}})
}
//========================================================================================Get Cartlist Products
export const getCartlistProducts= async()=>{
  return await request({url:`cartlist?userId=${Cookies.get('daugid')}`})
}
//========================================================================================Patch Product On cartlist
export const patchCartProduct=async (data)=>{
  return await request({url:`cartlist/${data.id}`, method:"patch", data:data})
}

//========================================================================================Get Product from cartlist
export const removeProductCart= async(id)=>{
  return await request({url:`cartlist/${id}`, method: "delete"})
}
//========================================================================================Empty artlist


//========================================================================================Post UserOrders
export const postUserOrder=async(data,total)=>{
  return await request({url:'orders', method:"post", data:{data, userId:Cookies.get("daugid"), totalPrice:total}})
}

//========================================================================================Get UserOrders
export const getUserOrder=async()=>{
  return await request({url:`orders`})
}

