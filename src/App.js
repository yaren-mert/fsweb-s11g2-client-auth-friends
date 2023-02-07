import "./App.css";
import { NavLink, Switch, Route, useHistory } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import FriendForm from "./Components/FriendForm";
import Friends from "./Components/Friends";
import PrivateRoute from "./Components/PrivateRoute";
import { fetchLogout } from "./Reducers/actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.loginForm);
  const logStatu = useSelector((store) => store.log);

  function logOutClick() {
    console.log("logoutclick");
    console.log(logStatu);
    logStatu && dispatch(fetchLogout());
    history.push("/login");
  }

  return (
    <div className="App">
      <div className="flex justify-around align-middle mt-8 border-b-2 border-black">
        <h1 className="px-8 py-4 font-bold">Client Auth Projesi: Friends</h1>
        <div className="flex justify-end gap-4">
          <NavLink
            className="px-8 py-4 bg-black mb-4 rounded-md text-white border-b-1 border-black hover:text-black hover:bg-slate-300}"
            to="/login"
          >
            Log-in
          </NavLink>
          <NavLink
            className="px-8 py-4 bg-black mb-4 rounded-md text-white border-b-1 border-black hover:text-black hover:bg-white}"
            to="/friends"
          >
            Friend List
          </NavLink>
          <NavLink
            className="px-8 py-4 bg-black mb-4 rounded-md text-white border-b-1 border-black hover:text-black hover:bg-white}"
            to="/friends/add"
          >
            Add Friend
          </NavLink>
          <NavLink
            onDoubleClick={logOutClick}
            className="px-8 py-4 bg-black mb-4 rounded-md text-white border-b-1 border-black hover:text-black hover:bg-white}"
            to="/logout"
          >
            Logout
          </NavLink>
        </div>
      </div>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <PrivateRoute exact path="/friends" component={Friends} />
        <PrivateRoute path="/friends/add" component={FriendForm} />
      </Switch>
    </div>
  );
}

export default App;
