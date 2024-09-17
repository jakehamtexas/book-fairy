import { DraggableResizable as _DraggableResizable, type BoundingBox } from '../components/DraggableResizable';
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCards, type BingoCardPlacement } from '../providers/Cards';
import { BingoCard } from '../components/BingoCard';
import { ORIGINAL_SIZE } from '../lib/scale';

const RemoveButton = styled(Button)`
  position: absolute;
  z-index: 1;

  top: 0;
  right: 0;
`;

const DraggableResizable = styled(_DraggableResizable)`
  position: relative;
`;

const RndBingoCard: React.FC<{
  card: BingoCardPlacement;
  setCard: (box: BoundingBox) => void;
  removeCard: () => void;
}> = ({ card, setCard, removeCard }) => {
  const width = ORIGINAL_SIZE.width * card.scale;
  const height = ORIGINAL_SIZE.height * card.scale;

  return (
    <DraggableResizable box={{ ...card, width, height }} onChange={setCard}>
      <RemoveButton onClick={removeCard}>X</RemoveButton>
      <BingoCard scale={card.scale} />
    </DraggableResizable>
  );
};

const AddButton = () => {
  const { addCard } = useCards();

  return <Button onClick={addCard}>Add</Button>;
};

export const RndBingoCards: React.FC = () => {
  const { cards, setCardBy, removeCardBy } = useCards();

  return (
    <>
      <AddButton />
      {cards.map((card, idx) => (
        <RndBingoCard
          card={card}
          setCard={setCardBy(idx)}
          removeCard={removeCardBy(idx)}
          key={`rng-bingo-card-${idx}`}
        />
      ))}
    </>
  );
};

export const CreateTab: React.FC = () => {
  return (
    <>
      <RndBingoCards />
    </>
  );
};
