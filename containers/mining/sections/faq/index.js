import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import {
  Title,
  Wrapper,
  ObservedSection as Section,
} from '@components/mining/shared';
import LinkIcon from 'mdi-react/LinkVariantIcon';
import { Hover } from 'react-powerplug';
import styled from 'styled-components';
import { slugify } from '@utils';

const IframeStyles = styled.div`
  iframe {
    max-width: 100% !important;
  }
`;

const FAQSection = ({ faq, apps, ...rest }) => (
  <IframeStyles>
    <Section
      bg="blue.light"
      pt={8}
      inViewProps={{
        threshold: 0,
      }}
      {...rest}
    >
      {({ inView }) => (
        <Wrapper maxWidth={820} inView={inView} observed>
          <Flex width={[1]} flexShrink={0} flexDirection="column">
            <Title
              textAlign="center"
              maxWidth="80%"
              mx="auto"
              pt={[0, 8]}
              pb={0}
            >
              Frequently Asked Questions
            </Title>
            <Box
              width={1}
              mt={8}
              color="blue.dark"
              pl={4}
              borderLeft={'5px solid'}
              borderColor="blue.mid"
            >
              {faq.map(({ question }, i) => (
                <React.Fragment key={i}>
                  <Box py={'6px'} lineHeight={1.5}>
                    <Hover>
                      {({ hovered, bind }) => (
                        <Flex
                          style={{
                            textDecoration: 'none',
                          }}
                          is="a"
                          href={`#${slugify(question)}`}
                          {...bind}
                        >
                          <Type
                            fontSize={2}
                            fontWeight="500"
                            color={hovered ? 'blue' : 'blue.dark'}
                          >
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

                          <Box
                            is="a"
                            href={`#${slugify(question)}`}
                            opacity={hovered ? 1 : 0}
                            pl={2}
                          >
                            <LinkIcon />
                          </Box>
                        </Flex>
                      )}
                    </Hover>
                    <Box lineHeight={1.65} color="blue.dark">
                      <Type
                        maxWidth={900}
                        dangerouslySetInnerHTML={{ __html: answer }}
                      />
                    </Box>
                    <Box mt={6} width={80} height={'1px'} bg={'blue.mid'} />
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          </Flex>
        </Wrapper>
      )}
    </Section>
  </IframeStyles>
);

export { FAQSection };
