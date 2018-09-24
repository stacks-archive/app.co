import React from 'react'
import Link from 'next/link'

import { Table, Th, Thead, Td, SpacedTd } from '@components/mining-admin/table'
import { Section } from '@components/mining-admin/month'

const appRows = (apps) => apps.map((app) => (
  <tr>
    <Td>
      <Link href={`/admin/app?id=${app.id}`}>
        <a>{app.name}</a>
      </Link>
    </Td>
    <SpacedTd>
      {app.category}
    </SpacedTd>
    <SpacedTd>
      {app.Rankings && app.Rankings[0] && app.Rankings[0].twitterMentions || 0}
    </SpacedTd>
    <SpacedTd>
      {app.status}
    </SpacedTd>
  </tr>
))

const AppList = ({apps, title}) => (
  <Section>
    <h1>{title}</h1>
    <Table>
      <Thead>
        <tr>
          <Th>Name</Th>
          <Th>Category</Th>
          <Th>Tweets/Week</Th>
          <Th>Status</Th>
        </tr>
      </Thead>
      <tbody>
        {appRows(apps)}
      </tbody>
    </Table>
  </Section>
)

export default AppList
