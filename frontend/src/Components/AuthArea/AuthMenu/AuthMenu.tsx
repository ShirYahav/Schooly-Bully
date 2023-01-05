import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>(null);

    useEffect(() => {

        setUser(store.getState().authState.user);

        const unsubscribeMe = store.subscribe(() =>{
            setUser(store.getState().authState.user);
        });
        
        return () => unsubscribeMe();
        
    }, []);
    
    const goToMyProfile = () => {
        navigate(`/myProfile/${user._id}`)
    }

    return (
        <div className="AuthMenu">
			{user === null ?
            <>
                <NavLink to="/login">התחבר</NavLink>
                <span> | </span>
                <NavLink to="/register">הירשם</NavLink>
            </>
            :
            <>
                <span className="AuthMenuFullName" onClick={goToMyProfile}> { user.firstName +" "+ user.lastName } </span>
                <span> | </span>
                <NavLink to="/logout">התנתק</NavLink>
            </>
            }
        </div>
    );
}

export default AuthMenu;
