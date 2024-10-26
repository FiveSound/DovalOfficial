import React from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { FlexContainer } from '../../../../../components';
import Hero from '../../../../../components/custom/hero';
import { ListBank } from './data';
import { BankIcon, BubbleChatQuestionIcon } from '../../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../../constants';

const FinancialInfoStep = ({ control }: any) => {
  return (
    <FlexContainer>
      <Hero label='Financial Information' sublabel='Please fill in the following information to complete the process.' />
      <Select
        control={control}
        name="bank_details"
        list={ListBank}
        defaultValue="Nombre del banco*"
        placeholder="Nombre del banco*"
        required
        IconsendComponent={<BankIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>}
      />
         <Select
        control={control}
        name="account_currency"
        list={[
          { label: "Pesos Dominicanos", value: "DOP" },
          { label: "Dólares Americanos", value: "USD" },
        ]}
        defaultValue="Moneda*"
        placeholder="Moneda*"
        required
        IconsendComponent={<BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>}
      />
         <Select
        control={control}
        name="account_type"
        list={[
          { label: "Corriente", value: "Corriente" },
          { label: "Ahorros", value: "Ahorros" },
        ]}
        defaultValue="Corriente"
        placeholder="Tipo de cuenta*"
        required
        IconsendComponent={<BubbleChatQuestionIcon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>}
      />
      <Input control={control} name="account_number" placeholder="Número de cuenta*" required keyboardType='numeric'/>
      <Input control={control} name="account_titular" placeholder="Nombre del titular de la cuenta*" required />
      <Input control={control} name="fiscal_identification" placeholder="Número de identificación del titular*" required keyboardType='numeric'/>
    </FlexContainer>
  );
};

export default FinancialInfoStep;