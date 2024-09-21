import {
  DraggableResizable as _DraggableResizable,
  type BoundingBox,
  type Position,
} from '../components/DraggableResizable';
import { createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useContext } from 'react';
import { calculateScale, ORIGINAL_SIZE } from '../lib/scale';
import { useClientState } from '../hooks/useClientState';
import { getBingoCellValues } from '../lib/bingo';

export type BingoCardInfo = {
  placement: BingoCardPlacement;
  cells: string[][];
};

export const CardsContext = createContext<[BingoCardInfo[], Dispatch<SetStateAction<BingoCardInfo[]>>] | null>(null);
const useCardsContext = () => {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error('useCardsContext must be used within a CardsProvider');
  }

  return context;
};

export const useCards = () => {
  const [cards, setCards] = useCardsContext();

  const setCardBy =
    (idx: number) =>
    ({ x, y, ...size }: BoundingBox) => {
      setCards((prev) => {
        const newScale = calculateScale(ORIGINAL_SIZE, size);

        return prev.map<BingoCardInfo>((info, i) => ({
          placement: {
            ...(i === idx ? { ...info.placement, x, y } : info.placement),
            scale: newScale,
          },
          cells: info.cells,
        }));
      });
    };

  const removeCardBy = (idx: number) => () => {
    setCards((prev) => prev.filter((_, i) => i !== idx));
  };

  const addCard = () => {
    const scale = cards[0]?.placement.scale ?? 1;
    const cells = getBingoCellValues();
    setCards((prev) => [
      ...prev,
      {
        cells,
        placement: {
          x: 100,
          y: 100,
          scale,
        },
      } satisfies BingoCardInfo,
    ]);
  };

  return { cards, setCardBy, removeCardBy, addCard };
};

export type BingoCardPlacement = Position & {
  scale: number;
};

export const CardsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <CardsContext.Provider value={useClientState('cards', [])}>{children}</CardsContext.Provider>;
};
