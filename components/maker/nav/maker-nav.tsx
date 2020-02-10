import React from 'react';
import { Box, Flex, Text } from '@blockstack/ui';
import Select from 'react-select';

import { App } from '@models/app';
import { MakerNavContainer } from './nav-layout';

interface AppSelectProps {
  selectedValue?: number;
  onChange?(e: any): void;
  apps?: any[];
}

const AppSelect = ({ selectedValue, onChange, apps = [] }: AppSelectProps) => {
  const options = apps.map(app => ({
    label: app.name,
    value: app.id,
  }));
  return (
    <Flex alignItems="center">
      <Box width="200px">
        <Select
          value={options.find(({ value }) => value === selectedValue)}
          onChange={onChange}
          styles={{
            option: (provided, state) => ({
              ...provided,
              fontSize: '14px',
              color: state.isSelected ? 'white' : '#222933',
            }),
            singleValue: provided => ({
              ...provided,
              fontSize: '14px',
              color: '#222933',
            }),
          }}
          options={options}
        />
      </Box>
    </Flex>
  );
};

interface MakerNavActionsProps {
  userId: string;
  appName?: string;
  handleSignOut(): void;
  apps?: App[];
}

const MakerNavActions = ({ userId, handleSignOut }: MakerNavActionsProps) => {
  const User = () => (
    <Text fontSize={0} lineHeight="20px">
      {userId}
    </Text>
  );
  return (
    <Flex
      alignItems={['right', 'center']}
      ml="auto"
      justifyContent={['center']}
      flexDirection={['column', 'row']}
    >
      <Box textAlign="right" mr={[0, 3]}>
        <User />
      </Box>
      <Box textAlign="right">
        <Text
          onClick={handleSignOut}
          as="a"
          fontSize={0}
          fontWeight="medium"
          color="blue.900"
          cursor="pointer"
          lineHeight="20px"
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
  onChange(e: any): void;
  handleSignOut(): void;
}

type MakerNav = React.FC<MakerNavProps>;

export const MakerNav: MakerNav = ({
  apps,
  userId,
  selectedAppId,
  onChange,
  handleSignOut,
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
