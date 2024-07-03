import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../BaseFiles/ErrorAlert";
import { clearErrors } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/auth";
import Spinner from "../BaseFiles/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { loading, error, auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (auth === null) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [error, dispatch, auth]);

  return (
    <>
    <div className=" lg:flex lgbg h-screen">
        <div className="w-1/2"></div>
      <div className="flex md:w-1/2 justify-center lg:items-center md:h-screen pt-12">
        <div className="justify-center  bg-gray-900 rounded-2xl shadow-2xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="w-full bg-white rounded-t-2xl py-4">
            <img
              className="mx-auto h-10 w-auto"
              src="logo.png"
              alt="Your Company"
            />
            </div>
            <h2 className="mt-10 text-center text-2xl text-white font-bold leading-9 tracking-tight text-white">
              Login to your account
            </h2>
          </div>
          <div className="sm:mx-auto sm:w-full p-8">
            <form className="space-y-8 " onSubmit={formik.handleSubmit}>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="email"
                    required
                    className="block w-[300px] rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                    {formik.errors.email}*
                  </p>
                )}
              </div>

              <div className="mt-2">
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
                  >
                    {!showPass ? (
                      <FaRegEye
                        className="h-6 w-6 text-gray-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaRegEyeSlash
                        className="h-6 w-6 text-gray-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 tracking-widest text-xs mt-2 text-left">
                    {formik.errors.password}*
                  </p>
                )}
              </div>

              {error && <ErrorAlert error={error} />}
              <div>
                <button
                  type="submit"
                  className={`flex w-full uppercase tracking-widest justify-center rounded ${
                    loading ? "bg-indigo-200" : "bg-indigo-600"
                  } px-3 py-1.5 px-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {loading ? <Spinner /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
