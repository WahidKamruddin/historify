import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ReactNode } from 'react';
import React from 'react';

type ThemedViewProps = {
  children: ReactNode;
};

const ThemedView = ({ children }: ThemedViewProps) => {
  const inset = useSafeAreaInsets();
  return (
    <View className="px-6" style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      {children}
    </View>
  );
};

export default ThemedView;
