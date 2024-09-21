import { useLocalStorage } from '@uidotdev/usehooks';
import type { BingoCardInfo } from '../providers/Cards';

type ClientStateValueMap = {
  cards: BingoCardInfo[];
  bgImgSrc: string;
};

type StateKey = keyof ClientStateValueMap;

type ClientStateValue<TStateKey extends StateKey> = ClientStateValueMap[TStateKey];

type ClientState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export function useClientState<TStateKey extends StateKey>(
  key: TStateKey,
): ClientState<ClientStateValue<TStateKey> | undefined>;
export function useClientState<TStateKey extends StateKey>(
  key: TStateKey,
  initial: ClientStateValue<TStateKey>,
): ClientState<ClientStateValue<TStateKey>>;
export function useClientState<TStateKey extends StateKey>(
  key: TStateKey,
  initial?: ClientStateValue<TStateKey>,
): ClientState<ClientStateValue<TStateKey> | undefined> {
  const [v, setV] = useLocalStorage(key, initial);

  return [v, setV] as ClientState<ClientStateValue<TStateKey> | undefined>;
}
