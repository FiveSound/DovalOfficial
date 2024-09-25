import React from 'react'
import Tabs from '../../../components/custom/Tabs'
import { Container, TwoIconsLabel } from '../../../components/custom'
import Phone from './Phone'
import SignUpEmail from './Email'

type Props = {}

const UsePhoneEmail = (props: Props) => {
  const tabs = [
    { key: 'Phone', title: 'Phone', content: <Phone /> },
    { key: 'Email', title: 'Email', content: <SignUpEmail />},
  ];
  return ( 
    <Container useSafeArea={true} label='Sign up' showHeader={true}>
      <Tabs tabs={tabs} />
    </Container>
  )
}

export default UsePhoneEmail