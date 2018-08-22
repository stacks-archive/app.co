import * as React from 'react'
import { Heading, Section } from '@pages/mining/shared'
import { Box } from '@components/mining'
import { MiningList } from '@components/mining/list'
import { Type } from '@components/typography'

const Question = ({ title, answer, ...rest }) => (
  <Box p={3} {...rest}>
    <Type.h3 fontWeight="300" color="white" pb={3}>
      {title}
    </Type.h3>
    <Type.span opacity={0.5} lineHeight={1.45} color="white">
      {answer}
    </Type.span>
  </Box>
)

const questions = [
  {
    title: 'What is Blockstack?',
    answer: 'Blockstack is a new internet for decentralized apps that you access through the Blockstack Browser. With Blockstack, there is a new world of apps that let you own your data and maintain your privacy, security and freedom.'
  },
  {
    title: 'What is App.co?',
    answer:
      'The first ecosystem-wide, universal Dapp Store. App.co currently serves as an aggregator of usable dapps for gaming, social networking, productivity, and financial services. It is a discovery tool for decentralized apps built on Blockstack, Ethereum, EOS, IPFS, Steem, and more.'
  },
  {
    title: 'How do App Rankings Work?',
    answer: 'Each App Reviewer will be able to define the criteria used to rank applications. We will update everyone with more information as soon as possible.'
  },
  {
    title: 'How do Payouts Work?',
    answer: 'Bitcoin is paid out each month to a list of top apps on Blockstack. Rankings are determined by a carefully selected group of app reviewers. We will update everyone with more information as soon as possible.'
  },
  {
    title: 'When will App Mining be live?',
    answer: 'Q4 2018. We will update everyone with more exact timing as soon as possible.'
  }
]

const FAQ = ({ ...props }) => (
  <>
    <Section minHeight="40vh" justifyContent="flex-end" mt={6} flexDirection="column" {...props}>
      <Heading mb={5} maxWidth={['100%', '800px']}>
        Frequently asked<br />questions
      </Heading>
      <MiningList
        width={1}
        minWidth={[1, '600px']}
        pt={4}
        maxWidth="700px"
        noBorders
        items={[...questions.map((question, i) => <Question key={i} {...question} />)]}
      />
    </Section>
  </>
)

export { FAQ }
