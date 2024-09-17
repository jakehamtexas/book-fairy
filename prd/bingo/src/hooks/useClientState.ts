import { useLocalStorage } from '@uidotdev/usehooks';

const STATE_KEYS = ['cards'] as const satisfies string[];

type StateKey = (typeof STATE_KEYS)[number];

type CardDesignState = {
  topPx: number;
  leftPx: number;
  widthPx: number;
  heightPx: number;
};

type ClientStateValue<TStateKey extends StateKey> = {
  cards: CardDesignState[];
}[TStateKey];

type ClientState<TStateKey extends StateKey> = [
  ClientStateValue<TStateKey>,
  React.Dispatch<React.SetStateAction<ClientStateValue<TStateKey>>>,
];

export const useClientState = <TStateKey extends StateKey>(
  key: TStateKey,
  initial?: ClientStateValue<TStateKey>,
): ClientState<TStateKey> => {
  const [v, setV] = useLocalStorage(key, initial);

  return [v, setV];
};
