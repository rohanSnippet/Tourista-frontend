import React, { useContext, useEffect, useState } from "react";
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
  console.log(user);

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
    //console.log(order);

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

  //console.log(totalPrice);
  //console.log(adultTravellers);
  //console.log(location.state);
  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-3xl font-bold mb-6 ml-5">Checkout Page</h1>
      <div className="flex w-full mx-auto px-4 py-8 mt-7 ml-10 gap-4">
        {" "}
        {/* user Details */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2">
          {" "}
          <h2 className="text-xl font-semibold mb-4">User Details:</h2>
          <div>
            <input
              type="text"
              defaultValue={user.displayName}
              required
              onChange={handleNameChange}
              pattern="[A-Za-z\s]+"
              {...register("name")} // Add onChange event handler
              className={`input-field bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mx-1 mb-1 ${
                errors?.adults && errors.adults[index]?.name && "border-red-500"
              }`}
            />

            <input
              type="email"
              defaultValue={user.email}
              required
              {...register("email")}
              className={`input-field bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mx-1 mb-1 ${
                errors?.adults && errors.adults[index]?.name && "border-red-500"
              }`}
            />

            <input
              type="tel"
              placeholder="Enter contact"
              required
              defaultValue={contact}
              onChange={handleContactChange} // Add onChange event handler
              {...register("contact")}
              className={`input-field bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mx-1 mb-1 ${
                errors?.adults && errors.adults[index]?.name && "border-red-500"
              }`}
            />
          </div>
          {/* Travellers details */}
          <h2 className="text-xl font-semibold mb-4 mt-4">Travellers:</h2>
          <ul className="mb-4">
            {adultTravellers.map((traveller, index) => (
              <li key={`adult-${index}`} className="mb-2">
                <span className="font-semibold">Traveller Name:</span>{" "}
                {traveller.name}, <span className="font-semibold">Age:</span>{" "}
                {traveller.age}, <span className="font-semibold">Gender:</span>{" "}
                {traveller.gender},{" "}
                <span className="font-semibold">Price:</span> {item.price}
                <span className="font-semibold">{/* Nationality: */}</span>{" "}
                {traveller.nationality}
              </li>
            ))}
          </ul>
          <ul className="mb-4">
            {childTravellers.map((traveller, index) => (
              <li key={`child-${index}`} className="mb-2">
                <span className="font-semibold">Name:</span> {traveller.name},{" "}
                <span className="font-semibold">Age:</span> {traveller.age},{" "}
                <span className="font-semibold">Gender:</span>{" "}
                {traveller.gender},{" "}
                <span className="font-semibold">Price:</span> {item.price}
                <span className="font-semibold">{/* Nationality: */}</span>{" "}
                {traveller.nationality}
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2">Total Price:</h2>
          <p className="mb-6">{totalPrice}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={paymentHandler}
          >
            Proceed to Pay
          </button>
        </div>
        {/* tour details */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <h2 className="text-xl font-semibold mb-2">Tour Details</h2>
          <ul className="mb-4">
            <span>
              <img className="itemimage" src={item.image} alt="" />
            </span>
            <span className="font-semibold">Tour Name : {item.name}</span>
            <br></br>
            <span className="font-semibold">
              Days : {item.Days.length}
            </span>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
