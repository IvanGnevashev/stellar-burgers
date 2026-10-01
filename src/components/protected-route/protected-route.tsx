import { selectAuthUser, selectIsAuthChecked } from '@/services/selectors/authSelectors';
import { useSelector } from '@/services/store';
import { Navigate, useLocation, type Location } from 'react-router-dom';

import { Preloader } from '../ui';

import type { ReactElement } from 'react';

type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

type TLocationState = {
  from?: Location;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false,
}: ProtectedRouteProps): React.JSX.Element => {
  const user = useSelector(selectAuthUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const locationState = location.state as TLocationState | null;
    const from = locationState?.from;

    const destination = from ? `${from.pathname}${from.search}${from.hash}` : '/';

    return <Navigate to={destination} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
