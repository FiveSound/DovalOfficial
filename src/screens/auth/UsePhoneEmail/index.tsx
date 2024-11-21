import React, { useContext, useEffect } from 'react';
import Tabs from '../../../components/custom/Tabs';
import { Container, TwoIconsLabel } from '../../../components/custom';
import Phone from './Phone';
import SignUpEmail from './Email';
import i18next from '../../../Translate';
import { TabBarVisibilityContext } from '../../../context/TabBarVisibilityContext';

type Props = {};

const UsePhoneEmail = (props: Props) => {
    const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(false);

    return () => {
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);


  const tabs = [
    { key: 'Phone', title: i18next.t('Phone'), content: <Phone /> },
    { key: 'Email', title: i18next.t('Email'), content: <SignUpEmail /> },
  ];
  return (
    <Container
      useSafeArea={true}
      label={i18next.t('Sign up')}
      showHeader={true}
    >
      <Tabs tabs={tabs} isBorder={true} />
    </Container>
  );
};

export default UsePhoneEmail;
