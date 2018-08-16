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
    title: 'Is this real?',
    answer: 'Yes'
  },
  {
    title: 'What is App Mining?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolor illo impedit iusto, laboriosam libero maxime modi mollitia praesentium sed ut voluptates. Consectetur eum laborum omnis optio quod sed veritatis!'
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
