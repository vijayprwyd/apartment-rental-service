import { useContext } from "react";
import { AuthContext } from "../Context/context";
import { Redirect } from "react-router-dom";

export function RedirectLoggedinUsers({children}) {

    const authContext = useContext(AuthContext);
    const token = authContext?.authInfo?.token
    if(token) {
        return <Redirect to = "/feed"/> 
    } else {
        return children;
    }
}