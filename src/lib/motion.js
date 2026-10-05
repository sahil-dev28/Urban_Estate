// Shared entrance animation (tw-animate-css). Skipped for users who prefer reduced motion.
export const enterUp =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500 fill-mode-both";

export const stagger = (index, step = 50) => ({
  animationDelay: `${index * step}ms`,
});
