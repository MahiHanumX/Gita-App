import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

type DiyaIconProps = {
  size?: number;
  color?: string;
  flameColor?: string;
};

export function DiyaIcon({
  size = 24,
  color = '#1a1b3a',
  flameColor = '#c67a1a',
}: DiyaIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#f4c257" />
          <Stop offset="100%" stopColor={flameColor} />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 2 C 12 2, 9 8, 12 12 C 15 8, 12 2, 12 2 Z"
        fill="url(#flame)"
      />
      <Path
        d="M 4 14 C 4 18, 8 20, 12 20 C 16 20, 20 18, 20 14 Z"
        fill={color}
      />
      <Path
        d="M 3 14 L 21 14"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
