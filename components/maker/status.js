import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Type } from 'blockstack-ui'
import { MakerCardHeader, MakerCardText } from './styled'

const CrossIcon = () => <img src="/static/images/status-cross.svg" alt="Cross mark" />
const CheckIcon = () => <img src="/static/images/status-check.svg" alt="Check mark" />
const StatusIcon = ({ status = false }) => status ? <CheckIcon /> : <CrossIcon />

const isMiningReady = (app) => {
  const required = [
    'hasCollectedKYC',
    'hasAcceptedSECTerms',
    'BTCAddress',
    'stacksAddress',
    'isKYCVerified'
  ]
  let ready = true
  required.forEach((field) => {
    if (!app[field]) {
      ready = false
    }
  })
  return ready
}

const StyledType = styled(Type)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`

const Status = ({ app, display }) => {
  const isReady = isMiningReady(app)

  const Field = ({ label, field }) => (
    <Flex my={3}>
      <Box>
        <StatusIcon status={!!app[field]} />
      </Box>
      <Box>
        <StyledType mb={1} ml={2}>
          {label}
        </StyledType>
      </Box>
    </Flex>
  )

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }} mx={[4, 6]} px={[20, 0, 20]} pb={32} maxWidth={360}>
      <Box>
        <MakerCardHeader>Your App Mining status</MakerCardHeader>
        {isReady ? (
          <MakerCardText mb={4}>
            Congratulations! We&apos;ve collected everything we need in order for your app to participate in app
            mining.
          </MakerCardText>
        ) : (
          <MakerCardText mb={4} fontSize={14} lineHeight="20px">
            Complete the forms in order for your app to be elligble for App Mining
          </MakerCardText>
        )}

        <Field label="Bitcoin Address" field="BTCAddress" />
        <Field label="STX Address" field="stacksAddress" />
        <Field label="Identity Verification" field="hasCollectedKYC" />
        <Field label="Tax Documents" field="isKYCVerified" />
        <Field label="SEC Participation Agreement" field="hasAcceptedSECTerms" />
      </Box>
    </Flex>
  )
}

export default Status
