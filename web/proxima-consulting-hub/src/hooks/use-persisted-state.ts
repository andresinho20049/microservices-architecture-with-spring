'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>,
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    setState(state => {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null) {
        if (typeof state === 'function') {
          return (state as () => T)();
        } else {
          return state;
        }
      } else {
        return JSON.parse(storedValue);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;