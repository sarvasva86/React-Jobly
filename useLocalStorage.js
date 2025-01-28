import { useState } from "react";

function useLocalStorage(key, defaultValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error("Error reading localStorage key:", key, err);
      return defaultValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.error("Error setting localStorage key:", key, err);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
