import axios from "axios";

export const _axios = axios.create({
   baseURL: import.meta.env.VITE_API
})
export function saveToken(token:string) {
   localStorage.setItem('token', token)
}
export  function removeToken() {
   localStorage.removeItem("token")
}
_axios.interceptors.request.use(
   (config)=>{
      const token = localStorage.getItem("token")
   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }
   return config
   })

_axios.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401 && localStorage.getItem("token") && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
         removeToken()
         window.location.href = "/login"
      }
      return Promise.reject(error)
   }
)
