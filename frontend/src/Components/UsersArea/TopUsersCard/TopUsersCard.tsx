import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import config from "../../../Utils/Config";
import "./TopUsersCard.css";

interface TopUsersCardProps {
    user: UserModel;
}
function TopUsersCard(props: TopUsersCardProps): JSX.Element {

    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(store.getState().authState.user);

    }, []);
    

    const goToProfile = () => {
       user._id === props.user._id ? navigate(`/myProfile/${props.user._id}`) : navigate(`/userProfile/${props.user._id}`)
    }

    return (
        <div className="TopUsersCard" onClick={goToProfile}>
			<div className="Container">
                <img className="UserImage" src={config.userImageUrl + props.user?.imageName} />
                <h5 className="Name">{props.user.firstName}  {props.user.lastName}</h5>
                <span className="Rate">דירוג {props.user.rate}</span>
            </div>
        </div>
    );
}

export default TopUsersCard;
