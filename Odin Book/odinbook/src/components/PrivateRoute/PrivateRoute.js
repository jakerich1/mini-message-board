import { useAuth } from '../../useAuth';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    
    return (
        <Route
            {...rest}
            render={({ location }) => (
                !auth.loading ? 
                    auth.user ? 
                    (children) : 
                    (<Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />)
                :
                <>Loading</>
            )}
        />
    );
}

export default PrivateRoute;
