import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Buttons,
  Container,
  FlexContainer,
  Hero,
  LineDivider,
  LoadingScreen,
  Perks,
  Typography,
} from "../../components/custom";
import useAPI from "../../hooks/useAPI";
import {getInterestsService, Interests, saveInterestsService } from "../../services/personalized";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  useNavigation,
} from "../../components/native";
import { useTheme } from "../../hooks";
import i18next from "../../Translate";
import { useDispatch } from "react-redux";
import { closeOnboardingModal } from "../../redux/slides/modalSlice";
import { refreshProfileData } from "../../redux/slides/authSlice";

type Props = {};

const Onboarding = (props: Props) => {
  const { data, isLoading, refetch } = useAPI({
    queryKey: ["getInterestsService"],
    queryFn: () => getInterestsService(),
  });  
  const { backgroundMaingrey, Title } = useTheme();
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState<Interests[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const dispatch = useDispatch();
  
  const toggleInterest = (interest: Interests) => {
    setSelectedInterests(prevState =>
      prevState.some(item => item.id === interest.id)
        ? prevState.filter(item => item.id !== interest.id)
        : [...prevState, interest]
    );
  };
  
  const saveInterests = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const response = await saveInterestsService(selectedInterests);
      setSaveSuccess(response.success);
      dispatch(refreshProfileData(true)); 
      if (response.success) {
        setTimeout(() => {
          navigation.navigate('TabsNavigation');
          dispatch(refreshProfileData(false)); 
        }, 500);
      }
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    }
  };

  const closeOnboarding = () => {
    dispatch(closeOnboardingModal());
  };

  if (isLoading) {
    return <LoadingScreen label={i18next.t("Loading interest")} />;
  }

  return (
    <Container
      showHeader={true}
      useSafeArea={true}
      showTwoIconsLabel={false}
      showSkip={true}
      label={i18next.t("Skip")}
      onPressSkip={closeOnboarding}
      >
      <Hero
        label={i18next.t("Choose Yours intereses")}
        sublabel={i18next.t("Personalize your experiencie by picking 3 or more topics")}
      />
      {saveError && <Perks label={i18next.t("Interests saved error!")} status='error'/>}
      {saveSuccess && <Perks label={i18next.t("Interests saved successfully!")} status="success"/>}
      <ScrollView>
        {data.map((category: any, index: number) => (
          <FlexContainer key={index} newStyle={styles.categoryContainer}>
            <Typography variant="subtitle" newStyle={styles.categoryTitle}>
              {i18next.t(category.category)}
            </Typography>
            <View style={styles.interestsContainer}>
              {category.list.map((interest: Interests, idx: number) => (
                <TouchableOpacity
                  key={interest.id}
                  style={[
                    styles.interestButton,
                    selectedInterests.some(item => item.id === interest.id) &&
                      styles.selectedInterestButton,
                    {
                      backgroundColor: !selectedInterests.some(item => item.id === interest.id) ? backgroundMaingrey : COLORS.primary,
                    },
                  ]}
                  onPress={() => toggleInterest(interest)}>
                  <Typography variant="H4title" newStyle={[styles.interestText, {
                    color: !selectedInterests.some(item => item.id === interest.id) ? Title : COLORS.dark
                  }]}>
                    {interest.interest}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </FlexContainer>
        ))}
      </ScrollView>
      <FlexContainer newStyle={styles.nextButton}>
        <Buttons 
          label={i18next.t("next")} 
          disabled={selectedInterests.length < 3} 
          onPress={saveInterests} 
          loading={isSaving}
        />
      </FlexContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
  },
  categoryTitle: {
    ...FONTS.heading18,
    marginBottom: SIZES.gapLarge,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestButton: {
    padding: SIZES.gapLarge,
    margin: 5,
    borderRadius: 20,
  },
  selectedInterestButton: {
    backgroundColor: "orange",
  },
  interestText: {
    ...FONTS.semi12,
  },
  nextButton: {
    padding: SIZES.gapMedium,
    alignItems: "center",
    margin: SIZES.gapLarge,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: SIZES.gapMedium,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: SIZES.gapMedium,
  },
});

export default Onboarding;