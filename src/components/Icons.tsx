import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { PALETTE } from '../theme/palette';

type IconProps = { size?: number; color?: string; lit?: boolean; flameColor?: string };

export function DiyaIcon({
  size = 26,
  lit = true,
  color = PALETTE.indigoDeep,
  flameColor = PALETTE.saffron,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      {lit && (
        <>
          <Path
            d="M16 3 C 13.5 7, 13.5 10, 16 12.5 C 18.5 10, 18.5 7, 16 3 Z"
            fill={flameColor}
          />
          <Path
            d="M16 5.5 C 14.8 8, 14.8 10, 16 11.5 C 17.2 10, 17.2 8, 16 5.5 Z"
            fill="#fff4d6"
            opacity={0.85}
          />
        </>
      )}
      <Rect x={15.4} y={12} width={1.2} height={3} rx={0.5} fill={color} opacity={0.5} />
      <Path d="M4 17 Q 16 15, 28 17 L 26 22 Q 16 25, 6 22 Z" fill={color} />
    </Svg>
  );
}

export function LockIcon({ size = 20, color = 'rgba(245,236,216,0.55)' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M7 10 V7 a5 5 0 0 1 10 0 v3"
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <Rect x={5} y={10} width={14} height={10} rx={2.5} fill={color} />
      <Circle cx={12} cy={15} r={1.3} fill={PALETTE.indigo} />
    </Svg>
  );
}

export function FlameIcon({ size = 18, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2 C 9 6, 6 8, 6 13 a6 6 0 0 0 12 0 c0-3 -2-5 -3-8 c-1 2 -2 3 -3 3 C 12 6, 13 4, 12 2 Z"
        fill={color}
      />
      <Path
        d="M12 10 C 10.5 12, 9.5 13.5, 9.5 15 a2.5 2.5 0 0 0 5 0 c0-1.5 -1-2.5 -2-4 c-0.3 0.8 -0.8 1.2 -1.5 1 C 11.2 11, 11.8 11, 12 10 Z"
        fill={PALETTE.saffronBright}
        opacity={0.85}
      />
    </Svg>
  );
}
