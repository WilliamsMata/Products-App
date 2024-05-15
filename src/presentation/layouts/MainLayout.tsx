import {useNavigation} from '@react-navigation/native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {type PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MyIcon from '../components/ui/MyIcon';

interface MainLayoutProps extends PropsWithChildren {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;
}

const RenderRightAction = ({
  rightAction,
  rightActionIcon,
}: Pick<MainLayoutProps, 'rightAction' | 'rightActionIcon'>) => {
  if (!rightAction || !rightActionIcon) {
    return null;
  }

  return (
    <TopNavigationAction
      icon={<MyIcon name={rightActionIcon} />}
      onPress={rightAction}
    />
  );
};

export default function MainLayout({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: MainLayoutProps) {
  const {top} = useSafeAreaInsets();

  const {canGoBack, goBack} = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const renderRightAction = () => (
    <RenderRightAction
      rightAction={rightAction}
      rightActionIcon={rightActionIcon}
    />
  );

  return (
    <Layout style={{paddingTop: top}}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={renderRightAction}
      />
      <Divider />
      <Layout style={styles.container}>{children}</Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
