import { useState, useEffect } from 'react';

function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    let timeOut = null;

    function handleResize() {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => setWindowWidth(getWindowWidth()), 200)
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}
