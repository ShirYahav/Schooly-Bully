import SearchQuestion from "../../questionArea/SearchQuestion/SearchQuestion";
import UsersList from "../../UsersArea/UsersList/UsersList";
import "./HomeAdmin.css";

function HomeAdmin(): JSX.Element {
    return (
        <div className="HomeAdmin">
			<UsersList />
            <SearchQuestion />
        </div>
    );
}

export default HomeAdmin;
