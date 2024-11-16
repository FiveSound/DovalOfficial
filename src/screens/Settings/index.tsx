import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  CardsPreview,
  Container,
  FlexContainer,
  LoadingScreen,
  PersonalInf,
  Typography,
} from "../../components/custom";
import i18next from "../../Translate";
import { SettingsData } from "./data";
import { SIZES } from "../../constants/theme";
import { useAppSelector } from "../../redux";
import Signup from "../auth/Signup";
import SignOut from "../auth/SignOut";
import { useTheme } from "../../hooks";
import {
  AddCircleHalfDotIcon,
  Coupon01Icon,
  HelpSquareIcon,
  LanguageSkillIcon,
  Legal01Icon,
  Location09Icon,
  Notification03IconStroke,
  Store01IconStroke,
  UserStatusIcon,
  Wallet02Icon,
} from "../../constants/IconsPro";
import { TabBarVisibilityContext } from "../../context/TabBarVisibilityContext";

const Settings = () => {
  const { isAuthenticated, isLoadingApp } = useAppSelector((state) => state.auth);
  const { Description, Title } = useTheme();
  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(false);

    return () => {
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);

  if (isLoadingApp) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Signup />;
  }

  const footerCustom = <SignOut />;

  const Settings = [
    {
      id: "General",
      label: i18next.t("General"),
      content: [
        {
          id: "Account",
          label: i18next.t("Account"),
          navigation: "Account",
          icon: <UserStatusIcon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
        // {
        //     id: 'Privacy',
        //     label: 'Privacy',
        //     navigation: 'Privacy',
        //     icon: <AddCircleHalfDotIcon />
        // },
        // {
        //     id: 'Security',
        //     label: 'Security',
        //     navigation: 'Security',
        //     icon: <AddCircleHalfDotIcon />
        // },
        {
          id: "Paymentmethods",
          label: i18next.t("Payment methods"),
          navigation: "PaymentsGeneral",
          icon: <Wallet02Icon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
        {
          id: "MyLocations",
          label: i18next.t("My Locations"),
          navigation: "MyLocationsGeneral",
          icon: <Location09Icon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
        {
          id: "MyCoupons",
          label: i18next.t("My Coupons"),
          navigation: "Coupons",
          icon: <Coupon01Icon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
      ],
    },
    // {
    //     id: 'Display',
    //     label: i18next.t('Display'),
    //     content: [
    //         {
    //             id: 'Notifications',
    //             label: i18next.t('Notifications'),
    //             navigation: 'Notifications',
    //             icon: <Notification03IconStroke width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title}/>
    //         },
    //         {
    //             id: 'Languages & Currency',
    //             label: i18next.t('Languages & Currency'),
    //             navigation: 'Languages',
    //             icon: <LanguageSkillIcon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title}/>
    //         },
    // {
    //     id: 'Dark Mode',
    //       label: i18next.t('Dark Mode') ,
    //       navigation: 'Dark Mode',
    //       icon: (
    //         <AddCircleHalfDotIcon
    //           width={SIZES.icons / 1.1}
    //           height={SIZES.icons / 1.1}
    //           color={Title}
    //         />
    //       ),
    //       isNavigation: true,
    //     },
    //   ],
    // },
    {
      id: "Support and about",
      label: i18next.t("Support and about"),
      content: [
        {
          id: "Legal",
          label: i18next.t("Legal"),
          navigation: "Legal",
          icon: <Legal01Icon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
        {
          id: "Support",
          label: i18next.t("Support"),
          navigation: "Support",
          icon: <HelpSquareIcon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
        {
          id: "Report a problem",
          label: i18next.t("Report a problem"),
          navigation: "Report",
          icon: <HelpSquareIcon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
        {
          id: "Register business",
          label: i18next.t("Register business"),
          navigation: "FormVerified",
          icon: <Store01IconStroke width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
        {
          id: "Register delivery",
          label: i18next.t("Register delivery"),
          navigation: "RegisterDelivery",
          icon: <AddCircleHalfDotIcon width={SIZES.icons / 1.1} height={SIZES.icons / 1.1} color={Title} />,
          isNavigation: true,
        },
      ],
    },
  ];

  return (
    <Container showHeader={true} showBack={true} label={i18next.t("My Settings")} style={styles.container}>
      <CardsPreview row={SettingsData} showAvatar={true} />
      <PersonalInf row={Settings} footerCustom={footerCustom} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapSmall,
  },
});

export default Settings;
