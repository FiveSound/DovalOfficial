import React from 'react'
import Search from './Search';
import InputStep from './InputStep';
import InputPhone from './InputPhone';

type Props = {
    variant: 'search' | 'step' | 'phone' 'label';
    onCodeFilled?: () => void;
}

const Inputs = ({ variant, ...props, onCodeFilled }: Props) => {
    switch (variant) {
        case 'search':
          return <Search {...props} />;
        case 'step':
          return <InputStep onCodeFilled={onCodeFilled} {...props} />;
        case 'phone':
          return <InputPhone  {...props} />;
        default:
          return null;
      }
}

export default Inputs