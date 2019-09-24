import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Type } from 'blockstack-ui'
import { CheckMarkIcon, CrossMarkIcon } from '@components/svg/maker'
import { MakerCardHeader, MakerCardText } from './styled'

const StatusIcon = ({ status = false }) => status
  ? <CheckMarkIcon />
  : <CrossMarkIcon />

const isMiningReady = (app) => {
  const requiredTrueProperties = [
    'hasCollectedKYC',
    'hasAcceptedSECTerms',
    'BTCAddress',
    'stacksAddress',
    'isKYCVerified'
  ]
  let ready = true
  requiredTrueProperties.forEach(field => {
    if (!app[field]) {
      ready = false
    }
  })
  return ready
}

const hasPaymentDetails = app => app.BTCAddress && app.stacksAddress

const StyledTypeOverride = styled(Type)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`

const ItemToCompleteField = ({ label, status }) => (
  <Flex my={3}>
    <Box>
      <StatusIcon status={status} />
    </Box>
    <Box>
      <StyledTypeOverride mb={1} ml={2}>
        {label}
      </StyledTypeOverride>
    </Box>
  </Flex>
)

const Status = ({ app, display }) => {
  const isReady = isMiningReady(app)

  const AppMiningComplete = () => (
    <MakerCardText mb={4}>
      Congratulations! We&apos;ve collected everything we need in order for your app to participate in app
      mining.
    </MakerCardText>
  )

  const AppMiningIncomplete = () => (
    <MakerCardText mb={4} mt={0} fontSize={14} lineHeight="20px">
      Complete the forms in order for your app to be elligble for App Mining
    </MakerCardText>
  )

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }} mx={[4, 6]} px={[20, 0, 20]} pb={32} maxWidth={360}>
      <Box>
        <MakerCardHeader>Your App Mining status</MakerCardHeader>

        {isReady ? <AppMiningComplete /> : <AppMiningIncomplete/>}

        <ItemToCompleteField label="Payment details" status={hasPaymentDetails(app)} />
        <ItemToCompleteField label="Identity Verification" status={app.hasCollectedKYC} />
        <ItemToCompleteField label="Tax Documents" status={app.isKYCVerified} />
        <ItemToCompleteField label="SEC Participation Agreement" status={app.hasAcceptedSECTerms} />
      </Box>
    </Flex>
  )
}

export default Status
