import { useEffect as reactUseEffect, useRef, type DependencyList, type EffectCallback } from 'react';

function usePrevious<T, U extends T>(value: T, initialValue: U): U {
  const ref = useRef(initialValue);
  reactUseEffect(() => {
    ref.current = value as U;
  });
  return ref.current;
}

export function useEffect(effectHook: EffectCallback, dependencies?: DependencyList, dependencyNames: string[] = []) {
  const previousDeps = usePrevious(dependencies, [] as DependencyList);

  const changedDeps = dependencies?.reduce<Record<string, { before: unknown; after: unknown }>>(
    (accum, dependency, index) => {
      if (dependency !== previousDeps[index]) {
        const keyName = dependencyNames[index] || index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency,
          },
        };
      }

      return accum;
    },
    {},
  );

  if (changedDeps && Object.keys(changedDeps).length) {
    console.debug('[use-effect-debugger] ', changedDeps);
  }

  reactUseEffect(effectHook, dependencies);
}
