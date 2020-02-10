import * as React from 'react';
import { Type, Flex, Box } from 'blockstack-ui';
import { AppIcon } from '@components/logos';
import Link from 'next/link';

const HeaderType = props => (
  <Type.h3
    color="white"
    fontSize={['18px', '23px']}
    fontWeight={300}
    {...props}
  />
);
const Heading = props => (
  <Type.h3
    color="white"
    fontSize={[4, 5]}
    textAlign="center"
    fontWeight={200}
    {...props}
  />
);
const SubHeading = props => (
  <Type.h4
    color="#11A9BC"
    fontSize="19px"
    lineHeight={1.5}
    textAlign="center"
    fontWeight={400}
    {...props}
  />
);
const Section = props => (
  <Flex alignItems="center" justifyContent="center" py={4} px={3} {...props} />
);

const Footer = () => (
  <Flex justifyContent="center" p={4}>
    <Link href="/mining/terms" passHref>
      <Type pr={2} is="a">
        Terms of Use
      </Type>
    </Link>
    <Type>|</Type>
    <Link href="/privacy" passHref>
      <Type pl={2} is="a">
        Privacy Policy
      </Type>
    </Link>
  </Flex>
);

const Header = () => (
  <Section>
    <HeaderType mr={2}>App Mining by</HeaderType>{' '}
    <Box size={[28, 34]}>
      <AppIcon m={2} />
    </Box>
    <HeaderType ml={2}>
      <a href="https://app.co" target="_blank">
        App.co
      </a>
    </HeaderType>{' '}
    <HeaderType ml={2}>
      and{' '}
      <a href="https://blockstack.org" target="_blank">
        Blockstack
      </a>
    </HeaderType>
  </Section>
);

export { HeaderType, Section, Heading, Header, SubHeading, Footer };
