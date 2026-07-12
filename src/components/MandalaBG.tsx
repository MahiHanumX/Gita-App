import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, G, Line, Pattern, Rect } from 'react-native-svg';


type MandalaBGProps = {
  opacity?: number;
  from: string;
  via: string;
  to: string;
  stroke: string;
  glowColor: string;
  showBottomGlow?: boolean;
};

export function MandalaBG({
  opacity = 0.06,
  from,
  via,
  to,
  stroke,
  glowColor,
  showBottomGlow = true,
}: MandalaBGProps) {
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return {
      x1: 90 + Math.cos(a) * 16,
      y1: 90 + Math.sin(a) * 16,
      x2: 90 + Math.cos(a) * 70,
      y2: 90 + Math.sin(a) * 70,
    };
  });

  const dots = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45 + 22.5) * Math.PI) / 180;
    return { cx: 90 + Math.cos(a) * 52, cy: 90 + Math.sin(a) * 52 };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient colors={[from, via, to]} locations={[0, 0.55, 1]} style={StyleSheet.absoluteFill} />
      <View style={[styles.glow, { backgroundColor: glowColor }]} />
      {showBottomGlow && <View style={[styles.bottomGlow, { backgroundColor: glowColor }]} />}
      <Svg width="100%" height="100%" style={[StyleSheet.absoluteFill, { opacity }]}>
        <Defs>
          <Pattern id="mandala" patternUnits="userSpaceOnUse" width={180} height={180}>
            <G stroke={stroke} strokeWidth={0.8} fill="none">
              <Circle cx={90} cy={90} r={70} />
              <Circle cx={90} cy={90} r={52} />
              <Circle cx={90} cy={90} r={34} />
              <Circle cx={90} cy={90} r={16} />
              {petals.map((p, i) => (
                <Line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} />
              ))}
              {dots.map((d, i) => (
                <Circle key={i} cx={d.cx} cy={d.cy} r={3} />
              ))}
            </G>
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#mandala)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    top: -120,
    alignSelf: 'center',
    width: 480,
    height: 480,
    borderRadius: 240,
    opacity: 0.5,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -160,
    alignSelf: 'center',
    width: 520,
    height: 380,
    borderRadius: 260,
  },
});
