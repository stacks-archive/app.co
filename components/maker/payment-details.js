import React, { useState } from 'react'
import { Flex, Box, Field, Button } from 'blockstack-ui'

const PaymentDetails = ({ app, apiServer, accessToken, display }) => {
  const [btcAddress, setBTCAddress] = useState(app.BTCAddress)
  const [stxAddress, setSTXAddress] = useState(app.stacksAddress)
  const [saving, setSaving] = useState(false)

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
    console.log('success?', success)
    setSaving(false)
  }

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1} mt={0}>
        <Field
          name="btcAddress"
          label="Bitcoin Address"
          onChange={(e) => setBTCAddress(e.target.value)}
          value={btcAddress}
        />
        <Field
          name="stacksAddress"
          label="Stacks Address"
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
