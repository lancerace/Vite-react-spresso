import { useCallback, useEffect, useState } from 'react';

export default function useNavBar(MOBILE_WIDTH: number) {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth <= MOBILE_WIDTH);
    window.addEventListener('resize', handleWindowResizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowResizeChange);
    };
  }, [MOBILE_WIDTH]);

  const handleWindowResizeChange = useCallback(() => {
    setIsMobile(window.innerWidth <= MOBILE_WIDTH);
  }, [MOBILE_WIDTH]);

  const getters = {
    isMobile,
    expanded
  };

  const actions = {
    setIsMobile,
    setExpanded,
    handleWindowResizeChange
  };
  return [getters, actions];
}
