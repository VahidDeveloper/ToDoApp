"use client";
import { useEffect, useState } from "react";

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] {
  // State to store our value
  // Pass  initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
      if (window) {
        // browser code
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      }
      // If error also return initialValue
      return initialValue;
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue;
      // Save state
      if (window) {
        // browser code
       return window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      // A more advanced implementation would handle the error case
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
