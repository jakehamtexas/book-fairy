export const CHILD_ROUTES = ['/upload', '/create', '/preview'] as const;

type ChildRoute = (typeof CHILD_ROUTES)[number];
export type Route = ChildRoute | '/';

export function assertIsRoute(route: string): asserts route is Route {
  if (route === '/') return;

  if (!CHILD_ROUTES.includes(route as ChildRoute)) {
    throw new Error(`Invalid route: ${route}`);
  }
}

export const STARTING_ROUTE = CHILD_ROUTES[0];
