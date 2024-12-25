import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { Card, Typography, Button } from "@material-tailwind/react";
import { AuthContext } from "../context/AuthProvider";

const Receipt = () => {
  const { user } = useContext(AuthContext);

  const searchParams = new URLSearchParams(window.location.search);
  const encodedPaymentInfo = searchParams.get("paymentInfo");
  const paymentInfo = JSON.parse(decodeURIComponent(encodedPaymentInfo));

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text(`Package Name: ${paymentInfo.tour_info.name}`, 10, 20);
    doc.text(`Booking ID: ${paymentInfo.transaction_id}`, 10, 30);
    doc.text(`Booking Date: ${new Date().toLocaleString()}`, 10, 40);
    doc.text(
      `Tour Date: ${new Date(
        paymentInfo.tour_info.start_date
      ).toLocaleDateString()}`,
      10,
      50
    );
    doc.text(`Total Amount: $${paymentInfo.price}`, 10, 60);

    // Save the PDF as "receipt.pdf"
    const fileName = user ? user.displayName || user.email : "Receipt";
    doc.save(`${fileName}-Tourista.pdf`);
  };

  return (
    <div className="receipt-container bg-gradient-to-br from-slate-300 via-gray-200 to-slate-50">
      <div className="logo-container mt-20"></div>
      <Card className="receipt-card p-8 text-black">
        <div className="receipt-header flex items-center">
          <IoMdCheckmarkCircleOutline className="checkmark-icon text-green-500 text-4xl" />
          <Typography variant="h4" className="receipt-title ml-4">
            Booking Confirmed!
          </Typography>
        </div>
        <div className="receipt-details mt-8">
          <table className="table-fixed w-full">
            <tbody>
              <tr>
                <td className="w-1/3 font-semibold">Booking ID:</td>
                <td>{paymentInfo.transaction_id}</td>
              </tr>
              <tr>
                <td className="w-1/3 font-semibold">Package Name:</td>
                <td>{paymentInfo.tour_info.name}</td>
              </tr>
              <tr>
                <td className="w-1/3 font-semibold">Booking Date:</td>
                <td>{new Date().toLocaleString()}</td>
              </tr>
              {/*  <tr>
                <td className="w-1/3 font-semibold">Tour Date:</td>
                <td>
                  {new Date(
                    paymentInfo.tour_info.start_date
                  ).toLocaleDateString()}
                </td>
              </tr> */}
              <tr>
                <td className="w-1/3 font-semibold">Total Amount:</td>
                <td>&#x20B9; {paymentInfo.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="receipt-actions mt-8 flex justify-between">
          {/*  <Button
            variant="outlined"
            color="primary"
            size="medium"
            className="action-button"
          >
            View Tickets
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className="action-button bg-green"
            onClick={handleDownloadReceipt}
          >
            Download Receipt <IoCloudDownloadOutline className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Receipt;
