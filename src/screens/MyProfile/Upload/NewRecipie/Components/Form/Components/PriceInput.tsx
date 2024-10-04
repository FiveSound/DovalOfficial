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
console.log('businessCurrency', businessCurrency);

const handleBlur = () => {
  const normalizedValue = value.replace(/\./g, '').replace(',', '.');
  const number = parseFloat(normalizedValue);
  if (!isNaN(number)) {
    let format = new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: businessCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
    setValue('price', format);
    onSaveDraft({ price: format });
  }
};


return (
  <InputLabel
  placeholder={`Price ${businessCurrency}$0`}
  keyboardType='numeric'
  value={value}
  onChangeText={(txt) => {
    setValue('price', txt);
  }}
  onBlur={handleBlur}
/>
);
};

export default PriceInput;