import SearchQuestion from "../../questionArea/SearchQuestion/SearchQuestion";
import UsersList from "../../UsersArea/UsersList/UsersList";
import "./Home.css";

function Home(): JSX.Element {

    return (
        <div className="Home">
            <UsersList />
            <SearchQuestion />
        </div>
    );
}

export default Home;
