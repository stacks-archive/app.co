import React from 'react'
import { Flex, Box, Type, Button } from 'blockstack-ui'
import { Title, Wrapper, Section } from '@pages/mining/shared'
import { slugify } from '@utils'
import { LinkVariantIcon as LinkIcon } from 'mdi-react'
import { Hover, State } from 'react-powerplug'

const FAQSection = ({ faq, ...rest }) => (
  <Section pt={6} bg="blue.light" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title maxWidth="100%" pt={8} pb={0}>
          Frequently Asked Questions
        </Title>
        <Box width={1} pt={8}>
          {faq.map(({ question, answer }, i) => (
            <React.Fragment key={i}>
              <State initial={{ open: true }}>
                {({ state, setState }) => (
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
                    {state.open ? (
                      <Box lineHeight={1.65}>
                        <Type maxWidth={900} dangerouslySetInnerHTML={{ __html: answer }} />
                      </Box>
                    ) : null}
                    <Box mt={6} width={80} height={'1px'} bg={'blue.mid'} />
                  </Box>
                )}
              </State>
            </React.Fragment>
          ))}
        </Box>
      </Flex>
    </Wrapper>
  </Section>
)

export { FAQSection }
