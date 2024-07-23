import axios from "axios";
import { baseUrl } from "../URL";

const axiosPublic = axios.create({
  baseURL: baseUrl,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
