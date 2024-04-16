import { useEffect, useState } from "react";


export default function useDebounce<T>(value:T,delay:number):T{
   //state and setters for debounce value
   const [debounceValue, setDebounceValue] = useState<T>(value);

   useEffect(() => {
    //update debounced value after delay
    const handler = setTimeout(() => {
        setDebounceValue(value);
    },delay);

    return () => {
        clearTimeout(handler);
    };
   },[value,delay]);

   return debounceValue;
}