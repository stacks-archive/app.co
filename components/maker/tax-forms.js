import React from 'react'
import { Type, Button } from 'blockstack-ui'
import { MakerCardText } from './styled'

const taxFormGenerator = ({ taxFormUrl, taxFormName, text }) =>
  ({ handleClick }) => (
    <>
      <MakerCardText>
        {text}{' '}
        <Type is="a" href={taxFormUrl} target="_blank">
          {taxFormName}.
        </Type>
      </MakerCardText>
      <Button display="inline-block" mt={4} mb={2} onClick={handleClick}>
        Upload via Dropbox
      </Button>
    </>
  )

export const UsTaxForms = taxFormGenerator({
  taxFormUrl: 'https://www.irs.gov/pub/irs-pdf/fw9.pdf',
  taxFormName: 'IRS Form W-9',
  text: 'US persons or entities are required to submit an'
})

export const InternationalTaxForms = taxFormGenerator({
  taxFormUrl: 'https://www.irs.gov/pub/irs-pdf/iw8.pdf',
  taxFormName: 'IRS Form W-8',
  text: 'Persons outside the US are required to submit an'
})

export const InternationalEntityTaxForms = taxFormGenerator({
  taxFormUrl: 'https://www.irs.gov/pub/irs-pdf/fw8bene.pdf',
  taxFormName: 'IRS Form W-8BEN-E',
  text: 'Entities outside the US are require to submit an'
})
