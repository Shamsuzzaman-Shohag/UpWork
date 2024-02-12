import { useState } from "react";
import { Routes, Route, Switch } from "react-router-dom";
import { getToken } from 'libs/Helpers';
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
// import Dashboard from "./scenes/dashboard";
import Team from "./components/pages/team";
import Form from "./components/pages/form";
import Login from "./components/pages/Login";
import CreateDomain from "./components/pages/CreateDomain";
import ListDomain from "./components/pages/ListDomain";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import PrivateRoute from 'components/layout/PrivateRoute'
import PublicRoute from 'components/layout/PublicRoute'
import Landing from "components/pages/Landing";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Header setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/team" element={<Team />} />not found
              <Route path="/form1" element={<Form />} />
              <Route path="/form" element={<Login />} />
              <Route path="/create-domain" element={<CreateDomain />} />
            </Routes>
          </main>
        </div> */}
        <Routes>
          <Route path="/" index={true} element={<Landing />} />

          {/* {
            getToken()
              ? <>
                <Route index={true} path="/create-domain" element={<PrivateRoute component={CreateDomain} />} />
                <Route index={true} path="/team" element={<PrivateRoute component={Team} />} />
              </>
              : <>
                <Route index={true} path="/login" element={<Login />} />
              </>
          }  */}

          <Route index={true} path="/create-domain" element={<PrivateRoute component={CreateDomain} />} />
          <Route index={true} path="/team" element={<PrivateRoute component={ListDomain} />} />

          {/* <Route exact path="/team" component={Team} /> */}
          <Route index={true} path="/login" element={<Login />} />


          <Route path="*" element={<h1>not found</h1>} />

          {/* <Route path="/"> */}

          {/* <Route path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Route path="/create-domain" component={CreateDomain} /> */}
          {/* </Route> */}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
