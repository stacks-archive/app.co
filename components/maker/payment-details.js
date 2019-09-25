import React, { useState } from 'react'
import { Flex, Box, Type, Field } from 'blockstack-ui'
import { address, networks } from 'bitcoinjs-lib'
import * as c32Check from 'c32check'
import Notification from './notification'

import {
  MakerCardHeader,
  MakerCardText,
  MakerButton
} from './styled'

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

const PaymentDetails = ({ app, apiServer, accessToken, user }) => {
  const [btcAddress, setBTCAddress] = useState(app.BTCAddress)
  const [stxAddress, setSTXAddress] = useState(app.stacksAddress)
  const [showNotification, setShowNotification] = useState(false)
  const [btcValid, setBtcValid] = useState(true)
  const [stxValid, setStxValid] = useState(true)
  const [saving, setSaving] = useState(false)

  const haveEitherAddressesChanged = () =>
    btcAddress !== app.BTCAddress && stxAddress !== app.stacksAddress

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
    const response = await fetch(`${apiServer}/api/maker/apps/${app.id}?appId=${app.id}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: `Bearer ${user.jwt}`
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
    <Flex>
      <Box width={1} mt={0}>
        <MakerCardHeader>Payment details</MakerCardHeader>
        {showNotification && <Notification message="Thanks! Your payment details have been updated." />}
        <MakerCardText mb={5} mt={0}>
          This is where you will receive your App Mining payments.
          Currently, payments are made in Bitcoin (BTC). Payments will be made
          in Stacks (STX) in the future.
        </MakerCardText>
        <Field
          name="btcAddress"
          label="Bitcoin Address"
          placeholder="Enter a Bitcoin address"
          onChange={(e) => setBTCAddress(e.target.value)}
          value={btcAddress || ''}
          error={!btcValid ? 'Please enter a valid BTC address' : null}
        />
        <Field
          name="stacksAddress"
          label="Stacks Address"
          placeholder="Enter a Stacks address"
          onChange={(e) => setSTXAddress(e.target.value)}
          value={stxAddress || ''}
          error={!stxValid ? 'Please enter a valid STX address' : null}
        />
        <Type.p fontSize={12} mt={0} display="block">
          {"Don't"} have a Stacks address? <a href="https://wallet.blockstack.org" target="_blank" rel="noopener noreferrer">Download the Stacks wallet to get one</a>
        </Type.p>
        <MakerButton mt={4} disabled={saving} onClick={() => save({ btcAddress, stxAddress, apiServer, accessToken })}>
          {saving ? 'Saving...' : 'Save'}
        </MakerButton>
      </Box>
    </Flex>
  )
}

export default PaymentDetails
