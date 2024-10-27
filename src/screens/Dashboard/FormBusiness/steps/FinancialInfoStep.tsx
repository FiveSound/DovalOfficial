import React from 'react';
import { ListBank } from './data';
import { FlexContainer, Hero } from '../../../../components/custom';
import { Input, Select } from '../components';
import i18next from '../../../../Translate';

const FinancialInfoStep = ({ control }: any) => {
  return (
    <FlexContainer>
      <Hero label={i18next.t('Financial Information')} sublabel={i18next.t('Please fill in the following information to complete the process.')} />
      <Select
        control={control}
        name="bank_details"
        list={ListBank}
        defaultValue={i18next.t('Bank name*')}
        placeholder={i18next.t('Bank name*')}
        required
        // IconsendComponent={<BankIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>}
      />
         <Select
        control={control}
        name="account_currency"
        list={[
          { label: i18next.t('Dominican Pesos'), value: "DOP" },
          { label: i18next.t('US Dollars'), value: "USD" },
        ]}
        defaultValue={i18next.t('Currency*')}
        placeholder={i18next.t('Currency*')}
        required
        // IconsendComponent={<BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>}
      />
         <Select
        control={control}
        name="account_type"
        list={[
          { label: i18next.t('Current'), value: "Corriente" },
          { label: i18next.t('Savings'), value: "Ahorros" },
        ]}
        defaultValue={i18next.t('Account type*')}
        placeholder={i18next.t('Account type*')}
        required
        // IconsendComponent={<BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>}
      />
      <Input control={control} name="account_number" placeholder={i18next.t('Account number*')} required keyboardType='numeric'/>
      <Input control={control} name="account_holder_name" placeholder={i18next.t('Account holder name*')} required />
      <Input control={control} name="fiscal_identification" placeholder={i18next.t('Fiscal identification*')} required keyboardType='numeric'/>
    </FlexContainer>
  );
};

export default FinancialInfoStep;