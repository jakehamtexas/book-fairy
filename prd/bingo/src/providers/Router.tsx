import { useLocation, createBrowserRouter, type RouteObject, BrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { DownloadTab } from '../pages/DownloadTab';
import { PreviewTab } from '../pages/PreviewTab';
import { UploadTab } from '../pages/UploadTab';
import type { PropsWithChildren } from 'react';
import { RouterProvider as ReactDomRouterProvider } from 'react-router-dom';
import { CreateTab } from '../pages/CreateTab';

const ROUTES = ['/upload', '/create', '/preview', '/download'] as const;
export type Route = (typeof ROUTES)[number];
function assertIsRoute(route: string): asserts route is Route {
  if (route === '/') return;

  if (!ROUTES.includes(route as Route)) {
    throw new Error(`Invalid route: ${route}`);
  }
}

const STARTING_ROUTE = ROUTES[0];
export const useLeftRightNavigation = () => {
  const location = useLocation();

  const route = location.pathname;
  assertIsRoute(route);

  const pathIdx = ROUTES.indexOf(route);

  const prev = ROUTES[pathIdx - 1];
  const next = ROUTES[pathIdx + 1];

  return { prev, next };
};

const ROUTE_ELEMENT_MAP = {
  '/upload': <UploadTab />,
  '/create': <CreateTab />,
  '/preview': <PreviewTab />,
  '/download': <DownloadTab />,
} as const satisfies Record<Route, JSX.Element>;

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: ROUTES.map<RouteObject>((path) => ({
      path,
      index: path === STARTING_ROUTE,
      element: ROUTE_ELEMENT_MAP[path],
    })),
  },
]);

export const RouterProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <ReactDomRouterProvider router={router} />
    <BrowserRouter>{children}</BrowserRouter>
  </>
);
