import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../URL";

const UseCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  //console.log(token);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/carts?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    },
  });
  return [cart, refetch];
};

export default UseCart;
