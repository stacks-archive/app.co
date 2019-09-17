import React, { useState } from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Select } from '@components/mining/select'
import { MakerCardHeader, MakerCardText, MakerRadioListLabel } from './styled'

const openInDropbox = () => 
  window.open('https://www.dropbox.com/request/jBv2pYJ2lhJuvfXbJvw8', '_blank')


const openIntlDropbox = () => 
  window.open('https://www.dropbox.com/request/84CaeiizMy1BU0AaWIrk', '_blank')


const Tax = ({ app }) => {
  const [type, setType] = useState(null)

  const options = [
    {
      value: 'us',
      label: 'I am a US person or entity'
    },
    {
      value: 'intl',
      label: 'I am a person based outside of the US'
    },
    {
      value: 'intl_entity',
      label: 'I am an entity based outside of the US'
    }
  ]

  const taxStatusRadioList = options.map(({ value, label }, i) => 
    <MakerRadioListLabel key={i}>
      <input
        type="radio" 
        name="tax-status" 
        value={value} 
        onChange={(e) => setType(e.target.value)} 
      />
      {label}
    </MakerRadioListLabel>
  )

  return (
    <Flex>
      <Box width={1} mt={0}>
        <MakerCardHeader>Tax Documents</MakerCardHeader>
        <MakerCardText>Please upload your tax documents via Dropbox. </MakerCardText>

        <MakerCardText>
          Documents will only be marked accepted if they are uploaded as the name of your app.
        </MakerCardText>

        <MakerCardText my={5}>
          To begin, first give us some information about yourself, so we can guide you through which forms to use:
        </MakerCardText>

        <h4>I am:</h4>
        {taxStatusRadioList}

        {type === 'us' && (
          <>
            <MakerCardText display="block" my={5}>
              Please submit an{' '}
              <Type is="a" href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" target="_blank">
                IRS Form W-9
              </Type>
              .
            </MakerCardText>
            <Button display="inline-block" my={4} onClick={openInDropbox}>
              Upload via Dropbox
            </Button>
          </>
        )}

        {type === 'intl' && (
          <>
            <MakerCardText display="block" my={5}>
              Please submit an{' '}
              <Type is="a" href="https://www.irs.gov/pub/irs-pdf/iw8.pdf" target="_blank">
                IRS Form W-8
              </Type>
              .
            </MakerCardText>
            <Button display="inline-block" my={4} onClick={openIntlDropbox}>
              Upload via Dropbox
            </Button>
          </>
        )}

        {type === 'intl_entity' && (
          <>
            <MakerCardText display="block" my={5}>
              Please submit an{' '}
              <Type is="a" href="https://www.irs.gov/pub/irs-pdf/fw8bene.pdf" target="_blank">
                IRS Form W-8BEN-E
              </Type>
              .
            </MakerCardText>
            <Button display="inline-block" my={4} onClick={openIntlDropbox}>
              Upload via Dropbox
            </Button>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default Tax
