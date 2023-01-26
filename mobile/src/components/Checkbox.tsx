import {
  Text,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

import { Feather } from '@expo/vector-icons';

interface ICheckboxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

const Checkbox = ({ title, checked = false, ...props }: ICheckboxProps) => {
  return (
    <TouchableOpacity
      className="flex-row items-center mb-2"
      activeOpacity={0.7}
      {...props}
    >
      {checked && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="items-center justify-center h-8 w-8 bg-green-500 rounded-lg"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      )}

      {!checked && <View className="h-8 w-8 bg-zinc-900 rounded-lg" />}

      <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export { Checkbox };
