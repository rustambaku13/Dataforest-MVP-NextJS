import { useState, useEffect } from 'react';

function useFlexibleWidth(defaultWidth = 700) {
  const [width, setWidth] = useState(defaultWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth > width ? width : "100%");
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  return width;
}

export default useFlexibleWidth;