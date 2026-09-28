import React from 'react';
import { CharacterProp, CharacterPropProps, PROP_CONFIG } from './CharacterProp';

export { CharacterProp, PROP_CONFIG };
export type { CharacterPropProps };

export interface InteractiveCharacterProps extends CharacterPropProps {
  isHeroActive?: boolean;
}

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({
  isHeroActive,
  isTrackingActive,
  ...props
}) => {
  return (
    <CharacterProp
      isTrackingActive={isTrackingActive ?? isHeroActive ?? true}
      {...props}
    />
  );
};

export default InteractiveCharacter;
