import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { baseUrl } from "../URL";

const axiosSecure = axios.create({
  baseURL: baseUrl,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log(status);
      if (status === 401) {
        await logOut();
        navigate("/login");
      }
      if (status === 403) {
        //await logOut();
        navigate("/login", { state: { prevPath: location.pathname } });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
