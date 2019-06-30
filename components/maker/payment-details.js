import React, { useState } from 'react'
import { Flex, Box, Field, Button, Type } from 'blockstack-ui'
import Notification from './notification'

const PaymentDetails = ({ app, apiServer, accessToken, display }) => {
  const [btcAddress, setBTCAddress] = useState(app.BTCAddress)
  const [stxAddress, setSTXAddress] = useState(app.stacksAddress)
  const [showNotification, setShowNotification] = useState(false)
  const [saving, setSaving] = useState(false)

  const notify = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 10000)
  }

  const save = async () => {
    console.log(btcAddress, stxAddress, apiServer, accessToken)
    setSaving(true)
    const response = await fetch(`${apiServer}/api/maker/app?accessToken=${accessToken}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        BTCAddress: btcAddress,
        stacksAddress: stxAddress
      })
    })
    const { success } = await response.json()
    notify()
    console.log('success?', success)
    setSaving(false)
  }

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1} mt={0}>
        {showNotification && (
          <Notification message="Thanks! Your payment details have been updated." />
        )}
        <Type mb={5}>
          Presently, App Mining payments are made to a Bitcoin (BTC) address. In the future, payments will be made to a Stacks (STX) address. Your app cannot participate in App Mining without Blockstack having both address types on file.
        </Type>
        <Type mb={5}>
          Please provide a BTC and a STX address. For information on obtaining a STX address, see the
          {' '}
          <a href="https://docs.blockstack.org/org/wallet-use.html">Stacks wallet documentation</a>
          {'.'}
        </Type>
        <Field
          name="btcAddress"
          label="Bitcoin Address"
          placeholder="Enter a Bitcoin address"
          onChange={(e) => setBTCAddress(e.target.value)}
          value={btcAddress}
        />
        <Field
          name="stacksAddress"
          label="Stacks Address"
          placeholder="Enter a Stacks address"
          onChange={(e) => setSTXAddress(e.target.value)}
          value={stxAddress}
        />
        <Button mt={4} disabled={saving} onClick={() => save({ btcAddress, stxAddress, apiServer, accessToken })}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Flex>
  )
}

export default PaymentDetails
