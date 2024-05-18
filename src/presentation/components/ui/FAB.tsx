import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';
import MyIcon from './MyIcon';

interface FABProps extends React.ComponentProps<typeof Button> {
  iconName?: string;
}

export default function FAB({style, iconName = 'plus', ...props}: FABProps) {
  return (
    <Button
      style={[styles.button, style]}
      accessoryLeft={<MyIcon name={iconName} white />}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 13,
  },
});
