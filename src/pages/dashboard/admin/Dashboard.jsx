import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { FaUsers, FaRupeeSign } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { MdTour } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts"; // Importing the Chart component from react-apexcharts

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { refetch, data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/adminStats`);
      return response.data;
    },
  });

  // State variables to store the animated values
  const [animatedRevenue, setAnimatedRevenue] = useState(0);
  const [animatedUsers, setAnimatedUsers] = useState(0);
  const [animatedBookings, setAnimatedBookings] = useState(0);
  const [animatedTours, setAnimatedTours] = useState(0);

  let revPer = stats.revenue * 0.2;
  let bookingPer = Math.floor(stats.bookings * 0.2);
  let tourPer = Math.floor(stats.tours * 0.2);
  let usersPer = Math.floor(stats.users * 0.2);

  useEffect(() => {
    // Update the animated values until they reach the actual values
    const revenueInterval = setInterval(() => {
      setAnimatedRevenue((prev) => {
        const newValue = prev + revPer;
        return newValue < stats.revenue ? newValue : stats.revenue;
      });
    }, 1);

    const usersInterval = setInterval(() => {
      setAnimatedUsers((prev) => {
        const newValue = prev + usersPer;
        return newValue < stats.users ? newValue : stats.users;
      });
    }, 50);

    const bookingsInterval = setInterval(() => {
      setAnimatedBookings((prev) => {
        const newValue = prev + bookingPer;
        return newValue < stats.bookings ? newValue : stats.bookings;
      });
    }, 50);

    const toursInterval = setInterval(() => {
      setAnimatedTours((prev) => {
        const newValue = prev + tourPer;
        return newValue < stats.tours ? newValue : stats.tours;
      });
    }, 50);

    // Clear intervals on component unmount
    return () => {
      clearInterval(revenueInterval);
      clearInterval(usersInterval);
      clearInterval(bookingsInterval);
      clearInterval(toursInterval);
    };
  }, [stats]);

  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const todaysDate = today.toLocaleDateString("en-US", options);
  const oneDayAgo = new Date(today);
  oneDayAgo.setDate(today.getDate() - 1);
  const Day1 = oneDayAgo.toLocaleDateString("en-US", options);

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  const Day2 = twoDaysAgo.toLocaleDateString("en-US", options);

  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);
  const Day3 = threeDaysAgo.toLocaleDateString("en-US", options);

  const fourDaysAgo = new Date(today);
  fourDaysAgo.setDate(today.getDate() - 4);
  const Day4 = fourDaysAgo.toLocaleDateString("en-US", options);

  const fiveDaysAgo = new Date(today);
  fiveDaysAgo.setDate(today.getDate() - 5);
  const Day5 = fiveDaysAgo.toLocaleDateString("en-US", options);

  const sixDaysAgo = new Date(today);
  sixDaysAgo.setDate(today.getDate() - 6);
  const Day6 = sixDaysAgo.toLocaleDateString("en-US", options);

  // Configure ApexCharts options for the area chart
  const chartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: [Day6, Day5, Day4, Day3, Day2, Day1, todaysDate], // Adjust this according to your data
    },
    yaxis: {
      title: {
        text: "Number of Bookings",
      },
    },
  };

  // Configure ApexCharts series data with the booking counts
  const chartSeries = [
    {
      name: "Bookings",
      data: [
        stats.bookingsPastSevenDays,
        animatedBookings,
        animatedBookings,
        animatedBookings,
        animatedBookings,
        animatedBookings,
        stats.bookingsToday,
      ], // Adjust this according to your data
    },
  ];

  return (
    <div className="  w-full px-4">
      <h2 className="text-2xl font-semibold my-4 ml-3">
        Hi, {user.displayName} 👋
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="stats revenue flex-1 mr-1 shadow-2xl lg:flex-col shadow-rose-400 bg-gradient-to-tl from-rose-400 via-rose-300 to-rose-100  h-[130px]">
          <div className="stat">
            <div className="stat-figure text-black">
              <FaRupeeSign style={{ width: 30, height: 30 }} />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value text-black">{animatedRevenue}</div>
            <div className="stat-desc">Total generated</div>
          </div>
        </div>
        {/* Users */}
        <div className="stats users flex-1 mr-1 shadow-2xl shadow-purple-500/80 bg-gradient-to-tl from-purple-400 via-purple-300 to-purple-100 h-[130px]">
          <div className="stat">
            <div className="stat-figure text-black">
              <FaUsers style={{ width: 35, height: 35 }} />
            </div>
            <div className="stat-title">Users</div>
            <div className="stat-value text-black">{animatedUsers}</div>
            <div className="stat-desc">Logged In At Least Once</div>
          </div>
        </div>
        {/* Bookings */}
        <div className="stats bookings flex-1 mr-1 shadow-2xl shadow-cyan-500/80 bg-gradient-to-tl from-cyan-400 via-cyan-300 to-cyan-100 h-[130px]">
          <div className="stat">
            <div className="stat-figure text-black">
              <TbBrandBooking style={{ width: 40, height: 40 }} />
            </div>
            <div className="stat-title">Bookings</div>
            <div className="stat-value text-black">{animatedBookings}</div>
            <div className="stat-desc">All Bookings</div>
          </div>
        </div>
        {/* Tours */}
        <div className="stats tours flex-1 mr-1 shadow-2xl  shadow-amber-500/80 bg-gradient-to-tl from-amber-400 via-amber-300 to-amber-100 h-[130px]">
          <div className="stat">
            <div className="stat-figure text-black">
              <MdTour style={{ width: 40, height: 40 }} />
            </div>
            <div className="stat-title">Tours</div>
            <div className="stat-value text-black">{animatedTours}</div>
            <div className="stat-desc">All Tours</div>
          </div>
        </div>
      </div>
      {/* Area Chart */}
      <div className="mx-auto mt-24 ml-2">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default Dashboard;
