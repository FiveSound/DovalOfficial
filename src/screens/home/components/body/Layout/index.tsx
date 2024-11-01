import { ReactNode, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { useTheme } from '../../../../../hooks';
import { Container, LineDivider } from '../../../../../components/custom';
import { ScrollView } from '../../../../../components/native';
import { SIZES } from '../../../../../constants/theme';
import Header from '../../header';

type Props = {
  children: ReactNode;
  Append?: ReactNode;
};

const Layout = ({ children, Append }: Props) => {
  const { BackgroundMain, backgroundMaingrey, Title } = useTheme();
  const theme = useColorScheme();

  return (
    <Container
      useSafeArea={true}
      style={[
        styles.container,
        {
          backgroundColor: theme === 'dark' ? '#000' : '#fff',
        },
      ]}
    >
      <Header />
      {Append}
      <ScrollView
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {children}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
    alignItems: 'center',
    width: SIZES.width,
    backgroundColor: 'transparent',
  },
});

export default Layout;
