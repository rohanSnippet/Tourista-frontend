import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CustomerSupport = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: queries = [] } = useQuery({
    queryKey: ["queries"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/emails`);
      return response.data;
    },
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return (
    <div className="w-full md:w-[1090px] px-4 mx-auto">
      {" "}
      <h2 className="text-2xl font-semibold my-4 ">
        Manage All <span className="font-bold text-indigo-600">Queries</span>
      </h2>
      {/* tour packages*/}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-semibold text-xs">
              <th>
                <label>#</label>
              </th>
              <th>Customer</th>
              <th>Question</th>
              <th>Feedback</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {queries.map((item, index) => (
              <tr key={index}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td className="text-center">
                  <div className="flex items-center gap-3 text-center">
                    <div className="text-center justify-center">
                      <div className="font-bold">{item.name}</div>
                      <p className=" badge badge-slate-300 rounded-lg">
                        {item.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  {item.question}
                  <br />
                  {/* <span className="badge badge-ghost badge-sm">
                       {tour.Days}
                     </span> */}
                </td>
                <td>{item.feedback}</td>
                <th>
                  {item.answer == "Not Answered" ? (
                    <button className="btn bg-fuchsia-500 btn-sm">Reply</button>
                  ) : (
                    <p>Answered</p>
                  )}
                </th>
                <th>{item.date.split("T")[0]}</th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default CustomerSupport;
