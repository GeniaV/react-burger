import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../services/store';

export function ProtectedRoute({ children, ...rest }) {
  const user = useSelector(store => store.auth.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
