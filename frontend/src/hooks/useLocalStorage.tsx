"use client";
import {useEffect, useState} from "react";

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(key: string, initialValue: T,): [T, (value: SetValue<T>) => void] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    // State to store our value
    // Pass  initial state function to useState so logic is only executed once
    useEffect(() => {
        if (typeof window === "undefined") {
            // If we're on the server, exit early
            return;
        }
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error(error);
        }
    }, [key]);

    // useEffect to update local storage when the state changes
    useEffect(() => {
        // Save state
        if (typeof window === "undefined") {
            return;
        }
        try {
            const valueToStore = storedValue instanceof Function ? storedValue(storedValue) : storedValue;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
        // A more advanced implementation would handle the error case
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
