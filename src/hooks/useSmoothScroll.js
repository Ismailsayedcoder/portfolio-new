import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    // Prevent default smooth scroll behavior
    const preventDefault = (e) => {
      e.preventDefault();
    };

    // Custom smooth scroll function
    const smoothScroll = (target, duration = 1000) => {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      // Easing function for smooth acceleration and deceleration
      const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    };

    // Disable default wheel smooth scroll
    const disableNativeSmooth = () => {
      document.body.style.scrollBehavior = 'auto';
    };

    // Add event listeners to handle smooth scrolling
    const handleSmoothScroll = (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          smoothScroll(targetElement);
        }
      }
    };

    // Wheel event handler to prevent default scrolling
    const handleWheel = (e) => {
      if (e.ctrlKey) return; // Allow zooming
      e.preventDefault();
    };

    // Touch event handlers for mobile smooth scrolling
    const touchHandler = (e) => {
      const touch = e.touches[0] || e.changedTouches[0];
      const touchStartY = touch.pageY;

      const handleTouchMove = (moveEvent) => {
        moveEvent.preventDefault();
        const currentTouch = moveEvent.touches[0] || moveEvent.changedTouches[0];
        const deltaY = currentTouch.pageY - touchStartY;
        window.scrollBy(0, -deltaY);
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', handleTouchMove);
      }, { once: true });
    };

    // Performance optimization for scroll
    const optimizeScroll = () => {
      const html = document.documentElement;
      html.style.scrollBehavior = 'smooth';
      html.style.overscrollBehavior = 'none'; // Prevent bounce effect on mobile
    };

    // Attach event listeners
    document.addEventListener('click', handleSmoothScroll);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', touchHandler, { passive: false });

    // Initial setup
    disableNativeSmooth();
    optimizeScroll();

    // Cleanup
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', touchHandler);
    };
  }, []);
};

export default useSmoothScroll;
