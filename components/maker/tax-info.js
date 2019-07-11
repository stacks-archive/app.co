import React, { useState } from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Select } from '@components/mining/select'

const openInDropbox = () => {
  window.open(process.env.US_DROPBOX_URL, '_blank')
}

const openIntlDropbox = () => {
  window.open(process.env.INTL_DROPBOX_URL, '_blank')
}

const Tax = ({ display, app }) => {
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

  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1} mt={0}>
        <Type display="block">Please upload your tax documents via Dropbox.</Type>

        <Type display="block" my={5}>To begin, first give us some information about yourself, so we can guide you through which forms to use:</Type>

        {/* <Type display="block" my={5}>
          For US Citizens, please submit a{' '}
          <Type is="a" href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" target="_blank">
            IRS Form W-9
          </Type>
          . Otherwise, use the applicable{' '}
          <Type is="a" href="https://www.irs.gov/pub/irs-pdf/iw8.pdf" target="_blank">
            IRS Form W-8
          </Type>
          .
        </Type> */}

        <Select 
          onChange={(e) => setType(e ? e.value : null)}
          options={options}
          value={options.find((o) => o.value === type)}
        />

        {type === 'us' && (
          <>
            <Type display="block" my={5}>
              Please submit an{' '}
              <Type is="a" href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" target="_blank">
                IRS Form W-9
              </Type>
              .
            </Type>
            <Button display="inline-block" my={4} onClick={openInDropbox}>
              Upload via Dropbox
            </Button>
          </>
        )}

        {type === 'intl' && (
          <>
            <Type display="block" my={5}>
              Please submit an{' '}
              <Type is="a" href="https://www.irs.gov/pub/irs-pdf/iw8.pdf" target="_blank">
                IRS Form W-8
              </Type>
              .
            </Type>
            <Button display="inline-block" my={4} onClick={openIntlDropbox}>
              Upload via Dropbox
            </Button>
          </>
        )}

        {type === 'intl_entity' && (
          <>
            <Type display="block" my={5}>
              Please submit an{' '}
              <Type is="a" href="https://www.irs.gov/pub/irs-pdf/fw8bene.pdf" target="_blank">
                IRS Form W-8BEN-E
              </Type>
              .
            </Type>
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
