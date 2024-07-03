import React from "react";
import {  FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../BaseFiles/ErrorAlert";
import SuccessAlert from "../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Confirmation } from "../BaseFiles/ReasonPopUp";
import { FaRegTrashAlt, FaCheck, FaSearch } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import {
  getProjects,
  clearErrors,
  clearMessage,
  deleteProject,
  updateProject,
} from "../redux/projectSlice";
import { useDispatch, useSelector } from "react-redux";
export default function ProjectList() {
  const currentUrl = window.location.href;
  const [editMode, setEditMode] = useState(false);
  const [editableProjects, seteditableProjects] = useState(null);
  const [modalopen, setModalopen] = useState(false);
  const [deleteID, setdeleteID] = useState();
  const { loading, error, message, projects } = useSelector(
    (state) => state.projects
  );
  const { user } = useSelector((state) => state.user);
  const [allproject, setAllproject] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);

  function isClose() {
    setModalopen(false);
  }
  function handleDelete(id) {
    setdeleteID(id);
    if (deleteID) {
      console.log(id);
      setModalopen(true);
    }
  }

  let addProjecttValues = {
    c_name: "",
    email: "",
    product_name: "",
    product_name: "",
    product_name: "",
    total_payment: "",
    recived_payment: "",
    payment_date: "",
    project_status: "",
    project_complete_date: "",
  };

  useEffect(() => {
    setAllproject(projects);
    dispatch(getProjects());
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message]);

  const thds = [
    "id",
    "registration",
    "c_name",
    "phone",
    "product_name",
    "project_status",
    "Due_payment",
    "payment_date",
    "project_complete_date",
  ];
  const handleEdit = (pro) => {
    seteditableProjects(pro);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    seteditableProjects(null);
  };

  const formik = useFormik({
    initialValues: addProjecttValues,
    onSubmit: (values) => {
      const filteredData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== "" && value !== null
        )
      );

      if (Object.keys(filteredData).length > 0) {
        dispatch(
          updateProject({
            project_id: editableProjects.project_id,
            updatedData: filteredData,
          })
        );
      } else {
        alert("No Changes were made");
      }

      setEditMode(false);
      seteditableProjects(null);
    },
  });

  const handleSearch = (e) => {
    setAllproject(
      projects?.filter((p) => p.product_name?.includes(e.target.value))
    );
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900 p-4">
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              placeholder="search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e)}
              type="text"
              className={`border-0 px-20 w-1/2 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 border-red-500`}
            />
          </div>
        </div>
        {message && <SuccessAlert message={message} />}
        {error && <ErrorAlert error={error} />}
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {thds.map((heading, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {heading}
                </th>
              ))}
              <th scope="col" className="py-2 px-2 text-xs border-b-2">
                <div className="flex items-center">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {allproject?.map((pro) => (
              <tr
                key={pro.project_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4 text-gray-700">
                  {pro?.project_id}
                </td>
                <td className="w-4 p-4 text-gray-700">
                  {pro?.registration}
                </td>
                {/* <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th> */}
             <td className="w-4 p-4 text-gray-700">
                  {editMode &&
                  editableProjects &&
                  editableProjects.project_id === pro?.project_id ? (
                    <input
                      id="c_name"
                      className="border-0 px-3 py-1 placeholder-gray-900  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={pro?.c_name}
                    />
                  ) : (
                    pro?.c_name
                  )}
                </td>

                <td className="w-4 p-4 text-gray-700">
                  {editMode &&
                  editableProjects &&
                  editableProjects.project_id === pro?.project_id ? (
                    <input
                      id="phone"
                      className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={pro?.phone}
                    />
                  ) : (
                    pro?.phone
                  )}
                </td>

                <td className="w-4 p-4 text-gray-700">
                  {editMode &&
                  editableProjects &&
                  editableProjects.project_id === pro?.project_id ? (
                    <input
                      id="product_name"
                      className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={pro?.product_name}
                    />
                  ) : (
                    pro?.product_name
                  )}
                </td>

                <td className="w-4 p-4 text-gray-700">
                  {editMode &&
                  editableProjects &&
                  editableProjects.project_id === pro?.project_id ? (
                    <input
                      id="project_status"
                      className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={pro?.project_status}
                    />
                  ) : (
                    pro?.project_status
                  )}
                </td>

                <td className="w-4 p-4 text-gray-700">
                  {pro?.total_payment - pro?.recived_payment}
                </td>

                <td className="w-4 p-4 text-gray-700">
                  {editMode &&
                  editableProjects &&
                  editableProjects.project_id === pro?.project_id ? (
                    <input
                      id="payment_date"
                      className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={pro?.payment_date}
                    />
                  ) : (
                    pro?.payment_date
                  )}
                </td>

                <td className="w-4 p-4 text-gray-700">
                  {editMode &&
                  editableProjects &&
                  editableProjects.project_id === pro?.project_id ? (
                    <input
                      id="project_complete_date"
                      className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={pro?.project_complete_date}
                    />
                  ) : (
                    pro?.project_complete_date
                  )}
                </td>
                <td className="px-2 py-4 flex gap-3 items-center ">
                  {editMode &&
                  editableProjects &&
                  editableProjects.project_id === pro?.project_id ? (
                    <FaXmark
                      className="h-4 w-4 text-red-700 cursor-pointer"
                      onClick={handleCancelEdit}
                      title="cancel"
                    />
                  ) : (
                    <Link to={`/project/details/${pro?.project_id}`}>
                      <FaEye
                        className="h-4 w-4 cursor-pointer"
                        title="details"
                      />
                    </Link>
                  )}
                  {editMode &&
                  editableProjects &&
                  editableProjects.project_id === pro?.project_id ? (
                    <FaCheck
                      className="h-4 w-4 text-green-700 cursor-pointer"
                      onClick={formik.handleSubmit}
                      title="Submit Changes"
                    />
                  ) : (
                    <BsPencilSquare
                      className="h-4 w-4 text-green-700 cursor-pointer"
                      onClick={() => handleEdit(pro)}
                      title="Edit"
                    />
                  )}
                  <FaRegTrashAlt
                    className="h-4 w-4 text-red-700 cursor-pointer"
                    onClick={() => handleDelete(pro?.project_id)}
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalopen && 
        <Confirmation isClose={isClose} deletefunction={deleteProject} id={deleteID}/>}
      </div>
    </>
  );
}
