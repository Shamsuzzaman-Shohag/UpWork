import React, { useState } from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';
import { getToken } from 'libs/Helpers';
import Sidebar from 'components/layout/Sidebar'
import Header from 'components/layout/Header'


const PrivateRoute = ({ component: Component, ...rest }) => {

  const [isSidebar, setIsSidebar] = useState(true);

  // return (
  //   <Route
  //     {...rest}
  //     render={(props) => getToken()
  //       ? <div className="app">
  //         <Sidebar isSidebar={isSidebar} />
  //         <main className="content">
  //           <Header setIsSidebar={setIsSidebar} />
  //           <Component {...props} />
  //         </main>
  //       </div>
  //       : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />}
  //   />
  // )

  return (
    getToken()
      ? <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Header setIsSidebar={setIsSidebar} />
          <Component />
        </main>
      </div>
      : <Navigate to={{ pathname: '/' }} />
  )
}

export default PrivateRoute;