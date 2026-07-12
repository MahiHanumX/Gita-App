import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { PathScreen } from '../screens/path/PathScreen';
import { LibraryNavigator } from './LibraryNavigator';
import { PracticeHomeScreen } from '../screens/practice/PracticeHomeScreen';
import { ProfileNavigator } from './ProfileNavigator';
import { DiyaIcon } from '../components/Icons';
import { MainTabParamList } from './types';
import { useTheme, AppTheme } from '../theme';
import { useTranslation } from '../i18n';

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ name, active, theme }: { name: string; active: boolean; theme: AppTheme }) {
  const c = active ? theme.tabActive : theme.tabInactive;
  const s = 22;
  if (name === 'Path') {
    return (
      <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <Path d="M4 6 Q 12 6, 12 12 T 20 18" stroke={c} strokeWidth={2} strokeLinecap="round" strokeDasharray="1 3" />
        <Circle cx={4} cy={6} r={2} fill={c} />
        <Circle cx={20} cy={18} r={2.5} fill={c} />
      </Svg>
    );
  }
  if (name === 'Library') {
    return (
      <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <Rect x={4} y={4} width={4} height={16} rx={1} stroke={c} strokeWidth={1.8} />
        <Rect x={10} y={4} width={4} height={16} rx={1} stroke={c} strokeWidth={1.8} />
        <Path d="M17 5 L21 6 L18 19 L14 18 Z" stroke={c} strokeWidth={1.8} />
      </Svg>
    );
  }
  if (name === 'Practice') {
    return <DiyaIcon size={s} color={c} flameColor={c} />;
  }
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={c} strokeWidth={1.8} />
      <Path d="M4 21 c 0 -4 4 -7 8 -7 s 8 3 8 7" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function MainTabNavigator() {
  const t = useTranslation();
  const { theme, resolvedMode } = useTheme();

  const tabBarStyle = {
    backgroundColor: theme.tabBarBg,
    borderTopColor: theme.tabBarBorder,
    paddingTop: 8,
    height: 72,
  };

  return (
    <Tab.Navigator
      key={resolvedMode}
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        
        // Hide bottom tab bar on child screens of Profile stack
        const isProfileChild = route.name === 'Profile' && routeName && routeName !== 'ProfileHome';
        // Hide bottom tab bar on child screens of Library stack (e.g. ChapterDetail, Search, VerseDetail)
        const isLibraryChild = route.name === 'Library' && routeName && routeName !== 'LibraryHome';

        const shouldHideTabBar = isProfileChild || isLibraryChild;

        return {
          headerShown: false,
          tabBarStyle: shouldHideTabBar ? { display: 'none' } : tabBarStyle,
          tabBarActiveTintColor: theme.tabActive,
          tabBarInactiveTintColor: theme.tabInactive,
          tabBarLabelStyle: {
            fontFamily: 'Poppins_500Medium',
            fontSize: 10,
            letterSpacing: 0.4,
          },
          tabBarIcon: ({ focused }) => (
            <TabIcon name={route.name} active={focused} theme={theme} />
          ),
        };
      }}
    >
      <Tab.Screen name="Path" component={PathScreen} options={{ tabBarLabel: t.tabs.path }} />
      <Tab.Screen name="Library" component={LibraryNavigator} options={{ tabBarLabel: t.tabs.library }} />
      <Tab.Screen name="Practice" component={PracticeHomeScreen} options={{ tabBarLabel: t.tabs.practice }} />
      <Tab.Screen name="Profile" component={ProfileNavigator} options={{ tabBarLabel: t.tabs.profile }} />
    </Tab.Navigator>
  );
}
