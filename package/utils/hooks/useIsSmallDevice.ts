import { useState, useEffect } from 'react';

export const useIsSmallDevice = (): { isSmallDevice: boolean } => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsSmallDevice(
      /iphone|ipod|android|blackberry|windows phone|ipad|tablet|playbook|silk/g.test(
        userAgent
      )
    );
  }, []);

  return {
    isSmallDevice,
  };
};
