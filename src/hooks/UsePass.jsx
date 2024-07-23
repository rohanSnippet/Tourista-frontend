import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../URL";

const UsePass = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/carts?email=${user?.email}`);
      return response.json();
    },
  });
  return [cart, refetch];
};

export default UsePass;
