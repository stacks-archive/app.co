import React from 'react';
import { Section } from '@components/mining-admin/month';
import {
  AppLink,
  Img,
  Container,
  Name,
  Description,
} from '@components/mining/registered-apps/styled';

const AppsList = ({ apps }) => {
  return apps
    .filter(app => app.miningReady === true)
    .map(app => (
      <AppLink href={app.website} target="_blank">
        <Img src={app.imgixImageUrl} />
        <Container>
          <Name>{app.name}</Name>
          <Description>{app.description}</Description>
        </Container>
      </AppLink>
    ));
};

const RegisteredApps = ({ apps, ...rest }) => (
  <Section mx="auto" mt={3} mb={5} width={[1, 0.6]} {...rest}>
    <h3>Registered Apps</h3>
    <AppsList apps={apps} />
  </Section>
);

export default RegisteredApps;
