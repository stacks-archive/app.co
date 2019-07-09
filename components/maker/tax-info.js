import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'

const openInDropbox = () => {
  window.open(process.env.US_DROPBOX_URL, '_blank')
}

const openIntlDropbox = () => {
  window.open(process.env.INTL_DROPBOX_URL, '_blank')
}

const Tax = ({ display, app }) => (
  <Flex style={{ display: display ? 'flex' : 'none' }}>
    <Box width={1} mt={0}>
      <Type display="block">Please submit your tax documents via Dropbox.</Type>

      <Type display="block" my={5}>
        For US Citizens, please submit a{' '}
        <Type is="a" href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" target="_blank">
          IRS form W-9
        </Type>
        . Otherwise, use the applicable{' '}
        <Type is="a" href="https://www.irs.gov/pub/irs-pdf/iw8.pdf" target="_blank">
          IRS form W-8
        </Type>
        .
      </Type>

      <Button display="inline-block" my={4} onClick={openInDropbox}>
        Submit as US Citizen
      </Button>

      <Button display="inline-block" my={4} ml={4} onClick={openIntlDropbox}>
        Submit as non-US Citizen
      </Button>

    </Box>
  </Flex>
)

export default Tax
