// hooks
import { useEffect } from "react";
// context
import { useNavigate, useOutletContext } from "react-router-dom"
import { useCurrentUser } from "../context/CurrentUserContext";

export default function Admin({jwtToken}) {

    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(jwtToken === "") {
            navigate("/login");
            return
        }
    }, [jwtToken, navigate])

    useEffect(() => {
        if(!currentUser || !currentUser.is_admin) {
            navigate("/");
            return
        }
    }, [currentUser])

    return <h1>Admin page</h1>
}