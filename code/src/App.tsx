import { useState } from "react";
import {
  CssBaseline,
  ThemeProvider
} from "@mui/material";
import {
  Routes,
  Route
} from "react-router-dom";
import {
  Slide,
  ToastContainer
} from "react-toastify";
import PrivateRoute from 'components/layout/PrivateRoute'
import PublicRoute from 'components/layout/PublicRoute'
import Landing from "components/pages/Landing";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import SignUp from "./components/pages/SignUp";
import ListService from "./components/pages/ListService";
import ListDomain from "./components/pages/ListDomain";
import CreateDomain from "./components/pages/CreateDomain";
import Error from "./components/pages/Error";
import {
  ColorModeContext,
  useMode
} from "./theme";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode as any}>
      <ThemeProvider theme={theme as any}>
        <CssBaseline />
        <Routes>
          <Route path="/" index={true} element={<Landing />} />
          <Route index={true} path="/sign-in" element={<PublicRoute component={Login} />} />
          <Route index={true} path="/sign-out" element={<PublicRoute component={Logout} />} />
          <Route index={true} path="/sign-up" element={<PublicRoute component={SignUp} />} />
          <Route index={true} path="/service/list" element={<PrivateRoute component={ListService} />} />
          <Route index={true} path="/domain/list" element={<PrivateRoute component={ListDomain} />} />
          <Route index={true} path="/domain/create" element={<PrivateRoute component={CreateDomain} />} />
          <Route path="*" element={<PublicRoute component={Error} />} />
        </Routes>
        <ToastContainer
          theme="colored"
          transition={Slide}
          position="bottom-left"
          autoClose={5000}
          limit={5}
          hideProgressBar={true}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className={'toast-container'}
        />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
