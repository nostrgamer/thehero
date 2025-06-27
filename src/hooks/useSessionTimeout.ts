import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useSessionTimeout = () => {
  const { checkSessionTimeout, updateActivity } = useStore();

  // Check for session timeout on mount and set up activity listeners
  useEffect(() => {
    // Check timeout on app load
    checkSessionTimeout();

    // Update activity on user interactions
    const handleActivity = () => {
      updateActivity();
    };

    // Listen for user activity events
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Set up periodic timeout checks (every minute)
    const timeoutCheck = setInterval(() => {
      checkSessionTimeout();
    }, 60 * 1000); // 1 minute

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      clearInterval(timeoutCheck);
    };
  }, [checkSessionTimeout, updateActivity]);

  return { updateActivity };
}; 