import React from 'react';
import { Input } from '../components';
import { FlexContainer, Hero } from '../../../../components/custom';


const Representativeinformation = ({ control }: any) => {
  return (
    <FlexContainer>
      <Hero label='Representative information' sublabel='Please fill in the following information to complete the process.' />
         <Input control={control} name="full_name" placeholder="Full Name*" required keyboardType='default' />
         <Input control={control} name="identification_number" placeholder="Identification Number*" required keyboardType='numeric' />
         <Input control={control} name="role" placeholder="Role*" required keyboardType='default' />
         <Input control={control} name="email" placeholder="Email*" required keyboardType='email-address' />
         <Input control={control} name="phone_number" placeholder="Phone Number*" required keyboardType='phone-pad' />
         {/* <UploadSource control={control} name="imgIdentifications" placeholder="Identification Image*" required  /> */}
    </FlexContainer>
  );
};

export default Representativeinformation;