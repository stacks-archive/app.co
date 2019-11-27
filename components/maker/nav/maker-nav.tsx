import React from 'react';
import { Box, Flex, Text } from '@blockstack/ui';
import { App } from '@models/app';

import { Arrow } from '@components/arrow';
import { MakerNavContainer } from './nav-layout';

interface AppSelectProps {
  selectedValue?: number;
  onChange?(e: any): void;
  apps?: any[];
}

const AppSelect = ({ selectedValue, onChange, apps = [] }: AppSelectProps) => (
  <Flex alignItems="center">
    <Box>
      <Flex>
        <Flex alignItems="center">
          {apps.length && (
            <select value={selectedValue} onChange={onChange}>
              {apps.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          )}
          {apps.length > 1 && <Arrow direction="down" />}
        </Flex>
      </Flex>
    </Box>
  </Flex>
);

interface MakerNavActionsProps {
  userId: string;
  appName?: string;
  handleSignOut(): void;
  apps?: App[];
}

const MakerNavActions = ({ userId, handleSignOut }: MakerNavActionsProps) => {
  const User = () => <Text fontSize={0}>{userId}</Text>;
  return (
    <Flex alignItems="center" ml="auto">
      <Box textAlign="right" mr={3}>
        <User />
      </Box>
      <Box textAlign="right" mr={1}>
        <Text
          onClick={handleSignOut}
          as="a"
          fontSize={0}
          fontWeight="medium"
          color="blue.900"
          cursor="pointer"
        >
          Sign out
        </Text>
      </Box>
    </Flex>
  );
};

interface MakerNavProps {
  apps: App[];
  userId: string;
  selectedAppId: number;
  onChange(e: Event): void;
  handleSignOut(): void;
}

type MakerNav = React.FC<MakerNavProps>;

export const MakerNav: MakerNav = ({
  apps,
  userId,
  selectedAppId,
  onChange,
  handleSignOut
}) => {
  return (
    <MakerNavContainer>
      {apps.length > 0 && selectedAppId && (
        <AppSelect
          apps={apps}
          onChange={onChange}
          selectedValue={selectedAppId}
        />
      )}
      <MakerNavActions
        appName="klsdflksdf"
        userId={userId}
        handleSignOut={handleSignOut}
      />
    </MakerNavContainer>
  );
};
