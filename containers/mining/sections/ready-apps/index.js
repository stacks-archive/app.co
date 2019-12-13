import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Title, Wrapper, Section } from '@components/mining/shared';

const NextApps = ({ apps, ...rest }) => (
  <Section flexDirection="column" pb={0} bg="blue.light" {...rest}>
    <Wrapper>
      <Flex width={[1]} flexShrink={0} flexDirection="column">
        <Title pt={6} pb={4} maxWidth="100%">
          The next batch of registered apps
        </Title>
        <Flex
          pb={7}
          flexWrap="wrap"
          mt={7}
          alignItems="center"
          justifyContent="flex-start"
        >
          {apps.map(app => (
            <Box flexShrink={0} py={4} pr={4} width={[1, 1 / 2]}>
              <Flex alignItems="center" lineHeight={1.5}>
                <Box
                  is="a"
                  target="_blank"
                  mr={4}
                  size={[54, 72]}
                  borderRadius={16}
                  bg="white"
                  backgroundImage={`url(${app.imgixImageUrl})`}
                  title={app.name}
                  backgroundSize="cover"
                  boxShadow="card"
                  flexShrink={0}
                  href={app.website}
                />
                <Box pr={4}>
                  <Type display="block" fontWeight="bold" pb={1}>
                    {app.name}
                  </Type>
                  <Type display="block">{app.description}</Type>
                </Box>
              </Flex>
              <Box
                mt={6}
                display={['block', 'none']}
                bg="blue.mid"
                height={'1px'}
                width={80}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Wrapper>
  </Section>
);

export { NextApps };
