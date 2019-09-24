import React, { useState } from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { MakerCardHeader, MakerCardText, MakerButton } from './styled'

const KYC = ({ app, user, apiServer, display }) => {
  const [embedURL, setEmbedURL] = useState(app.jumioEmbedURL)
  const [loading, setLoading] = useState(false)

  const initiateKYC = async () => {
    setLoading(true)
    const url = `${apiServer}/api/maker/apps/${app.id}/initiate-kyc`
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        authorization: `Bearer ${user.jwt}`
      })
    })
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
            <MakerCardText mt={0}>
              Verifying your identity helps keep App Mining secure and fight fraud.
              Your ID will never be shared.
            </MakerCardText>
            <MakerButton onClick={initiateKYC} mt={4}>
              {loading ? 'Loading…' : 'Start verification'}
            </MakerButton>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default KYC
