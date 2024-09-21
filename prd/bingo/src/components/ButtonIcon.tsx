import styled from '@emotion/styled';
import { Button as ChakraButton } from '@chakra-ui/react';
import type { Icon } from 'react-feather';
import type { MouseEventHandler, TouchEventHandler } from 'react';

const Button = styled(ChakraButton)`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;
export const ButtonIcon: React.FC<{
  Icon: Icon;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> & TouchEventHandler<HTMLButtonElement>;
}> = ({ Icon, className, onClick }) => {
  return (
    <Button className={className} onClick={onClick} onTouchEnd={onClick}>
      <Icon />
    </Button>
  );
};
