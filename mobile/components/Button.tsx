import { forwardRef, Ref } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';

export const Button = forwardRef(function Button(
  { children, ...rest }: { children: React.ReactNode } & PressableProps,
  ref: Ref<View>
) {
  return (
    <Pressable
      className="text-md border-radius-1 items-center justify-center bg-primary-500 p-3"
      {...rest}
      ref={ref}>
      <Text className="text-white">{children}</Text>
    </Pressable>
  );
});
