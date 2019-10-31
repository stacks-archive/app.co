import React from 'react'
import Link from 'next/link'
import { Type, Box, Button } from 'blockstack-ui'

const SuccessCard = ({ isAppMiningEligible }) => (
  <Box width="100%" textAlign="center">
    <Box pb={6} width="100%">
      <Type mx="auto" fontSize={5} fontWeight="bold">
        Success!
      </Type>
    </Box>
    <Box mx="auto">
      <Type display="block">
        Thanks for your submission! Your app will need to be approved before being public on app.co.
      </Type>
      {isAppMiningEligible && (
        <>
          <Type my={3} display="block">
            To update your app&apos;s details and enroll in App Mining, visit our Maker Portal
          </Type>
          <Link href={{ pathname: '/maker' }} passHref>
            <Button is="a" href="/" color="white !important">
              Go to the Maker Portal
            </Button>
          </Link>
        </>
      )}
    </Box>
  </Box>
)

export default SuccessCard
