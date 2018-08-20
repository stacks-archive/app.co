import * as React from 'react'
import { Flex } from '@components/mining'
import { Type } from '@components/typography'

const HeaderType = (props) => <Type.h3 color="white" fontSize="23px" fontWeight={300} {...props} />
const Heading = (props) => <Type.h3 color="white" fontSize={[4, 5]} textAlign="center" fontWeight={200} {...props} />
const SubHeading = (props) => (
  <Type.h4 color="#11A9BC" fontSize="19px" lineHeight={1.5} textAlign="center" fontWeight={400} {...props} />
)
const Section = (props) => <Flex alignItems="center" justifyContent="center" py={4} px={3} {...props} />

export { HeaderType, Section, Heading, SubHeading }
