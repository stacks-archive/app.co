import React, { useState } from 'react'
import { Flex, Box, Field, Button, Type } from 'blockstack-ui'
import { address, networks } from 'bitcoinjs-lib'
import * as c32Check from 'c32check'
import Notification from './notification'

const validateBTC = (addr) => {
  try {
    address.toOutputScript(addr, networks.bitcoin)
    return true
  } catch (error) {
    return false
  }
}

const validateSTX = (addr) => {
  try {
    c32Check.c32addressDecode(addr)
    return true
  } catch (error) {
    return false
  }
}

const PaymentDetails = ({ app, apiServer, accessToken, display }) => {
  const [btcAddress, setBTCAddress] = useState(app.BTCAddress)
  const [stxAddress, setSTXAddress] = useState(app.stacksAddress)
  const [showNotification, setShowNotification] = useState(false)
  const [btcValid, setBtcValid] = useState(true)
  const [stxValid, setStxValid] = useState(true)
  const [saving, setSaving] = useState(false)

  const notify = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 10000)
  }

  const save = async () => {
    let isValid = true
    if (!validateBTC(btcAddress)) {
      isValid = false
      setBtcValid(false)
    }
    if (!validateSTX(stxAddress)) {
      isValid = false
      setStxValid(false)
    }
    if (!isValid) {
      return
    } else {
      setBtcValid(true)
      setStxValid(true)
    }
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
    await response.json()
    notify()
    setSaving(false)
  }

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1} mt={0}>
        {showNotification && <Notification message="Thanks! Your payment details have been updated." />}
        <Type mb={5}>
          Presently, App Mining payments are made in Bitcoin (BTC). We anticipate paying in Stacks (STX) soon.
          In order for your Stacks payment to start accruing for future delivery, please provide both BTC and STX addresses. 
          Your app cannot participate in App Mining without Blockstack having both address types on file.
        </Type>
        <Type mb={5}>
          Please provide a BTC and a STX address. For information on obtaining a STX address, download the{' '}
          <a href="https://wallet.blockstack.org/" target="_blank" rel="noopener noreferrer">Stacks Wallet</a>
          {'.'}
        </Type>
        <Field
          name="btcAddress"
          label="Bitcoin Address"
          placeholder="Enter a Bitcoin address"
          onChange={(e) => setBTCAddress(e.target.value)}
          value={btcAddress}
          error={!btcValid ? 'Please enter a valid BTC address' : null}
        />
        <Field
          name="stacksAddress"
          label="Stacks Address"
          placeholder="Enter a Stacks address"
          onChange={(e) => setSTXAddress(e.target.value)}
          value={stxAddress}
          error={!stxValid ? 'Please enter a valid STX address' : null}
        />
        <Button mt={4} disabled={saving} onClick={() => save({ btcAddress, stxAddress, apiServer, accessToken })}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Flex>
  )
}

export default PaymentDetails
