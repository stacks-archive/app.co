import React from 'react'

import { Img, Description } from '@components/mining/reviewer/styled'
import { Type } from '@components/typography'
import { Hr } from '@components/mining-admin/month'

const reviewerData = {
  'Product Hunt': {
    website: 'https://producthunt.com',
    description: 'Product hunt is the place to find the best new products in tech.',
    logo: 'product-hunt-logo-orange-240.png'
  },
  'UserTesting': {
    website: 'https://usertesting.com',
    description: 'UserTesting is an on-demand customer experience research platform.',
    logo: 'usertesting.png'
  },
  'Democracy Earth': {
    description: 'Democracy earth is a platform for borderless peer to peer democracy.',
    website: 'https://www.democracy.earth/',
    logo: 'democracyearth.png'
  }
}

const Reviewer = ({ reviewer, index }) => {
  const name = reviewer.reviewerName
  const { summary } = reviewer
  const data = reviewerData[name]
  if (!data) return ''
  return (
    <>
      <Hr />
      <Type.h3 ml={0} mt={2} p={0}>Reviewer #{index+1}</Type.h3>
      <Img src={`https://appco.imgix.net/reviewers/${data.logo}?fit=clip&h=96&w=96`} alt={name}/>
      <Description>
        {data.description}
        {' '}<a href={data.website} target="_blank">Visit Website</a>
      </Description>
      {(summary && summary.length > 0) && (
        <Type.p>
          {summary}
        </Type.p>
      )}
    </>
  )
}

export default Reviewer
