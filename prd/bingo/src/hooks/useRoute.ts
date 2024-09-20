import { useLocation } from 'react-router-dom';
import { assertIsRoute } from '../const/route';

export function useRoute() {
  const location = useLocation();

  const route = location.pathname;
  assertIsRoute(route);

  return route;
}
