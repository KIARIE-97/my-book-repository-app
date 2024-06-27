import {useState} from 'react'

function useLocalStorage<T>(key: string, initialValue: T)  {
    const [storedValue, setStoredValue] = useState(() => {
        try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
        } catch (error) {
        console.log(error)
        return initialValue
        }
    })
    const setValue = (value: T) => {
        try {
          setStoredValue(value);
          window.localStorage.setItem(key, JSON.stringify(value)); // set the value to local storage
        } catch (error) {
          console.error(error);
        }
      };
    
      return [storedValue, setValue] as const;
    }

export default useLocalStorage