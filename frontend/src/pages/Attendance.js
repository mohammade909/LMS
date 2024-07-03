import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaAngleDown,
  FaArrowsRotate,
  FaXmark,
  FaArrowRightLong,
  FaCheck,
  FaRegSquare,
  FaBan,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../BaseFiles/Loader";
import { getAllDatesOfMonth } from "../actions";
import { getUsers } from "../actions/user";
import { convertToMySQLDateFormat } from "../actions";
import { getAllAttendances, markAttendance } from "../actions/attendance";
import { ReasonPopUp } from "../BaseFiles/ReasonPopUp";

const Attendance = () => {
  const { role } = useParams();
  const [rotate, setRotate] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { attendances } = useSelector((state) => state.attendance);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    dispatch(getUsers({ user_type: role, token }));
    dispatch(getAllAttendances());
  }, [dispatch, role, token, reload]);

  const { dates, monthName } = getAllDatesOfMonth(selectedMonth, 2024);

  const handleAttendanceAction = async (user_id, date, status, reason) => {
    const mysqlDate = convertToMySQLDateFormat(date);
    dispatch(markAttendance({ user_id, date: mysqlDate, status, reason }));
    setReload(!reload);
  };

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleAbsent = (day, user_id, status) => {

    console.log(day, user_id, status);
    setData({ user_id, day, status });
  };
  return (
    <section className="py-1 w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/3">
          {role}
        </h6>
        <div className="w-2/3 flex gap-2 justify-end px-4 items-center">
          <div className=" text-xs w-1/2 font-sans tracking-wider">
            Month{" "}
            <select
              className="border-0 px-2 w-1/2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none ease-linear transition-all duration-150"
              value={selectedMonth}
              onChange={handleChange}
            >
              {[...Array(12).keys()].map((index) => (
                <option key={index} value={index}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "short",
                  })}
                </option>
              ))}
            </select>
            - Year: {new Date().getFullYear()}
          </div>

          <FaAngleDown className="text-yellow-700 cursor-pointer" />
          <FaArrowsRotate
            className={`text-green-700 cursor-pointer ${
              rotate
                ? "rotate-180 transition-transform duration-1000"
                : "transition-transform"
            }`}
          />
          <FaXmark className="text-red-700 cursor-pointer" />
        </div>
      </div>
      <div className=" bg-white p-2  border-b-2 flex justify-between items-center">
        <p className="font-semibold tracking-wider">Username</p>
        <p className="font-semibold tracking-wider">Reason</p>
        <p className="font-semibold tracking-wider">Actions</p>
      </div>
      <div className="flex bg-white h-full w-full">
        {false ? (
          <Loader />
        ) : (
          <div className=" p-2 border-b-2 w-full ">
            {users?.length === 0 ? (
              <p className="text-center py-5">No data found</p>
            ) : (
              users?.map((user) => {
                const day = new Date().getDay();
                const attendanceRecord = attendances.find(
                  (record) =>
                    record.user_id === user.user_id &&
                    convertToMySQLDateFormat(record.date) ===
                      convertToMySQLDateFormat(day) && record.status === 'present'
                );
                const isAbsent = attendances.find(
                  (record) =>
                    record.user_id === user.user_id &&
                    convertToMySQLDateFormat(record.date) ===
                      convertToMySQLDateFormat(day) && record.status === 'absent'
                );
                
                return (
                  <div className="flex wrap sm:no-wrap  py-2 ">
                    <div className="w-full sm:w-1/2 border-b-2">
                      <p className="capitalize">{user.username}</p>
                    </div>

                    <div className="w-full sm:w-1/2 flex  justify-between px-5 items-center">
                    {isAbsent ? <p> Some reason</p>: <>
                      <button
                        onClick={() =>
                          handleAttendanceAction(
                            user.user_id,
                            day,
                            "present",
                            null
                          )
                        } 
                        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                      >
                        <span class="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Present
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          handleAbsent(day, user.user_id, "absent")
                        }
                        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                      >
                        <span class="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Absent
                        </span>
                      </button> </>}

                      <p className="">
                        {day === 0 ? (
                          <FaBan className="text-gray-400 " />
                        ) : attendanceRecord ? (
                          <FaCheck
                            className="text-green-700 cursor-pointer"
                            onClick={() =>
                              handleAttendanceAction(
                                user.user_id,
                                day,
                                attendanceRecord.status,
                                attendanceRecord.reason
                              )
                            }
                          />
                        ) : isAbsent ? <FaBan className="text-red-400 "  /> : (
                          <FaRegSquare
                            className="text-gray-700 cursor-pointer"
                            onClick={() =>
                              handleAttendanceAction(
                                user.user_id,
                                day,
                                "present",
                                null
                              )
                            }
                          />
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {data && <ReasonPopUp userInfo={data} isClose={() => setData(null)} />}
    </section>
  );
};

export default Attendance;
