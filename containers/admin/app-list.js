import React from 'react'
import Link from 'next/link'

import DynamicTable from '@atlaskit/dynamic-table'

const Name = ({ name, id }) => (
  <Link href={`/admin/app?id=${id}`}>
    <a>{name}</a>
  </Link>
)

const transformApps = (apps) =>
  apps.map((app) => {
    const [ranking] = app.Rankings || []
    let tweets = 0
    if (ranking) {
      tweets = ranking.twitterMentions || 0
    }
    return {
      cells: [
        {
          key: app.name,
          content: <Name name={app.name} id={app.id} />
        },
        {
          key: app.category,
          content: app.category
        },
        {
          key: tweets,
          content: tweets
        },
        {
          key: app.status || '',
          content: app.status || ''
        }
      ],
      id: app.id,
      key: app.id
    }
  })

const headers = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true
    },
    {
      key: 'category',
      content: 'Category',
      isSortable: true,
      shouldTruncate: true
    },
    {
      key: 'tweets',
      content: 'Tweets/Week',
      isSortable: true
    },
    {
      key: 'status',
      content: 'Status',
      isSortable: true
    }
  ]
}

const AppList = ({ apps }) => <DynamicTable head={headers} rows={apps && transformApps(apps)} />

export default AppList
