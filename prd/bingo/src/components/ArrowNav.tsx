import { Link } from 'react-router-dom';
import { useLeftRightNavigation, type Route } from '../providers/Router';

export const ArrowNav: React.FC<{ left: true; right?: never } | { left?: never; right: true }> = ({ left, right }) => {
  const { next, prev } = useLeftRightNavigation();

  const mode = left ? 'left' : 'right';

  const config = {
    left: { route: prev, icon: '<-' },
    right: { route: next, icon: '->' },
  } as const satisfies Record<'left' | 'right', { route: Route | undefined; icon: React.ReactNode }>;

  const { route, icon } = config[mode];

  console.log({ mode, left, right, next, prev, route, icon });

  if (!route) {
    return null;
  }

  return <Link to={route}>{icon}</Link>;
};
