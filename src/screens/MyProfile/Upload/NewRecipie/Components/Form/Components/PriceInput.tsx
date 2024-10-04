import React from 'react';
import { InputLabel } from '../../../../../../../components/custom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../redux/store';
import { getCurrencyByCountryCode } from '../../../../../../../utils/formatCurrency';


interface Props {
  setValue: (name: string, value: any) => void;
  onSaveDraft: (body: object) => void;
  value: string;
}

const PriceInput: React.FC<Props> = ({ setValue, onSaveDraft, value }) => {
const { user } = useSelector((state: RootState) => state.auth)
const businessCurrency = getCurrencyByCountryCode(user?.country)
return (
  <InputLabel
  placeholder={`Price ${businessCurrency}$0`}
  keyboardType='numeric'
  value={value}
  onChangeText={(txt) => {
    setValue('price', txt);
  }}
/>
);
};

export default PriceInput;