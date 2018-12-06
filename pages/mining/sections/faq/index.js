import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@pages/mining/shared'
import { slugify } from '@utils'

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

const FAQSection = ({ faq, ...rest }) => (
  <Section pt={6} bg="blue.light" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%" pt={8} pb={0}>
          Frequently Asked Questions
        </Title>
        <Box width={1} pt={8}>
          {faq.map(({ question, answer }, i) => (
            <Box id={slugify(question)} pt={7} key={i}>
              <Box>
                <Type pb={5} fontSize={3} fontWeight="500">
                  {question}
                </Type>
              </Box>
              <Box lineHeight={1.65}>
                <Type maxWidth={900} dangerouslySetInnerHTML={{ __html: answer }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Flex>
    </Wrapper>
  </Section>
)

export { FAQSection }
