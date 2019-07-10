import React, { useEffect, useState } from 'react'
import { Flex, Box, Button, Field, Type } from 'blockstack-ui'
import Notification from './notification'

const ParticipationAgreement = ({ app, apiServer, accessToken, display }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isUSA, setIsUSA] = useState(true)
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(!!app.hasAcceptedSECTerms)

  const getDocument = async () => {
    setLoading(true)
    const url = `${apiServer}/api/maker/make-participation-agreement?accessToken=${accessToken}&name=${name}&email=${email}&isUSA=${isUSA}`
    const response = await fetch(url, {
      method: 'POST'
    })
    const data = await response.json()
    setLoading(false)
    setDocument(data.embedURL)
    // eslint-disable-next-line no-undef
    eversign.open({
      url: data.embedURL,
      containerID: 'embedded-participation-agreement',
      height: '700px',
      width: '100%',
      events: {
        signed: () => {
          setFinished(true)
        },
        loaded: () => {},
        declined: () => {},
        error: () => {}
      }
    })
  }

  useEffect(() => {
    if (app.eversignDocumentID) {
      getDocument()
    }
  }, [])

  if (finished) {
    return (
      <Flex style={{ display: display ? 'flex' : 'none' }}>
        <Box width={1} mt={0}>
          <Notification message="Thanks! You've successfully signed our participation agreement" />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1} mt={0}>
        <Box width={1} id="embedded-participation-agreement" />
        {!document && (
          <>
            {loading ? (
              'Fetching participation agreement...'
            ) : (
              <>
                <Type mb={4}>
                  You must sign our participation agreement to become eligible to participate in App Mining.
                </Type>
                <Type mb={4}>Provide your name and email address below to start the signing process.</Type>
                <Field name="name" label="Your Name" onChange={(e) => setName(e.target.value)} value={name} />
                <Field
                  name="stacksAddress"
                  label="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Box pb={4}>
                  <Flex pb={3} alignItems="center">
                    <input
                      type="checkbox"
                      name="isUSA"
                      id="isUSA"
                      checked={isUSA}
                      onChange={(e) =>
                        setIsUSA(e.target.checked)
                      }
                    />
                    <Field.LabelAdvanced
                      labelProps={{
                        pb: 0,
                        htmlFor: "isUSA"
                      }}
                      pl={2}
                      label="I am based in the USA"
                    />
                  </Flex>
                </Box>
                {/* <Field
                  name="isUSA"
                  label="I am based in the United States"
                  onChange={(e) => setIsUSA(e.target.checked)}
                  type="checkbox"
                  value={isUSA}
                /> */}
                <Button mt={4} disabled={loading} onClick={() => getDocument()}>
                  {loading ? 'Starting...' : 'Start Signing Process'}
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
