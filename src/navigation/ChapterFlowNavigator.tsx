import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShlokaScreen } from '../screens/chapters/ShlokaScreen';
import { TeachingScreen } from '../screens/chapters/TeachingScreen';
import { TaskScreen } from '../screens/chapters/TaskScreen';
import { ReflectScreen } from '../screens/chapters/ReflectScreen';
import { CompleteChapterScreen } from '../screens/chapters/CompleteChapterScreen';
import { MilestoneCompleteScreen } from '../screens/path/MilestoneCompleteScreen';
import { ChapterFlowParamList } from './types';

const Stack = createNativeStackNavigator<ChapterFlowParamList>();

export function ChapterFlowNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#0f102b' },
      }}
    >
      <Stack.Screen name="Shloka" component={ShlokaScreen} />
      <Stack.Screen name="Teaching" component={TeachingScreen} />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="Reflect" component={ReflectScreen} />
      <Stack.Screen name="Complete" component={CompleteChapterScreen} />
      <Stack.Screen name="MilestoneComplete" component={MilestoneCompleteScreen} />
    </Stack.Navigator>
  );
}
