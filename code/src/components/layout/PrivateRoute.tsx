import {
  ComponentType,
  MemoExoticComponent,
  NamedExoticComponent,
  ReactElement
} from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from 'libs/Helpers';
import Sidebar from 'components/layout/parts/Sidebar'
import Header from 'components/layout/parts/Header'

type PrivateRouteProps = {
  component: ((props?: any) =>
    ReactElement) | NamedExoticComponent<(props?: any) => ReactElement> | MemoExoticComponent<(props?: ComponentType<any>) => ReactElement>;
} & Record<string, any>;

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {

  return (
    getAuthToken()
      ? <div className="app">
        <Sidebar />
        <main className="content">
          <div className='header'>
            <Header />
          </div>
          <div className='main'>
            <Component />
          </div>
        </main>
      </div>
      : <Navigate to={{ pathname: '/' }} />
  )
}

export default PrivateRoute;