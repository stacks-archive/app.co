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
              Click the button below to initiate our KYC (know your customer) process.
              This step is required, and allows us to verify your identity before this app
              can participate in App Mining.
            </Type>
            <Type mb={4} display="block">
              Once you initiate this process, you have 60 days to complete it.
            </Type>
            <Button onClick={initiateKYC} mt={4}>
              {loading ? 'Loading..' : 'Begin'}
            </Button>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default KYC
