import React from 'react';
import Link from 'next/link';

import { Box, Button, Text } from '@blockstack/ui';

interface SuccessCardProps {
  isAppMiningEligible: boolean;
}

type SuccessCard = React.FC<SuccessCardProps>;

const SuccessCard: SuccessCard = ({ isAppMiningEligible }) => (
  <Box width="100%" textAlign="center" py={56}>
    <Box pb={6} width="100%">
      <Text textStyle="display.large" mx="auto" fontSize={5} fontWeight="bold">
        Success!
      </Text>
    </Box>
    <Box mx="auto">
      <Text textStyle="display.small" display="block">
        Thanks for your submission! Your app will need to be approved before
        being public on app.co.
      </Text>
      {isAppMiningEligible && (
        <>
          <Text my={3} display="block">
            To update your app&apos;s details and enroll in App Mining, visit
            our Maker Portal
          </Text>
          <Link href={{ pathname: '/maker/apps' }} passHref>
            <Button mt={6}>
              Go to the Maker Portal
            </Button>
          </Link>
        </>
      )}
    </Box>
  </Box>
);

export default SuccessCard;
