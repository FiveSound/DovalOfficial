import React from 'react'
import Tabs from '../../../components/custom/Tabs'
import { Container, TwoIconsLabel } from '../../../components/custom'
import Phone from './Phone'
import SignUpEmail from './Email'
import i18next from '../../../Translate'

type Props = {}

const UsePhoneEmail = (props: Props) => {
  const tabs = [
    { key: 'Phone', title: i18next.t('Phone'), content: <Phone /> },
    { key: 'Email', title: i18next.t('Email'), content: <SignUpEmail />},
  ];
  return ( 
    <Container useSafeArea={true} label={i18next.t('Sign up')} showHeader={true}>
      <Tabs tabs={tabs} />
    </Container>
  )
}

export default UsePhoneEmail