import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/NotifyService";
import usersService from "../../../Services/UsersService";
import TopUsersCard from "../TopUsersCard/TopUsersCard";
import "./UsersList.css";

function UsersList(): JSX.Element {

    const [topRatedUsers, setTopRatedUsers] = useState<UserModel[]>([]);
    const dataFetchedRef = useRef(false);

    useEffect(()=> {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        usersService.fetchTop5RatedUsers()
            .then(topRatedUsers => setTopRatedUsers(topRatedUsers))
            .catch(err=> notify.error(err));
    }, []);
    
    return (
        <div className="UsersList">
			<h3>המשתמשים המובילים שלנו</h3>
            <div className="TopRatedUsers">
                {topRatedUsers.map(u =><TopUsersCard key={u._id} user={u}/>)}
            </div>

        </div>
    );
}

export default UsersList;
