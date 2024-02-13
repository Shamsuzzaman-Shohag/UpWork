import {
  ComponentType,
  MemoExoticComponent,
  NamedExoticComponent,
  ReactElement
} from 'react';

type PublicRouteProps = {
  component: ((props?: any) =>
    ReactElement) | NamedExoticComponent<(props?: any) => ReactElement> | MemoExoticComponent<(props?: ComponentType<any>) => ReactElement>;
} & Record<string, any>;

const PublicRoute = ({ component: Component, ...rest }: PublicRouteProps) => {
  return (
    <div className="app">
      <main className="content">
        <div className='public'>
          <Component />
        </div>
      </main>
    </div>
  )
}

export default PublicRoute;