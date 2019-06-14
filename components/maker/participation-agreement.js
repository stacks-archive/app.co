import React, { useEffect, useState } from 'react'
import { Flex, Box, Button, Field, Type } from 'blockstack-ui'

const ParticipationAgreement = ({ app, apiServer, accessToken, display }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(false)

  const getDocument = async () => {
    setLoading(true)
    const url = `${apiServer}/api/maker/make-participation-agreement?accessToken=${accessToken}&name=${name}&email=${email}`
    const response = await fetch(url, {
      method: 'POST'
    })
    const data = await response.json()
    setLoading(false)
    setDocument(data.embedURL)
  }

  useEffect(() => {
    if (app.eversignDocumentID) {
      getDocument()
    }
  }, [])

  if (app.hasAcceptedSECTerms) {
    return (
      <Flex style={{ display: display ? 'flex' : 'none' }}>
        <Box width={1} mt={0}>
          <Type>Thanks! You've successfully submitted your agreement.</Type>
        </Box>
      </Flex>
    )
  }

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1} mt={0}>
        {document ? (
          <iframe src={document} title="Document" width="100%" height="700px" />
        ) : (
          <>
            {loading ? 'Fetching participation agreement...' : (
              <>
                <Type mb={4}>
                  Before signing our participation agreement, please submit your name and email:
                </Type>
                <Field
                  name="name"
                  label="Your Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Field
                  name="stacksAddress"
                  label="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Button mt={4} disabled={loading} onClick={() => getDocument()}>
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Flex>
  )
}

export default ParticipationAgreement
