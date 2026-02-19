import { useEffect } from 'react';

/**
 * Custom hook to set page title dynamically
 * @param {string} title - The page title to set
 */
export const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default usePageTitle;
