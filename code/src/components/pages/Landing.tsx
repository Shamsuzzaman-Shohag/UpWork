import { getAuthToken } from "libs/Helpers";
import { Navigate } from 'react-router-dom';

const Landing = () => {
  return (
    getAuthToken()
      ? <Navigate to="/service/list" />
      : <Navigate to="/sign-in" />
  )
}

export default Landing;