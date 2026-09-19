import confetti from 'canvas-confetti';

/**
 * Trigger a burst of magical glitter sparkles with cyan, gold, pink, purple, and white stars.
 */
export const triggerMagicalGlitter = (originY = 0.6) => {
  // Sparkle stars
  confetti({
    particleCount: 40,
    spread: 80,
    origin: { y: originY },
    colors: ['#38bdf8', '#f472b6', '#fef08a', '#c084fc', '#ffffff'],
    shapes: ['star', 'circle'],
    scalar: 1,
    ticks: 120,
    gravity: 0.7,
    drift: 0,
  });

  // Secondary fine glitter shimmer
  setTimeout(() => {
    confetti({
      particleCount: 25,
      spread: 100,
      origin: { y: originY + 0.1 },
      colors: ['#67e8f9', '#fbcfe8', '#ffffff'],
      shapes: ['circle'],
      scalar: 0.6,
      ticks: 80,
      gravity: 0.5,
    });
  }, 120);
};
