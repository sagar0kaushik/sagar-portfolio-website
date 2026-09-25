import React from 'react';
import { motion } from 'framer-motion';
import { characterConfig } from '../config/character';

interface EyeTrackingProps {
  pupilDeltaX: number; // clamped to ±4px
  pupilDeltaY: number; // clamped to ±3px
  isTracking: boolean;
  separateEyeAssets?: boolean;
  leftPupilSrc?: string;
  rightPupilSrc?: string;
}

export const LeftPupil: React.FC<{ deltaX: number; deltaY: number; pupilSrc?: string }> = ({
  deltaX,
  deltaY,
  pupilSrc,
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${characterConfig.faceLandmarks.leftEyePercent.x}%`,
        top: `${characterConfig.faceLandmarks.leftEyePercent.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        x: deltaX,
        y: deltaY,
      }}
      transition={{
        type: 'spring',
        stiffness: characterConfig.springConfig.stiffness,
        damping: characterConfig.springConfig.damping,
        mass: characterConfig.springConfig.mass,
      }}
    >
      {pupilSrc ? (
        <img src={pupilSrc} alt="Left pupil" className="w-4 h-4 object-contain" />
      ) : (
        /* Subtle iris/pupil overlay tracking layer blending perfectly with character eye */
        <div className="relative w-3.5 h-3.5 rounded-full bg-neutral-900/60 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 -translate-x-0.5 -translate-y-0.5" />
        </div>
      )}
    </motion.div>
  );
};

export const RightPupil: React.FC<{ deltaX: number; deltaY: number; pupilSrc?: string }> = ({
  deltaX,
  deltaY,
  pupilSrc,
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${characterConfig.faceLandmarks.rightEyePercent.x}%`,
        top: `${characterConfig.faceLandmarks.rightEyePercent.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        x: deltaX,
        y: deltaY,
      }}
      transition={{
        type: 'spring',
        stiffness: characterConfig.springConfig.stiffness,
        damping: characterConfig.springConfig.damping,
        mass: characterConfig.springConfig.mass,
      }}
    >
      {pupilSrc ? (
        <img src={pupilSrc} alt="Right pupil" className="w-4 h-4 object-contain" />
      ) : (
        <div className="relative w-3.5 h-3.5 rounded-full bg-neutral-900/60 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/40 -translate-x-0.5 -translate-y-0.5" />
        </div>
      )}
    </motion.div>
  );
};

export const LeftEye: React.FC<{
  children: React.ReactNode;
  eyeSocketSrc?: string;
}> = ({ children, eyeSocketSrc }) => {
  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        left: `${characterConfig.faceLandmarks.leftEyePercent.x}%`,
        top: `${characterConfig.faceLandmarks.leftEyePercent.y}%`,
        width: '6.5%',
        height: '4.2%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50% 50% 45% 45%',
      }}
    >
      {eyeSocketSrc && (
        <img src={eyeSocketSrc} alt="Left eye sclera" className="w-full h-full object-cover" />
      )}
      {children}
    </div>
  );
};

export const RightEye: React.FC<{
  children: React.ReactNode;
  eyeSocketSrc?: string;
}> = ({ children, eyeSocketSrc }) => {
  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        left: `${characterConfig.faceLandmarks.rightEyePercent.x}%`,
        top: `${characterConfig.faceLandmarks.rightEyePercent.y}%`,
        width: '6.5%',
        height: '4.2%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50% 50% 45% 45%',
      }}
    >
      {eyeSocketSrc && (
        <img src={eyeSocketSrc} alt="Right eye sclera" className="w-full h-full object-cover" />
      )}
      {children}
    </div>
  );
};

export const EyeTracking: React.FC<EyeTrackingProps> = ({
  pupilDeltaX,
  pupilDeltaY,
  isTracking,
  separateEyeAssets = false,
  leftPupilSrc,
  rightPupilSrc,
}) => {
  // Eye tracking overlay with optional separate assets architecture
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <LeftEye>
        <LeftPupil deltaX={pupilDeltaX} deltaY={pupilDeltaY} pupilSrc={leftPupilSrc} />
      </LeftEye>
      <RightEye>
        <RightPupil deltaX={pupilDeltaX} deltaY={pupilDeltaY} pupilSrc={rightPupilSrc} />
      </RightEye>
    </div>
  );
};
