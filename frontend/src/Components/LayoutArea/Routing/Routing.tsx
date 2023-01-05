import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import AddBook from "../../AdminArea/AddBook/AddBook";
import HomeAdmin from "../../AdminArea/HomeAdmin/HomeAdmin";
import AddAnswer from "../../AnswerArea/AddAnswer/AddAnswer";
import AnswersByQuestion from "../../AnswerArea/AnswersByQuestion/AnswersByQuestion";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import MyProfile from "../../UsersArea/MyProfile/MyProfile";
import UserProfile from "../../UsersArea/UserProfile/UserProfile";
import Home from "../Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {

    const [user, setUser] = useState<UserModel>(null);

    useEffect(() => {
        setUser(store.getState().authState.user);
        const unsubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });
        return () => unsubscribeMe();

    }, []);

    return (
        <div className="Routing">
            <Routes>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {user?.role === "User" &&
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/answers/:questionId" element={<AnswersByQuestion />} />
                        <Route path="/addAnswer/:questionId" element={<AddAnswer />} />
                        <Route path="/myProfile/:userId" element={<MyProfile />} />
                        <Route path="/userProfile/:userId" element={<UserProfile />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                    </>
                }

                {user?.role === "Admin" &&
                    <>
                        <Route path="/home-admin" element={<HomeAdmin />} />
                        <Route path="/answers/:questionId" element={<AnswersByQuestion />} />
                        <Route path="/addAnswer/:questionId" element={<AddAnswer />} />
                        <Route path="/myProfile/:userId" element={<MyProfile />} />
                        <Route path="/userProfile/:userId" element={<UserProfile />} />
                        <Route path="/newBook/" element={<AddBook />} />
                        <Route path="/" element={<Navigate to="/home-admin" />} />
                    </>
                }

                {user === null &&
                    <Route path="/" element={<Navigate to="/login" />} />
                }

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
