import React, {useEffect} from 'react';

function useOutsideClickHandler(
  ref: React.MutableRefObject<any>,
  outsideClickHandler: () => void,
): void {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideClickHandler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [outsideClickHandler, ref]);
}

export default useOutsideClickHandler;
