import React from 'react'
import Link from 'next/link'
import { Flex, Box, PseudoBox } from '@blockstack/ui'
import { Arrow } from '@components/arrow'

export interface App {
  name: string;
  imgUrl?: string;
  id: number;
}

interface AppDirectoryProps {
  apps: App[];
}

export const AppDirectory: React.FC<AppDirectoryProps> = ({ apps }) => (

  <>
    {
      apps.map(app => (
        <Flex key={app.id}>
          <Link href={`/maker/apps/${app.id}`}>
            <PseudoBox display="flex" width={['320px', '432px']} maxWidth={432} mb={2} height={96} borderRadius={6} justifyContent="space-between" alignItems="center" background="#F9F9FC" _hover={{ bg: '#F0F0F5' }}>
              <Box
                width="48px"
                height="48px"
                background="black"
                ml={6}
              />
              <Box flex={1} ml={6}>{app.name}</Box>
              <Box mr={6}>
                <Arrow direction="right" />
              </Box>
            </PseudoBox>
          </Link>
        </Flex>
      ))
    }
  </>
)

