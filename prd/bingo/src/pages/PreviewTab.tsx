import { useCards } from '../providers/Cards';
import { ORIGINAL_SIZE } from '../lib/scale';
import { BingoCard } from '../components/BingoCard';
import styled from '@emotion/styled';
import { DraggableResizable } from '../components/DraggableResizable';

const CardContainer = styled(DraggableResizable)`
  position: relative;
`;

export const PreviewTab: React.FC = () => {
  const { cards } = useCards();

  return (
    <>
      {cards.map((card, idx) => {
        const width = ORIGINAL_SIZE.width * card.placement.scale;
        const height = ORIGINAL_SIZE.height * card.placement.scale;

        return (
          <CardContainer showMode box={{ ...card.placement, width, height }}>
            <BingoCard cells={card.cells} scale={card.placement.scale} key={`preview-bingo-card-${idx}`} />
          </CardContainer>
        );
      })}
    </>
  );
};
