import { useState, useEffect } from 'react';

const WidthScreen = () => {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default WidthScreen;


