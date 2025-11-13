import { Outlet } from "react-router";
import { UserContextProvider } from "../../contexts";

const Auth = ()=>{
    return (
        <UserContextProvider>
            <Outlet />
        </UserContextProvider>
    )
}

export default Auth;