import React, { useEffect, useRef } from 'react';

function useClickOutside(handler) {
  let domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('click', maybeHandler);

    return () => {
      document.removeEventListener('click', maybeHandler);
    };
  });

  return domNode;
}

export default useClickOutside;
