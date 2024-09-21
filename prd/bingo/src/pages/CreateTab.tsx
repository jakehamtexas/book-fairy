import { DraggableResizable as DraggableResizable, type BoundingBox } from '../components/DraggableResizable';
import styled from '@emotion/styled';
import { useCards, type BingoCardInfo } from '../providers/Cards';
import { BingoCard } from '../components/BingoCard';
import { X, Plus } from 'react-feather';
import { ORIGINAL_SIZE } from '../lib/scale';
import { CenteredButtonMask } from '../components/CenteredButtonMask';
import { ButtonIcon } from '../components/ButtonIcon';

const CardButton = styled(ButtonIcon)<{ $position: 'left' | 'right' }>`
  position: absolute;
  z-index: 2;

  top: 0;
  ${({ $position }) => $position}: 0;
  padding: 0;
`;

const DraggableContainer = styled(DraggableResizable)`
  position: relative;
`;

const RndBingoCard: React.FC<{
  card: BingoCardInfo;
  setCard: (box: BoundingBox) => void;
  addCard: () => void;
  removeCard: () => void;
}> = ({ card, setCard, removeCard, addCard }) => {
  const width = ORIGINAL_SIZE.width * card.placement.scale;
  const height = ORIGINAL_SIZE.height * card.placement.scale;

  return (
    <DraggableContainer box={{ ...card.placement, width, height }} onChange={setCard}>
      <CardButton
        onClick={(e) => {
          e.stopPropagation();
          removeCard();
        }}
        Icon={X}
        $position="left"
      />
      <CardButton
        onClick={(e) => {
          e.stopPropagation();
          addCard();
        }}
        Icon={Plus}
        $position="right"
      />
      <BingoCard cells={card.cells} scale={card.placement.scale} />
    </DraggableContainer>
  );
};

const RndBingoCards: React.FC = () => {
  const { cards, setCardBy, removeCardBy, addCard } = useCards();

  return (
    <>
      {cards.map((card, idx) => (
        <RndBingoCard
          card={card}
          addCard={addCard}
          setCard={setCardBy(idx)}
          removeCard={removeCardBy(idx)}
          key={`rng-bingo-card-${idx}`}
        />
      ))}
    </>
  );
};

const AddButtonMask: React.FC = () => {
  const { addCard } = useCards();

  return (
    <CenteredButtonMask onClick={addCard} icon="add">
      Add a bingo card
    </CenteredButtonMask>
  );
};

export const CreateTab: React.FC = () => {
  const { cards } = useCards();

  if (cards.length === 0) {
    return <AddButtonMask />;
  }

  return <RndBingoCards />;
};
