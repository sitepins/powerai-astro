/**
 * motionProps.ts
 *
 * Variant configuration for use with the `motion` package's animate() API in .astro files.
 * Use these configs in <script> tags instead of motion React components.
 *
 * Example usage in .astro:
 * <script>
 *   import { animate, inView } from "motion";
 *   import { fadeInUp } from "@/lib/motionProps";
 *
 *   inView("[data-animate]", ({ target }) => {
 *     animate(target, fadeInUp.visible, fadeInUp.transition);
 *   });
 * </script>
 */

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const hero = {
  badge: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
  title: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  content: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
  buttons: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
  image: {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 1.2, delay: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * Helper to apply inView animations using motion's animate + inView.
 * Use in .astro <script> tags.
 */
export const defaultViewport = {
  once: true,
  margin: "-100px",
  amount: 0.2 as const,
};
