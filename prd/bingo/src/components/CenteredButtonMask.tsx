import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';
import { PlusCircle, Edit } from 'react-feather';

const ICONS = {
  add: PlusCircle,
  edit: Edit,
};

type Icon = keyof typeof ICONS;

const Mask = styled.div`
  background: rgba(0, 0, 0, 0.5);

  width: 100%;
  height: 100%;

  cursor: pointer;
`;

const SeparateStackingContext = styled.div`
  position: relative;
`;

const FullHeightWidth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  cursor: pointer;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  font-size: 4rem;
`;

const TopThreeQuartered = styled.div`
  position: absolute;
  top: 200px;
`;

export const CenteredButtonMask: React.FC<PropsWithChildren<{ onClick: () => void; icon: Icon }>> = ({
  children,
  onClick,
  icon,
}) => {
  const Icon = ICONS[icon];

  return (
    <Mask onClick={onClick}>
      <SeparateStackingContext>
        <FullHeightWidth>
          <TopThreeQuartered>{children}</TopThreeQuartered>
        </FullHeightWidth>
      </SeparateStackingContext>
      <FullHeightWidth>
        <Centered>
          <IconWrapper>
            <Icon size={48} />
          </IconWrapper>
        </Centered>
      </FullHeightWidth>
    </Mask>
  );
};
