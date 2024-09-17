import {
  DraggableResizable as _DraggableResizable,
  type BoundingBox,
  type Position,
} from '../components/DraggableResizable';
import { createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useContext, useState } from 'react';
import { calculateScale, ORIGINAL_SIZE } from '../lib/scale';

export const CardsContext = createContext<
  [BingoCardPlacement[], Dispatch<SetStateAction<BingoCardPlacement[]>>] | null
>(null);
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

        return prev.map<BingoCardPlacement>((box, i) => ({
          ...(i === idx ? { ...box, x, y } : box),
          scale: newScale,
        }));
      });
    };

  const removeCardBy = (idx: number) => () => {
    setCards((prev) => prev.filter((_, i) => i !== idx));
  };

  const addCard = () => {
    const scale = cards[0]?.scale ?? 1;
    setCards((prev) => [
      ...prev,
      {
        x: 100,
        y: 100,
        scale,
      },
    ]);
  };

  return { cards, setCardBy, removeCardBy, addCard };
};

export type BingoCardPlacement = Position & {
  scale: number;
};

export const CardsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <CardsContext.Provider value={useState<BingoCardPlacement[]>([])}>{children}</CardsContext.Provider>;
};
