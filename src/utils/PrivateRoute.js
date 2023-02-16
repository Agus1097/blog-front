import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {

    const loggedIn = useSelector(state => state.auth.auth.loggedIn);

    return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
