import { getToken } from "libs/Helpers";
import { Navigate } from 'react-router-dom';

const Landing = () => {
  return (
    getToken()
      ? <Navigate to="/team" />
      : <Navigate to="/login" />
  )
}

export default Landing;