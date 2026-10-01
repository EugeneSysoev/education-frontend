import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch (error) {
      console.error(`Не удалось прочитать ключ - ${key}`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Не удалось сохранить ключ - ${key}`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
