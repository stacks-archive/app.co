import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { CheckboxChecked } from 'styled-icons/icomoon/CheckboxChecked'
import { Cross } from 'styled-icons/icomoon/Cross'

const isMiningReady = (app) => {//! !app.hasCollectedKYC && !!app.hasAcceptedSECTerms && !!app.BTCAddress &&
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

const Status = ({ app, display }) => {
  const isReady = isMiningReady(app)
  const size = 14

  const CheckOrNot = ({ field }) => {
    const collected = !!app[field]
    if (collected) {
      return (
        <CheckboxChecked size={size} />
      )
    }
    return (
      <Cross size={size} />
    )
  }

  const Field = ({ label, field }) => (
    <Type my={3} display="block">
      <Type mt={1} fontWeight={600} mr={2}>
        {label}:
      </Type>
      <CheckOrNot field={field} />
    </Type>
  )

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1}>
        {isReady ? (
          <Type mb={4}>
            Congratulations! We&apos;ve collected everything we need in order for your app to participate in app
            mining.
          </Type>
        ) : (
          <Type mb={4}e>
            It looks like we still need to collect some more information before you can participate in app mining.
          </Type>
        )}

        <Field label="Tax Documents" field="isKYCVerified" />
        <Field label="Identity Verification" field="hasCollectedKYC" />
        <Field label="Bitcoin Address" field="BTCAddress" />
        <Field label="STX Address" field="stacksAddress" />
        <Field label="SEC Participation Agreement" field="hasAcceptedSECTerms" />
      </Box>
    </Flex>
  )
}

export default Status
