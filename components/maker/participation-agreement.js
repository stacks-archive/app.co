import React, { useEffect, useState } from 'react'
import { Flex, Box, Button, Field } from 'blockstack-ui'
import download from 'downloadjs'
import Notification from './notification'
import { UsTaxForms, InternationalTaxForms, InternationalEntityTaxForms } from './tax-forms'
import {
  MakerCardHeader,
  MakerCardSubheader,
  MakerCardText,
  MakerRadioListLabel,
  MakerCardDivider
} from './styled'
import EverSignModal from './eversign'

const Container = ({ children }) => <Flex><Box width={1} mt={0}>{children}</Box></Flex>

const ParticipationAgreement = ({ app, apiServer, accessToken }) => {
  console.log('ParticipationAgreement', apiServer, accessToken)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [doc, setDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(!!app.hasAcceptedSECTerms)
  const [modalState, setModalState] = useState(false)
  const [taxType, setTaxType] = useState(null)


  const isUsa = () => taxType === 'us'

  const getDocument = async () => {
    console.log('xxxxxxxxxx', name, email)
    setLoading(true)
    const url = `${apiServer}/api/maker/make-participation-agreement?accessToken=${accessToken}&name=${name}&email=${email}&isUSA=${isUsa()}`
    console.log(url)
    const response = await fetch(url, { method: 'POST' })
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
        signed: () => setFinished(true),
        loaded: () => {},
        declined: () => {},
        error: () => {}
      }
    })
  }

  const getDownload = () => {
    setModalState(true)
    // download(`/static/docs/${taxType}.zip`)
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

  const options = [
    { value: 'us', label: 'I am a US person or entity' },
    { value: 'intl', label: 'I am a person based outside of the US' },
    { value: 'intl_entity', label: 'I am an entity based outside of the US' }
  ]

  const taxStatusRadioList = options.map(({ value, label }) =>
    <MakerRadioListLabel key={value}>
      <input
        type="radio"
        name="tax-status"
        value={value}
        onChange={(e) => setTaxType(e.target.value)}
      />
      {label}
    </MakerRadioListLabel>
  )

  const openFile = url => window.open(url, '_blank')
  const downloadUsaForms = () => openFile('https://www.dropbox.com/request/jBv2pYJ2lhJuvfXbJvw8')
  const downloadInternationalForms = () => openFile('https://www.dropbox.com/request/84CaeiizMy1BU0AaWIrk')

  const taxDocumentComponents = {
    us: <UsTaxForms handleClick={downloadUsaForms} />,
    intl: <InternationalTaxForms handleClick={downloadUsaForms} />,
    intl_entity: <InternationalEntityTaxForms handleClick={downloadInternationalForms} />
  }

  return (
    <>
      <EverSignModal isOpen={modalState} handleClose={() => setModalState(false)}>
        <Box width={1} id="embedded-participation-agreement" />
      </EverSignModal>

      <Container>
        <MakerCardHeader>Legal Documents</MakerCardHeader>
        {!doc && (
          <>
            {loading ? (
              'Fetching participation agreement...'
            ) : (
              <>
                <MakerCardText mb={4}>
                  Please select the appropriate legal status so we can provide you with the correct Tax Form and Participation Agreement.
                </MakerCardText>
                <Field
                  name="name"
                  label="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Field
                  name="emailAddress"
                  type="email"
                  label="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Box pb={4}>
                  <Field.LabelAdvanced label="I am" />
                  {taxStatusRadioList}
                </Box>
              </>
            )}
          </>
        )}
        { taxType !== null &&
          <>
            <MakerCardDivider />
            <Box>
              <MakerCardSubheader>
                Fill out the Tax form
              </MakerCardSubheader>
              {taxDocumentComponents[taxType]}
            </Box>
            <MakerCardDivider />
            <Box>
              <MakerCardSubheader>
                Sign the Participation Agreement
              </MakerCardSubheader>
              <Button mt={4} disabled={loading} onClick={() => getDownload()}>
                {loading ? 'Starting...' : 'Start Signing Process'}
              </Button>
              <MakerCardText>
                Opening the Participation Agreement will start a download a package of documents that you are required to read.
              </MakerCardText>
            </Box>
          </>
        }
      </Container>
    </>
  )
}

export default ParticipationAgreement
