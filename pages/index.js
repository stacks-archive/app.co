import React from 'react';
import { Hero } from '@containers/hero';
import { Header } from '@containers/header';
import { Page } from '@containers/page';
import { AppList } from '@containers/app-list';

const leftItems = [{ label: "What's a Dapp?" }, { label: 'Who we are' }];
const rightItems = [{ label: 'Add your Dapp', type: 'button/primary' }];

const sections = {
  left: leftItems,
  right: rightItems,
};

export default ({ data }) => (
  <Page>
    <Header data={sections} />
    <Hero title="Universal Dapp Repository" />
    <Page.Section wrap>
      <Page.Section.Content>
        <AppList apps={data.apps} show={10}/>
      </Page.Section.Content>
      <Page.Sidebar></Page.Sidebar>
    </Page.Section>
  </Page>
);
