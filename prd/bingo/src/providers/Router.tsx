import { createBrowserRouter, type RouteObject, BrowserRouter } from 'react-router-dom';
import { Layout } from '../layouts/Mobile';
import { PreviewTab } from '../pages/PreviewTab';
import { UploadTab } from '../pages/UploadTab';
import type { PropsWithChildren } from 'react';
import { RouterProvider as ReactDomRouterProvider } from 'react-router-dom';
import { CreateTab } from '../pages/CreateTab';
import { useRoute } from '../hooks/useRoute';
import { CHILD_ROUTES, STARTING_ROUTE, type Route } from '../const/route';

export const useLeftRightNavigation = () => {
  const route = useRoute();

  if (route === '/') {
    return { prev: undefined, next: STARTING_ROUTE };
  }

  const pathIdx = CHILD_ROUTES.indexOf(route);

  const prev = CHILD_ROUTES[pathIdx - 1];
  const next = CHILD_ROUTES[pathIdx + 1];

  return { prev, next };
};

const CHILD_ROUTE_ELEMENT_MAP = {
  '/upload': <UploadTab />,
  '/create': <CreateTab />,
  '/preview': <PreviewTab />,
} as const satisfies Record<Exclude<Route, '/'>, JSX.Element>;

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: CHILD_ROUTES.map<RouteObject>((path) => ({
      path,
      index: path === STARTING_ROUTE,
      element: CHILD_ROUTE_ELEMENT_MAP[path],
    })),
  },
]);

export const RouterProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <ReactDomRouterProvider router={router} />
    <BrowserRouter>{children}</BrowserRouter>
  </>
);
