import { Link } from 'react-router-dom';
import { useLeftRightNavigation } from '../providers/Router';
import type { Route } from '../const/route';
import { ArrowLeft, ArrowRight, type Icon } from 'react-feather';
import styled from '@emotion/styled';
import { ButtonIcon } from './ButtonIcon';

const ArrowButtonIcon = styled(ButtonIcon)`
  background: #fff;
  padding: 10px 20px;
`;

export const ArrowNavButton: React.FC<{ left: true; right?: never } | { left?: never; right: true }> = ({ left }) => {
  const { next, prev } = useLeftRightNavigation();

  const mode = left ? 'left' : 'right';

  const config = {
    left: { route: prev, Icon: ArrowLeft },
    right: { route: next, Icon: ArrowRight },
  } as const satisfies Record<'left' | 'right', { route: Route | undefined; Icon: Icon }>;

  const { route, Icon } = config[mode];

  if (!route) {
    return null;
  }

  return (
    <Link to={route}>
      <ArrowButtonIcon Icon={Icon} />
    </Link>
  );
};
