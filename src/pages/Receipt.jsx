import React, { useContext } from "react";
import jsPDF from "jspdf";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { Card, Typography, Button } from "@material-tailwind/react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import logo1 from "../../public/logo1.png";

// **IMPORTANT: Update this path to your actual Tourista logo**
// For a robust PDF, consider using a Base64 encoded image or ensuring the path is accessible
const TOURISTA_LOGO_URL = logo1;

const Receipt = () => {
  const { user } = useContext(AuthContext);

  const searchParams = new URLSearchParams(window.location.search);
  const encodedPaymentInfo = searchParams.get("paymentInfo");

  let paymentInfo;
  try {
    paymentInfo = JSON.parse(decodeURIComponent(encodedPaymentInfo));
  } catch (error) {
    console.error("Error parsing paymentInfo:", error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Typography variant="h5" color="red">
          Error: Payment information not found or invalid.
        </Typography>
      </div>
    );
  }

  const handleDownloadReceipt = async () => {
    const doc = new jsPDF();

    // Load logo as image data if possible for better reliability
    let logoDataUrl = null;
    try {
      const response = await fetch(TOURISTA_LOGO_URL);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        logoDataUrl = reader.result;
        generatePdfContent(doc, logoDataUrl);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.warn(
        "Could not load logo for PDF. PDF will be generated without logo.",
        e
      );
      generatePdfContent(doc, null); // Generate PDF even if logo fails
    }
  };

  const generatePdfContent = (doc, logoDataUrl) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    let yOffset = 15;

    // Add Logo
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, "PNG", pageWidth / 2 - 25, yOffset, 50, 20); // Centered logo
      yOffset += 25;
    }

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Booking Confirmation", pageWidth / 2, yOffset, {
      align: "center",
    });
    yOffset += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Your adventure starts here!", pageWidth / 2, yOffset, {
      align: "center",
    });
    yOffset += 20; // Space after header

    // Booking Details Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 50, 50);
    doc.text("Booking Details:", 20, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);

    const addDetailRow = (label, value) => {
      doc.text(label + ":", 25, yOffset);
      doc.text(value, pageWidth - 25, yOffset, { align: "right" });
      yOffset += 8;
    };

    addDetailRow("Package Name", paymentInfo.tour_info.name);
    addDetailRow("Booking ID", paymentInfo.transaction_id);
    addDetailRow("Booking Date", new Date().toLocaleString());
    addDetailRow(
      "Tour Date",
      new Date(paymentInfo.tour_info.start_date).toLocaleDateString()
    );
    addDetailRow("Payment Status", "Confirmed");
    yOffset += 10; // Space

    // Price Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 150, 50); // Green for total amount
    addDetailRow("Total Amount", `₹ ${paymentInfo.price}`);
    yOffset += 15;

    // Customer Details Section
    if (user) {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(50, 50, 50);
      doc.text("Customer Information:", 20, yOffset);
      yOffset += 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 70, 70);
      addDetailRow("Name", user.displayName || "N/A");
      addDetailRow("Email", user.email || "N/A");
      yOffset += 10;
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Thank you for choosing Tourista!",
      pageWidth / 2,
      doc.internal.pageSize.height - 20,
      { align: "center" }
    );
    doc.text(
      "For support, please visit our website or contact us.",
      pageWidth / 2,
      doc.internal.pageSize.height - 15,
      { align: "center" }
    );

    const fileName = user
      ? `${user.displayName || user.email}-Tourista-Booking.pdf`
      : "Tourista-Receipt.pdf";
    doc.save(fileName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-4xl bg-white shadow-3xl rounded-3xl overflow-hidden relative border-t-8 border-indigo-600">
        {/* Decorative elements for ticket feel */}
        <div className="absolute top-1/2 left-0 w-8 h-8 -ml-4 -translate-y-1/2 bg-indigo-50 rounded-full border-r-4 border-dashed border-indigo-300 hidden md:block"></div>
        <div className="absolute top-1/2 right-0 w-8 h-8 -mr-4 -translate-y-1/2 bg-indigo-50 rounded-full border-l-4 border-dashed border-indigo-300 hidden md:block"></div>
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent top-[calc(50%-1px)] opacity-50 hidden md:block"></div>{" "}
        {/* Dashed line effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Left Section: Confirmation & Logo */}
          <div className="md:col-span-1 lg:col-span-1 p-8 flex flex-col items-center justify-between text-center bg-indigo-700 text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-black"></div>{" "}
            {/* Overlay for subtle texture */}
            <div className="z-10">
              <IoMdCheckmarkCircleOutline className="text-7xl mx-auto mb-4 text-green-300 animate-fade-in-down" />
              <Typography
                variant="h3"
                className="font-extrabold mb-2 leading-tight"
              >
                Booking Confirmed!
              </Typography>
              <Typography
                variant="paragraph"
                className="text-sm opacity-90 tracking-wide"
              >
                Your exciting journey with Tourista is set.
              </Typography>
            </div>
            <div className="mt-8 z-10">
              {/* Consider adding your actual logo here too, perhaps with `opacity-70` */}
              {/* <img src={TOURISTA_LOGO_URL} alt="Tourista Logo" className="w-28 mx-auto filter brightness-125 invert opacity-80" /> */}
              <Typography variant="small" className="mt-4 opacity-70">
                Tourista Adventures
              </Typography>
            </div>
          </div>

          {/* Right Section: Details & Actions */}
          <div className="md:col-span-2 lg:col-span-3 p-8 flex flex-col justify-between">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold mb-6 pb-3 border-b border-gray-200"
              >
                Your E-Ticket Details
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-gray-700">
                {/* Detail Row */}
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    className="font-semibold text-gray-500 uppercase mb-1"
                  >
                    Booking ID:
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-lg font-medium"
                  >
                    {paymentInfo.transaction_id}
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    className="font-semibold text-gray-500 uppercase mb-1"
                  >
                    Package Name:
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-lg font-medium"
                  >
                    {paymentInfo.tour_info.name}
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    className="font-semibold text-gray-500 uppercase mb-1"
                  >
                    Booking Date:
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-lg font-medium"
                  >
                    {new Date().toLocaleString()}
                  </Typography>
                </div>
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    className="font-semibold text-gray-500 uppercase mb-1"
                  >
                    Tour Date:
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-lg font-medium"
                  >
                    {new Date(
                      paymentInfo.tour_info.start_date
                    ).toLocaleDateString()}
                  </Typography>
                </div>
                <div className="flex flex-col col-span-1 sm:col-span-2">
                  <Typography
                    variant="small"
                    className="font-semibold text-gray-500 uppercase mb-1"
                  >
                    Customer Name:
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-lg font-medium"
                  >
                    {user ? user.displayName || user.email : "Guest User"}
                  </Typography>
                </div>
                <div className="flex flex-col col-span-1 sm:col-span-2 pt-6 border-t border-dashed border-gray-300 mt-6">
                  <Typography variant="h6" className="font-bold text-gray-800">
                    Total Amount:
                  </Typography>
                  <Typography
                    variant="h4"
                    color="green"
                    className="font-extrabold mt-1"
                  >
                    &#x20B9; {paymentInfo.price}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/" className="w-full sm:w-auto">
                <Button
                  variant="outlined"
                  color="blue-gray"
                  size="lg"
                  className="flex items-center sm:p-2 p-0 text-white bg-indigo-500 hover:bg-indigo-700 hover:scale-105 justify-center w-full sm:w-auto hover:bg-blue-gray-50 transition-all duration-300"
                >
                  Back to Home
                </Button>
              </Link>
              <Button
                variant="gradient"
                color="green"
                size="lg"
                className="flex items-center bg-red sm:p-2 p-1 justify-center w-full sm:w-auto shadow-lg shadow-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={handleDownloadReceipt}
              >
                Download Receipt{" "}
                <IoCloudDownloadOutline className="ml-2 text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Receipt;
