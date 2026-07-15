import { useState, useEffect } from "react";

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
];

export const useLocalStorage = <T,>(
  key: string,
  initialValue?: T
): ReturnType<T> => {
  const [state, setState] = useState<T | undefined>(() => {
    const stored = localStorage.getItem(key);
    if (!stored) return initialValue;
    try {
      return JSON.parse(stored);
    } catch (err) {
      console.error(`Failed to parse stored value for "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.error(`Failed to persist "${key}" to localStorage:`, err);
      }
    }
  }, [state, key]);
  return [state, setState];
};
