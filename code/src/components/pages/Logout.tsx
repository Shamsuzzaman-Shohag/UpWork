import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuthToken, removeUserSession } from 'libs/Helpers';
import Loader from 'components/layout/parts/Loader';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const location = useLocation();

  const doClear = async () => {
    const authToken = getAuthToken();

    setIsLoading(true);

    if (authToken) {
      // TODO: Logout
    }

    removeUserSession();

    setIsLoading(false);
    setIsCleared(true);
  };

  useEffect(() => {
    doClear();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      {
        isCleared &&
        <Navigate to="/sign-in" replace={true} state={location.state} />
      }
    </>
  );
};

export default Logout;