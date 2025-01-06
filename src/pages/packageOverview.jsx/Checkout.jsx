import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { baseUrl } from "../../URL";
const Checkout = () => {
  const {
    register,
    formState: { errors },
  } = useForm(); // Initialize useForm
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const {
    adultTravellers = [],
    childTravellers = [],
    item = {},
    totalPrice,
  } = location.state || {};

  const [contact, setContact] = useState(user ? user.contact : 0);
  const [name, setName] = useState(user ? user.name : "");

  // Function to handle contact change
  const handleContactChange = (e) => {
    setContact(e.target.value);
    console.log(contact);
  };

  // Function to handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const travellers = adultTravellers.length + childTravellers.length;
  const amount = totalPrice * 100;
  const currency = "INR";
  const receiptId = "order_rcptid_11";

  const paymentHandler = async (e) => {
    const response = await fetch(`${baseUrl}/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const order = await response.json();

    // variable from razor pay
    var options = {
      key: "rzp_test_GOeCggKPU5gaD5", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "TOURISTA",
      description: "Test Transaction",
      image: "logo2.png",
      order_id: order.id,
      // callback_url: "/success",
      handler: async function (response) {
        //alert(response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        /* alert(response.razorpay_signature); */
        // Inside paymentHandler function

        const paymentInfo = {
          transaction_id: response.razorpay_payment_id,
          email: user.email,
          name: user.displayName || name,
          phone: contact || "No Contact Provided",
          price: totalPrice,
          travellers: travellers,
          adultTravellers: adultTravellers,
          childTravellers: childTravellers,
          tour_info: item,
        };

        console.log("Payment Info:", paymentInfo);
        const encodedPaymentInfo = encodeURIComponent(
          JSON.stringify(paymentInfo)
        );
        console.log("Encoded Payment Info:", encodedPaymentInfo);

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Tour is booked",
          showConfirmButton: false,
          timer: 2000,
        });

        window.open(`/receipt?paymentInfo=${encodedPaymentInfo}`, "_self");
        await axiosSecure.post("/bookings", paymentInfo);
        //window.location.href = `/receipt?paymentInfo=${encodedPaymentInfo}`;

        //console.log(paymentInfo);

        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:6001/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jsonRes = await validateRes.json();

        // console.log(jsonRes);

        //console.log(response);
      },
      prefill: {
        name: user?.displayName,
        email: user?.email,
        // contact: "9082807193",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#5C6BC0",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      /*  alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id); */
    });

    rzp1.open();
    e.preventDefault();
  };

  console.log(adultTravellers, childTravellers);
  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-3xl font-bold mb-6 ml-5">Review Tour Details</h1>

      <div className="flex flex-col lg:flex-row w-full mx-auto px-4 py-8 mt-7 gap-8">
        {/* Tour Details */}
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Tour Details
          </h2>

          <div className="flex flex-col items-center">
            <img
              className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg mb-4 md:h-[20%] sm:h-[10%] h-[20%]"
              src={item.image}
              alt={item.name}
            />
            <span className="font-semibold text-lg text-gray-800">
              Tour Name: {item.name}
            </span>
            <br />
            <span className="font-semibold text-sm sm:text-base text-gray-800">
              Days: {item.Days.length}
            </span>
          </div>
        </div>

        {/* User Details */}
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-2 w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            User Details:
          </h2>

          <div>
            <input
              type="text"
              defaultValue={user.displayName}
              required
              onChange={handleNameChange}
              pattern="[A-Za-z\s]+"
              {...register("name")}
              className="input-field bg-gray-200 text-gray-800 px-4 py-2 rounded-lg w-full mb-4"
            />
            <input
              type="email"
              defaultValue={user.email}
              required
              {...register("email")}
              className="input-field bg-gray-200 text-gray-800 px-4 py-2 rounded-lg w-full mb-4"
            />
            <input
              type="tel"
              placeholder="Enter contact"
              required
              defaultValue={contact}
              onChange={handleContactChange}
              {...register("contact")}
              className="input-field bg-gray-200 text-gray-800 px-4 py-2 rounded-lg w-full mb-4"
            />
          </div>

          {/* Travellers Details */}
          <h2 className="text-xl font-semibold mb-4 mt-4 text-gray-800">
            Travellers:
          </h2>

          {/* Adult Travellers Table */}
          {adultTravellers.length > 0 && (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">
                      Age
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">
                      Gender
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adultTravellers.map((traveller, index) => (
                    <tr
                      key={`adult-${index}`}
                      className="border-t border-gray-200"
                    >
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {traveller.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {traveller.age}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {traveller.gender}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        ₹ {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Child Travellers Table */}
          {childTravellers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">
                      Age
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">
                      Gender
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-800">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {childTravellers.map((traveller, index) => (
                    <tr
                      key={`child-${index}`}
                      className="border-t border-gray-200"
                    >
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {traveller.name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {traveller.age}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {traveller.gender}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        ₹{item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <h2 className="text-xl text-center mt-3 font-semibold mb-2 text-gray-800">
            Total Price:
          </h2>
          <h1 className="text-3xl text-center  font-extrabold mb-6 text-gray-800">
            ₹{totalPrice}
          </h1>

          <div className="flex justify-center mt-6 lg:mt-8">
            <button
              className="btn justify-around inline-block px-10 py-3 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 shadow-gray-500/50 rounded-full text-white text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-gray-500/30 hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
              onClick={paymentHandler}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
