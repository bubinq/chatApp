import { Outlet } from "react-router";
import { Navigate } from "react-router";


export const RouteGuard = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        return <Outlet></Outlet>
    } else {
        alert('You should login with your profile')
        return <Navigate to='/' replace></Navigate>
    }

}