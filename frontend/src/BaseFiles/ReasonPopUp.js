import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markAttendance } from "../actions/attendance";
import { convertToMySQLDateFormat } from "../actions";

export const ReasonPopUp = ({ isClose, userInfo }) => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState();
  const handleAttendanceAction = async () => {
    const mysqlDate = convertToMySQLDateFormat(userInfo.day);
    dispatch(
      markAttendance({
        user_id: userInfo.user_id,
        date: mysqlDate,
        status: userInfo.status,
        reason,
      })
    );
    isClose();
  };
  return (
    <div
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed flex items-center bg-[#00000094]  z-50 justify-center  w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            onClick={isClose}
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only cursor-pointer" onClick={isClose}>
              Close modal
            </span>
          </button>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter the Reason for absent
          </label>
          <textarea
            id="message"
            rows="4"
            value={reason}
            onChange={(e)=>setReason(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write explaination here..."
          ></textarea>

          <div className="flex justify-center items-center space-x-4 mt-3">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              onClick={isClose}
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              type="submit"
              onClick={handleAttendanceAction}
              className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
