import React, { useState } from 'react'
import { Flex, Box } from 'blockstack-ui'
import MakerModal from '../modal'
import { MakerCardHeader, MakerCardText, MakerButton } from '../styled'

const KYC = ({ app, user, apiServer }) => {
  const [embedURL, setEmbedURL] = useState(app.jumioEmbedURL)
  const [loading, setLoading] = useState(false)
  const [modalState, setModalState] = useState(false)

  const initiateKYC = async () => {
    setLoading(true)
    setModalState(true)
    const url = `${apiServer}/api/maker/apps/${app.id}/initiate-kyc?appId=${app.id}`
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

  const buttonText = () => {
    if (loading) {
      return 'Loading…'
    }
    return app.hasCollectedKYC ? 'Verified' : 'Start verification'
  }

  return (
    <>
      <MakerModal isOpen={modalState} handleClose={() => setModalState(false)}>
        <iframe src={embedURL} title="Document" width="100%" height="700px" allow="camera" />
      </MakerModal>

      <Flex>
        <Box width={1} mt={0}>
          <MakerCardHeader>Identity Verification</MakerCardHeader>
          <MakerCardText mt={0}>
            Verifying your identity helps keep App Mining secure and fight fraud.
            Your ID will never be shared.
          </MakerCardText>
          <MakerButton onClick={initiateKYC} mt={4} disabled={app.hasCollectedKYC}>
            {buttonText()}
          </MakerButton>
        </Box>
      </Flex>
    </>
  )
}

export default KYC
