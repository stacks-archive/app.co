import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@pages/mining/shared'
import { slugify } from '@utils'
import { LinkVariantIcon as LinkIcon } from 'mdi-react'
import { Hover, State } from 'react-powerplug'

const FAQSection = ({ faq, ...rest }) => (
  <Section pt={8} bg="blue.light" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%" pt={8} pb={0}>
          Frequently Asked Questions
        </Title>
        <Box width={1} mt={8} color="blue.dark" pl={4} borderLeft={'5px solid'} borderColor="blue.mid">
          {faq.map(({ question }, i) => (
            <React.Fragment key={i}>
              <Box py={"6px"} lineHeight={1.5}>
                <Hover>
                  {({ hovered, bind }) => (
                    <Flex
                      style={{
                        textDecoration: 'none'
                      }}
                      is="a"
                      href={`#${slugify(question)}`}
                      {...bind}
                    >
                      <Type fontSize={2} fontWeight="500" color={hovered ? 'blue' : 'blue.dark'}>
                        {question}
                      </Type>
                    </Flex>
                  )}
                </Hover>
              </Box>
            </React.Fragment>
          ))}
        </Box>
        <Box mt={9} width={80} height={'1px'} bg={'blue.mid'} />
        <Box width={1} pt={5} color="blue.dark">
          {faq.map(({ question, answer }, i) => (
            <React.Fragment key={i}>
              <Box id={slugify(question)} pt={7}>
                <Hover>
                  {({ hovered, bind }) => (
                    <Flex {...bind}>
                      <Type pb={5} fontSize={4} fontWeight="500">
                        {question}
                      </Type>

                      <Box is="a" href={`#${slugify(question)}`} opacity={hovered ? 1 : 0} pl={2}>
                        <LinkIcon />
                      </Box>
                    </Flex>
                  )}
                </Hover>
                <Box lineHeight={1.65}>
                  <Type maxWidth={900} dangerouslySetInnerHTML={{ __html: answer }} />
                </Box>
                <Box mt={6} width={80} height={'1px'} bg={'blue.mid'} />
              </Box>
            </React.Fragment>
          ))}
        </Box>
      </Flex>
    </Wrapper>
  </Section>
)

export { FAQSection }
