import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
interface IProps {
  children: React.ReactNode;
}
const PrivateRoute = (props: IProps) => {
  const { username } = useAppSelector((state) => state.user);

  if (username) {
    return <>{props.children}</>;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
