// hooks
import { useEffect } from "react";
// context
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../context/CurrentUserContext";

export default function Admin() {

    const currentUser = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(!currentUser) {
            navigate("/login");
            return
        }
    }, [currentUser, navigate])

    useEffect(() => {
        if(currentUser && !currentUser.is_admin) {
            navigate("/");
            return
        }
    }, [currentUser])

    return <h1>Admin page</h1>
}