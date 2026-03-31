/**
 * motionProps.ts
 * Vanilla JS animation config using the Web Animations API + motion library.
 * Use these in .astro components via <script> blocks instead of React motion components.
 *
 * Usage in .astro:
 * <script>
 *   import { animate } from "motion";
 *   import { variants } from "@/lib/motionProps";
 *   animate("#my-el", variants.fadeInUp.keyframes, variants.fadeInUp.options);
 * </script>
 */

const smooth = {
  duration: 0.5,
  easing: "ease-in-out" as const,
};

const slow = {
  duration: 0.8,
  easing: "ease-in-out" as const,
};

const verySlow = {
  duration: 1.2,
  easing: "ease-in-out" as const,
};

export type VariantEntry = {
  keyframes: Record<string, any[]>;
  options: Record<string, any>;
};

export const variants: Record<string, VariantEntry> = {
  // Fade in from below
  fadeInUp: {
    keyframes: { opacity: [0, 1], transform: ["translateY(30px)", "translateY(0)"] },
    options: { ...smooth },
  },

  // Fade in from above
  fadeInDown: {
    keyframes: { opacity: [0, 1], transform: ["translateY(-30px)", "translateY(0)"] },
    options: { ...smooth },
  },

  // Fade in from left
  fadeInLeft: {
    keyframes: { opacity: [0, 1], transform: ["translateX(-30px)", "translateX(0)"] },
    options: { ...smooth },
  },

  // Fade in from right
  fadeInRight: {
    keyframes: { opacity: [0, 1], transform: ["translateX(30px)", "translateX(0)"] },
    options: { ...smooth },
  },

  // Simple fade in
  fadeIn: {
    keyframes: { opacity: [0, 1] },
    options: { ...smooth },
  },

  // Hero badge slide down
  heroBadge: {
    keyframes: { opacity: [0, 1], transform: ["translateY(-20px)", "translateY(0)"] },
    options: { ...smooth, delay: 0.2 },
  },

  // Hero title slow reveal
  heroTitle: {
    keyframes: { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
    options: { ...slow, delay: 0.3 },
  },

  // Hero content
  heroContent: {
    keyframes: { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
    options: { ...smooth, delay: 0.5 },
  },

  // Hero buttons
  heroButtons: {
    keyframes: { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
    options: { ...smooth, delay: 0.6 },
  },

  // Hero image
  heroImage: {
    keyframes: { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0)"] },
    options: { ...verySlow, delay: 0.4 },
  },

  // Hero shape
  heroShape: {
    keyframes: { opacity: [0, 1], transform: ["scale(0.8)", "scale(1)"] },
    options: { ...verySlow, delay: 0.2 },
  },

  // Card reveal on scroll
  cardReveal: {
    keyframes: { opacity: [0, 1], transform: ["translateY(30px)", "translateY(0)"] },
    options: { ...smooth },
  },

  // Scale in
  scaleIn: {
    keyframes: { opacity: [0, 1], transform: ["scale(0.8)", "scale(1)"] },
    options: { ...smooth },
  },

  // Stagger helper — use delay offset per item
  staggerItem: {
    keyframes: { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
    options: { ...smooth },
  },
};

/**
 * Animate elements when they enter the viewport.
 * @param selector  CSS selector string
 * @param variant   Key from variants map
 * @param delayOffset  Additional delay in seconds (for stagger)
 */
export async function animateOnScroll(
  selector: string,
  variant: keyof typeof variants,
  delayOffset = 0,
): Promise<void> {
  const { animate, inView } = await import("motion");
  const v = variants[variant as string];
  if (!v) return;

  inView(selector, (element) => {
    animate(
      element,
      v.keyframes,
      { ...v.options, delay: (v.options.delay || 0) + delayOffset },
    );
  });
}
