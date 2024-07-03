import { useSelector } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";
export default function PrivateRoute() {

  const { auth } = useSelector((state) => state.auth);

  return auth ? <Outlet /> : <Navigate to="/login" />;
}
