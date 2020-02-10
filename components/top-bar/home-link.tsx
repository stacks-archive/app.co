import React from 'react';
import Link from 'next/link';
import { AppIcon } from '@components/logos';

import { Box } from 'blockstack-ui';

export const HomeLink = ({ isErrorPage }) =>
  isErrorPage ? (
    <a href="/">
      <Box size="24px">
        <AppIcon />
      </Box>
    </a>
  ) : (
    <Link href="/">
      <a href="/">
        <Box size="24px">
          <AppIcon />
        </Box>
      </a>
    </Link>
  );
