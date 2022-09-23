import { useContext } from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/authContext";


export const RouteGuard = () => {
    const { authUser } = useContext(AuthContext)

    if (authUser) {
        return <Outlet></Outlet>
    } else {
        alert('You should login with your profile')
        return <Navigate to='/' replace></Navigate>
    }

}