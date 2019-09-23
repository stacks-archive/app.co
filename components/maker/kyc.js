import React, { useState } from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { MakerCardHeader, MakerCardText, MakerButton } from './styled'

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
        <MakerCardHeader>Identity Verification</MakerCardHeader>
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
            <MakerCardText>
              We need to confirm your identity before you can participate in App Mining.
            </MakerCardText>
            <MakerCardText>
              We are ready to pay you Bitcoin and Stacks tokens for building a great Blockstack app, but we also need to comply with all applicable laws.
            </MakerCardText>
            <MakerCardText>
              You have 60 days from today to complete this process. You are not eligible for app mining until you&apos;ve completed identity verification.
            </MakerCardText>
            <MakerCardText>
              If you are registering as an entity, please note that you must contact us at{' '}
              <a href="mailto:mining@app.co">mining@app.co</a>
              {' '}for further verification of your entity.
            </MakerCardText>
            <MakerButton onClick={initiateKYC} mt={4}>
              {loading ? 'Loading..' : 'Begin Verification'}
            </MakerButton>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default KYC
