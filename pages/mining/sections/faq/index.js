import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@pages/mining/shared'

const questions = [
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi, aperiam deleniti impedit in nemo numquam rerum sapiente similique sint? Ad aut impedit inventore molestiae obcaecati officia omnis repudiandae sequi.'
  },
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi, aperiam deleniti impedit in nemo numquam rerum sapiente similique sint? Ad aut impedit inventore molestiae obcaecati officia omnis repudiandae sequi.'
  },
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi, aperiam deleniti impedit in nemo numquam rerum sapiente similique sint? Ad aut impedit inventore molestiae obcaecati officia omnis repudiandae sequi.'
  },
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi, aperiam deleniti impedit in nemo numquam rerum sapiente similique sint? Ad aut impedit inventore molestiae obcaecati officia omnis repudiandae sequi.'
  }
]

const FAQSection = ({ ...rest }) => (
  <Section pt={0} bg="blue.light" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%">Frequently Asked Questions</Title>
        <Box width={1} pt={8}>
          {questions.map(({ question, answer }, i) => (
            <Box pb={7} key={i}>
              <Box>
                <Type pb={5} fontSize={3} fontWeight="500">
                  {question}
                </Type>
              </Box>
              <Box lineHeight={1.5}>
                <Type maxWidth={900}>{answer}</Type>
              </Box>
            </Box>
          ))}
        </Box>
      </Flex>
    </Wrapper>
  </Section>
)

export { FAQSection }
