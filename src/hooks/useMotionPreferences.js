import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

export const useFadeInUp = (delay = 0, amount = 0.2) => {
  const shouldReduceMotion = useReducedMotion();

  return useMemo(() => {
    if (shouldReduceMotion) {
      return {};
    }

    return {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount },
      transition: { duration: 0.6, ease: 'easeOut', delay },
    };
  }, [shouldReduceMotion, delay, amount]);
};

export const useFadeIn = (delay = 0, amount = 0.1) => {
  const shouldReduceMotion = useReducedMotion();

  return useMemo(() => {
    if (shouldReduceMotion) {
      return {};
    }

    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, amount },
      transition: { duration: 0.6, ease: 'easeOut', delay },
    };
  }, [shouldReduceMotion, delay, amount]);
};

export const useHoverLift = () => {
  const shouldReduceMotion = useReducedMotion();

  return useMemo(
    () =>
      shouldReduceMotion
        ? {}
        : {
            whileHover: {
              y: -6,
              boxShadow: '0 28px 60px -32px rgba(15, 23, 42, 0.45)',
              transition: { type: 'spring', stiffness: 320, damping: 26 },
            },
          },
    [shouldReduceMotion],
  );
};
