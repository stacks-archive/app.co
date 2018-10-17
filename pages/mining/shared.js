import * as React from 'react'
import { Type, Flex } from 'blockstack-ui'
import { AppIcon } from '@components/logos'

const HeaderType = (props) => <Type.h3 color="white" fontSize="23px" fontWeight={300} {...props} />
const Heading = (props) => <Type.h3 color="white" fontSize={[4, 5]} textAlign="center" fontWeight={200} {...props} />
const SubHeading = (props) => (
  <Type.h4 color="#11A9BC" fontSize="19px" lineHeight={1.5} textAlign="center" fontWeight={400} {...props} />
)
const Section = (props) => <Flex alignItems="center" justifyContent="center" py={4} px={3} {...props} />

const Header = () => (
  <Section>
    <HeaderType mr={2}>App Mining by</HeaderType> <AppIcon size={32} m={2} />
    <HeaderType ml={2}>
      <a href="https://app.co" target="_blank">
        App.co
      </a>{' '}
      and{' '}
      <a href="https://blockstack.org" target="_blank">
        Blockstack
      </a>
    </HeaderType>
  </Section>
)

export { HeaderType, Section, Heading, Header, SubHeading }
