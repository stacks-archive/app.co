import React from 'react';
import { Page } from '@components/page';
import { AppsList } from '@components/list/apps';
import Modal from '@containers/modals/app';
import Head from '@containers/head';

const AllAppsPage = () => (
  <Page>
    <Head title="Popular decentralized apps" />
    <Page.Section flexDirection="column" px>
      <AppsList image="g3" single title="Popular decentralized apps" />
    </Page.Section>
    <Modal />
  </Page>
);

export default AllAppsPage;
