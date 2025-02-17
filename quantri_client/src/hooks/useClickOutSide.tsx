import { RefObject, useEffect } from "react";

//https://stackoverflow.com/questions/65876809/property-current-does-not-exist-on-type-instance-htmldivelement-null
export const useClickOutSide = (ref: RefObject<HTMLElement>, handler: (...arg:any) => any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: MouseEvent) {
       
        if (event.target instanceof HTMLElement && ref.current && !ref.current.contains(event.target)) {
             handler()
           
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  