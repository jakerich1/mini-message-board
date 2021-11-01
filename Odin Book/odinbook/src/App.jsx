import { React } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './useAuth';
import User from './components/User/User';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import UsersPage from './components/UsersPage/UsersPage';
import Dashboard from './components/Dashboard/Dashboard';
import RequestsPage from './components/RequestsPage/RequestsPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './baseStyle.scss';

function App() {
  const auth = useAuth();

  return (
    <div className="App">

      <Switch>
        <Route
          exact
          path="/"
          render={() => (!auth.user ? (
            <SignIn />
          ) : (
            <Redirect
              to={{
                pathname: '/dashboard',
              }}
            />
          ))}
        />

        <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>

        <PrivateRoute exact path="/users">
          <UsersPage />
        </PrivateRoute>

        <PrivateRoute exact path="/u/:id">
          <User />
        </PrivateRoute>

        <PrivateRoute path="/u">
          <Redirect to="/users" />
        </PrivateRoute>

        <PrivateRoute exact path="/requests">
          <RequestsPage />
        </PrivateRoute>

      </Switch>

    </div>
  );
}

export default App;