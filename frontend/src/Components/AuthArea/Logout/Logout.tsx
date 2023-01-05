import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();
    const dataFetchedRef = useRef(false);


    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        authService.logout();
        
        notify.success("התנתקת מהמערכת בהצלחה");

        navigate("/login")

    },[]);

    return null;
}

export default Logout;
