export interface CharacterConfig {
  characterPath: string;
  fallbackPath: string;
  desktopScale: number;
  tabletScale: number;
  mobileScale: number;
  desktopPosition: { x: string; y: string };
  tabletPosition: { x: string; y: string };
  mobilePosition: { x: string; y: string };
  eyeTrackingStrength: number;
  headTrackingStrength: number;
  parallaxStrength: number;
  hoverScale: number;
  floatAmplitude: number;
  floatDuration: number;
  // Face & eye geometry based on the character PNG
  faceLandmarks: {
    faceCenterXPercent: number;
    faceCenterYPercent: number;
    leftEyePercent: { x: number; y: number };
    rightEyePercent: { x: number; y: number };
    maxPupilDeltaX: number; // ±4px as required
    maxPupilDeltaY: number; // ±3px as required
    deadZoneRadius: number; // px dead zone
    returnDurationMs: number; // 600-1000ms return transition
  };
  springConfig: {
    stiffness: number;
    damping: number;
    mass: number;
  };
}

export const characterConfig: CharacterConfig = {
  characterPath: '/assets/char-center.png',
  fallbackPath: '/assets/char-center.png',
  desktopScale: 1.0,
  tabletScale: 0.85,
  mobileScale: 0.72,
  desktopPosition: { x: 'right-1/12', y: 'top-1/2 -translate-y-1/2' },
  tabletPosition: { x: 'right-4', y: 'top-1/2 -translate-y-1/2' },
  mobilePosition: { x: 'mx-auto', y: 'mt-6' },
  eyeTrackingStrength: 1.0,
  headTrackingStrength: 1.0, // rotateX ±3deg, rotateY ±5deg
  parallaxStrength: 15,      // 10-20px max movement
  hoverScale: 1.015,         // max scale 1.015 on hover
  floatAmplitude: 8,         // subtle floating 8px
  floatDuration: 5,          // 5 seconds float cycle
  faceLandmarks: {
    faceCenterXPercent: 50.2, // ~342.5px in 682px width
    faceCenterYPercent: 18.5, // ~190px in 1024px height
    leftEyePercent: { x: 45.16, y: 18.07 },
    rightEyePercent: { x: 55.28, y: 18.46 },
    maxPupilDeltaX: 4,        // clamp ±4px
    maxPupilDeltaY: 3,        // clamp ±3px
    deadZoneRadius: 15,       // dead zone around center
    returnDurationMs: 800,    // smooth return to neutral
  },
  springConfig: {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  },
};
