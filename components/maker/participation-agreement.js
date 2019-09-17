import React, { useEffect, useState } from 'react'
import { Flex, Box, Button, Field, Type } from 'blockstack-ui'
import download from 'downloadjs'
import Notification from './notification'
import { MakerCardHeader, MakerCardText } from './styled'

const Container = ({ children }) => <Flex><Box width={1} mt={0}>{children}</Box></Flex>

const ParticipationAgreement = ({ app, apiServer, accessToken }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isUSA, setIsUSA] = useState(true)
  const [doc, setDoc] = useState(null)
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
    setDoc(data.embedURL)
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

  const getDownload = async () => {
    const filename = isUSA ? 'us' : 'intl'
    await download(`/static/docs/${filename}.zip`)
    getDocument()
  }

  useEffect(() => {
    if (app.eversignDocumentID) {
      getDocument()
    }
  }, [])

  if (finished) {
    return (
      <Container>
        <Notification message="Thanks! You've successfully signed our participation agreement" />
      </Container>
    )
  }

  return (
    <Container>
      <MakerCardHeader>Legal Documents</MakerCardHeader>
      <Box width={1} id="embedded-participation-agreement" />
      {!doc && (
        <>
          {loading ? (
            'Fetching participation agreement...'
          ) : (
            <>
              <MakerCardText mb={4}>
                You must sign our participation agreement to become eligible to participate in App Mining.
              </MakerCardText>
              <MakerCardText mb={4}>Provide your name and email address below to start the signing process.</MakerCardText>
              <MakerCardText mb={4}>Before beginning the signing process, you must download and read a package of documents that we provide.</MakerCardText>
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
                    label="I am a person or company based in the US"
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
              <Button mt={4} disabled={loading} onClick={() => getDownload()}>
                {loading ? 'Starting...' : 'Start Signing Process'}
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default ParticipationAgreement
