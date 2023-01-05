import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {

    const [user, setUser] = useState<UserModel>(null);

    useEffect(() => {
        setUser(store.getState().authState.user);
        
        const unsubscribeMe = store.subscribe(() =>{
            setUser(store.getState().authState.user);
        });
        
        return () => unsubscribeMe();
    }, []);

    return (
        <div className="Header">
            <AuthMenu />
            {user?._id && user?.role === "User" ?
            <div>
                <Link className="Link" to="/home">לדף הבית</Link> <BsFillHouseDoorFill className="HomeIcon"/>
            </div>
            : (user?._id && user?.role === "Admin") ?
            <div>
                <Link className="Link" to="/home-admin">לדף הבית</Link> <BsFillHouseDoorFill className="HomeIcon"/>
            </div>
            :
            <span></span>
            }
            <Typography variant="h3" sx={{ fontWeight: 'bold' }} style={{ height: "75px", marginTop:"10px" }}>Schooly Bully</Typography>
        </div>
    );
}

export default Header;
