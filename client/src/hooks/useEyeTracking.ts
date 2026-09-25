import { useEffect, useRef, useState } from 'react';
import { characterConfig } from '../config/character';

export interface EyeTrackingState {
  pupilX: number; // clamped to ±4px
  pupilY: number; // clamped to ±3px
  headRotateX: number; // clamped to ±3deg
  headRotateY: number; // clamped to ±5deg
  isTracking: boolean;
}

export function useEyeTracking(
  characterContainerRef: React.RefObject<HTMLElement | null>,
  isHeroActive: boolean = true
) {
  const [state, setState] = useState<EyeTrackingState>({
    pupilX: 0,
    pupilY: 0,
    headRotateX: 0,
    headRotateY: 0,
    isTracking: false,
  });

  // Keep live values in refs to avoid React state re-rendering on high-frequency pointer moves
  const currentPupilX = useRef(0);
  const currentPupilY = useRef(0);
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);

  const targetPupilX = useRef(0);
  const targetPupilY = useRef(0);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);

  const isPointerInside = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const {
      faceLandmarks,
      springConfig,
      headTrackingStrength,
      eyeTrackingStrength,
    } = characterConfig;

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      if (!isHeroActive || !characterContainerRef.current) return;

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const rect = characterContainerRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width * (faceLandmarks.faceCenterXPercent / 100);
      const faceCenterY = rect.top + rect.height * (faceLandmarks.faceCenterYPercent / 100);

      const dx = clientX - faceCenterX;
      const dy = clientY - faceCenterY;
      const distance = Math.hypot(dx, dy);

      // Dead zone check
      if (distance < faceLandmarks.deadZoneRadius) {
        targetPupilX.current = 0;
        targetPupilY.current = 0;
        targetRotX.current = 0;
        targetRotY.current = 0;
        return;
      }

      isPointerInside.current = true;

      // Normalization based on viewport distance
      const maxDistX = Math.max(window.innerWidth * 0.45, 200);
      const maxDistY = Math.max(window.innerHeight * 0.45, 200);

      const normX = Math.max(-1, Math.min(1, dx / maxDistX));
      const normY = Math.max(-1, Math.min(1, dy / maxDistY));

      // Pupils: Clamp X: ±4px, Y: ±3px
      targetPupilX.current = normX * faceLandmarks.maxPupilDeltaX * eyeTrackingStrength;
      targetPupilY.current = normY * faceLandmarks.maxPupilDeltaY * eyeTrackingStrength;

      // Head: RotateX ±3deg (vertical tilt), RotateY ±5deg (horizontal turn)
      // Moving cursor down tilts head forward (positive X), moving cursor right turns head right (positive Y)
      targetRotX.current = -normY * 3.0 * headTrackingStrength;
      targetRotY.current = normX * 5.0 * headTrackingStrength;
    };

    const handlePointerLeave = () => {
      isPointerInside.current = false;
      targetPupilX.current = 0;
      targetPupilY.current = 0;
      targetRotX.current = 0;
      targetRotY.current = 0;
    };

    // Smooth physics loop using lerp/spring damping
    const updatePhysics = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Return speed factor: 600-1000ms return transition when pointer leaves
      const lerpSpeed = isPointerInside.current ? 8.0 : 4.0;
      const factor = 1 - Math.exp(-lerpSpeed * dt);

      currentPupilX.current += (targetPupilX.current - currentPupilX.current) * factor;
      currentPupilY.current += (targetPupilY.current - currentPupilY.current) * factor;
      currentRotX.current += (targetRotX.current - currentRotX.current) * factor;
      currentRotY.current += (targetRotY.current - currentRotY.current) * factor;

      // Update state for rendering
      setState({
        pupilX: Number(currentPupilX.current.toFixed(3)),
        pupilY: Number(currentPupilY.current.toFixed(3)),
        headRotateX: Number(currentRotX.current.toFixed(2)),
        headRotateY: Number(currentRotY.current.toFixed(2)),
        isTracking: isPointerInside.current,
      });

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave, { passive: true });

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [characterContainerRef, isHeroActive]);

  return state;
}
