import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  FlexContainer,
  Hero,
  LineDivider,
  InfoCard,
} from '../../../../components/custom';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { Checkbox } from '../../../../components/custom/Checkbox';
import { CheckmarkCircle02Icon } from '../../../../constants/IconsPro';
import { BusinessRegistrationForm } from '../../../../types/FormType';
import i18next from '../../../../Translate';

type props = {
  data: BusinessRegistrationForm;
  onAgreementChange: (checked: boolean) => void;
  onNavigate: (index: number) => void;
};

const AgreementsStep = ({ data, onAgreementChange, onNavigate }: props) => {
  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    privacy: false,
    verification: false,
  });

  useEffect(() => {
    const allChecked = Object.values(checkboxes).every(Boolean);
    onAgreementChange(allChecked);
  }, [checkboxes, onAgreementChange]);

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setCheckboxes(prev => ({ ...prev, [name]: checked }));
  };

  const formatBusinessTypes = (businessTypes: Array<{ label: string }>) => {
    if (!businessTypes || businessTypes.length === 0) return '';
    return businessTypes.map(bt => bt.label).join(', ');
  };

  // Updated Schedule Processing
  const processSchedules = () => {
    const { schedule, schedules } = data;

    const processedSchedules: Array<{
      days: string[];
      opening_time: string;
      closing_time: string;
    }> = [];

    // Process individual days from 'schedule' object
    if (schedule) {
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const enabledDays = daysOfWeek.filter(day => schedule[day]?.enabled);

      if (enabledDays.length > 0) {
        const daysLabels = enabledDays.map(day => day.charAt(0).toUpperCase() + day.slice(1));
        const openingTimes = enabledDays.map(day => schedule[day]?.startTime ? new Date(schedule[day].startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');
        const closingTimes = enabledDays.map(day => schedule[day]?.endTime ? new Date(schedule[day].endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '');

        processedSchedules.push({
          days: daysLabels,
          opening_time: openingTimes.join(', '),
          closing_time: closingTimes.join(', '),
        });
      }
    }

    // Process additional schedules from 'schedules' array if present
    if (schedules && schedules.length > 0) {
      schedules.forEach(sch => {
        const days = sch.days.map((day: string) => day.charAt(0).toUpperCase() + day.slice(1));
        const opening_time = sch.opening_time ? new Date(sch.opening_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No especificado';
        const closing_time = sch.closing_time ? new Date(sch.closing_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No especificado';

        processedSchedules.push({
          days,
          opening_time,
          closing_time,
        });
      });
    }

    return processedSchedules;
  };

  const schedules = processSchedules();

  const infoCards = [
    // Step 1: Basic Business Information
    {
      label: 'Business types',
      value: formatBusinessTypes(data.business_types),
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Business Name',
      value: data.business_name,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Business Description',
      value: data.business_description,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Tax Identification Number',
      value: data.tax_identification_number,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    // Divider
    { label: '---', value: '---' },
    // Step 2: Professional Information
    {
      label: 'Full Name',
      value: data.full_name,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Identification Number',
      value: data.identification_number,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Role',
      value: data.role,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Email',
      value: data.email,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Phone Number',
      value: data.phone_number,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    // Divider
    { label: '---', value: '---' },
    // Step 3: Financial Information
    {
      label: 'Street',
      value: data.address,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'City',
      value: data.city,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Country',
      value: data.country,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Zip Code',
      value: data.postal_code,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    // Divider
    { label: '---', value: '---' },
    // Step 4: Operations Information
    {
      label: 'Schedule Days',
      value: schedules.map(schedule => schedule.days.join(', ')).join('; '),
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Opening Time',
      value: schedules.map(schedule => schedule.opening_time).join('; '),
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Closing Time',
      value: schedules.map(schedule => schedule.closing_time).join('; '),
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Our Rider',
      value: Array.isArray(data.OurRiders)
        ? data.OurRiders.map(rider => rider.label).join(', ')
        : '',
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    }, // Divider
    { label: '---', value: '---' },
    // Step 5: Financial Information
    {
      label: 'Bank Name',
      value: data.bank_details,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Currency',
      value: data.account_currency,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Account Type',
      value: data.account_type,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Account Number',
      value: data.account_number,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Account Holder Name',
      value: data.account_holder_name,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    {
      label: 'Fiscal Identification',
      value: data.fiscal_identification,
      icons: (
        <CheckmarkCircle02Icon
          color={COLORS.success}
          width={SIZES.icons / 1.2}
          height={SIZES.icons / 1.2}
        />
      ),
    },
    // Divider
    { label: '---', value: '---' },
  ];

  return (
    <FlexContainer>
      <Hero
        label={i18next.t('Confirm your data and accept the agreements')}
        sublabel={i18next.t(
          'Please confirm your data and accept the agreements to continue with the registration process.',
        )}
      />
      <LineDivider variant="secondary" />

      {infoCards.map((info, index) =>
        info.label === '---' ? (
          <LineDivider variant="secondary" key={`divider-${index}`} />
        ) : (
          <FlexContainer
            newStyle={styles.infoCard}
            key={`info-${info.label}-${index}`}
          >
            <InfoCard
              title={info.label}
              description={info.value}
              icon={info.icons}
              showArrow={true}
              // onPress={() => {
              //   onNavigate(index);
              // }}
            />
          </FlexContainer>
        ),
      )}

      <FlexContainer newStyle={styles.checkboxContainer}>
        <Checkbox
          checked={checkboxes.terms}
          label={i18next.t('I accept the terms and conditions')}
          showLabel={true}
          LabelStyle={styles.checkboxLabel}
          onChange={checked => handleCheckboxChange('terms', checked)}
        />
        <Checkbox
          checked={checkboxes.privacy}
          label={i18next.t('I accept the privacy policy')}
          showLabel={true}
          LabelStyle={styles.checkboxLabel}
          onChange={checked => handleCheckboxChange('privacy', checked)}
        />
        <Checkbox
          checked={checkboxes.verification}
          label={i18next.t('I authorize data verification')}
          showLabel={true}
          LabelStyle={styles.checkboxLabel}
          onChange={checked => handleCheckboxChange('verification', checked)}
        />
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    paddingHorizontal: SIZES.gapLarge,
    marginVertical: SIZES.gapSmall,
  },
  checkboxContainer: {
    gap: SIZES.gapMedium,
    marginTop: SIZES.gapMedium,
  },
  checkboxLabel: {
    ...FONTS.semi14,
  },
});

export default AgreementsStep;
