import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from './components/SignIn/SignIn';
import { useAuth } from "./useAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Profile from "./components/Profile/Profile";
import './baseStyle.scss';

function App() {

  const auth = useAuth();

  return (
    <div className="App">

      <Switch>
        <Route
        exact path='/'
        render={({ location }) =>
        !auth.user ? (
            <SignIn />
        ) : (
            <Redirect
                to={{
                    pathname: "/dashboard",
                    state: { from: location }
                }}
            />
        )
        }
        ></Route>

        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
      </Switch>
      
    </div>
  );
}

export default App;
