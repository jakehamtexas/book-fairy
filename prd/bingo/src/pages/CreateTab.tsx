import { DraggableResizable as _DraggableResizable, type BoundingBox } from '../components/DraggableResizable';
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCards, type BingoCardPlacement } from '../providers/Cards';
import { BingoCard } from '../components/BingoCard';
import { ORIGINAL_SIZE } from '../lib/scale';
import { CenteredButtonMask } from '../components/CenteredButtonMask';

const AddButton = styled(Button)`
  position: absolute;
  z-index: 2;

  top: 0;
  left: 0;
`;

const RemoveButton = styled(Button)`
  position: absolute;
  z-index: 2;

  top: 0;
  right: 0;
`;

const DraggableResizable = styled(_DraggableResizable)`
  position: relative;
`;

const RndBingoCard: React.FC<{
  card: BingoCardPlacement;
  setCard: (box: BoundingBox) => void;
  addCard: () => void;
  removeCard: () => void;
}> = ({ card, setCard, removeCard, addCard }) => {
  const width = ORIGINAL_SIZE.width * card.scale;
  const height = ORIGINAL_SIZE.height * card.scale;

  return (
    <DraggableResizable box={{ ...card, width, height }} onChange={setCard}>
      <AddButton
        onClick={(e) => {
          e.stopPropagation();
          addCard();
        }}
      >
        +
      </AddButton>
      <RemoveButton
        onClick={(e) => {
          e.stopPropagation();
          removeCard();
        }}
      >
        X
      </RemoveButton>
      <BingoCard scale={card.scale} />
    </DraggableResizable>
  );
};

export const RndBingoCards: React.FC = () => {
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
