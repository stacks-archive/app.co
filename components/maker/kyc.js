import React, { useState } from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'

const KYC = ({ app, accessToken, apiServer, display }) => {
  const [embedURL, setEmbedURL] = useState(app.jumioEmbedURL)
  const [loading, setLoading] = useState(false)

  const initiateKYC = async () => {
    setLoading(true)
    const url = `${apiServer}/api/maker/initiate-kyc?accessToken=${accessToken}`
    const response = await fetch(url, { method: 'POST' })
    const data = await response.json()
    setEmbedURL(data.embedURL)
    setLoading(false)
  }

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1} mt={0}>
        {embedURL ? (
          <>
            {app.hasCollectedKYC ? (
              <Type>Your identity has been verified.</Type>
            ) : (
              <iframe src={embedURL} title="Document" width="100%" height="700px" allow="camera" />
            )}
          </>
        ) : (
          <>
            <Type mb={4}>
              We need to confirm your identity before you can participate in App Mining.
            </Type>
            <Type mb={4} display="block">
              We are ready to pay you Bitcoin and Stacks tokens for building a great Blockstack app, but we also need to comply with all applicable laws.
            </Type>
            <Type mb={4} display="block">
              You have 60 days from today to complete this process. You are not eligible for app mining until you&amp;ve completed identity verification.
            </Type>
            <Type mb={4} display="block">
              If you are registering as an entity, please note that you must contact us at{' '}
              <a href="mailto:mining@app.co">mining@app.co</a>
              {' '}for further verification of your entity.
            </Type>
            <Button onClick={initiateKYC} mt={4}>
              {loading ? 'Loading..' : 'Begin Verification'}
            </Button>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default KYC
