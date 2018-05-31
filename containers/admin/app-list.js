import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import Link from 'next/link';

// import TableTree from '@atlaskit/table-tree';
import DynamicTable from '@atlaskit/dynamic-table';

const Name = ({ name, id }) => (
  <Link href={`/admin/app?id=${id}`}>
    <span>{name}</span>
  </Link>
);

// const Description = ({ description }) => <span>{description}</span>;

const transformApps = (apps) =>
  apps.map((app) => {
    const [ranking] = app.Rankings;
    let tweets = 0;
    if (ranking) {
      tweets = ranking.twitterMentions || 0;
    }
    return {
      cells: [
        {
          key: app.name,
          content: <Name name={app.name} id={app.id} />,
        },
        {
          key: app.description,
          content: app.description,
        },
        {
          key: tweets,
          content: tweets,
        },
        {
          key: app.status,
          content: app.status,
        },
      ],
      id: app.id,
      key: app.id,
    };
  });

// const AppList = ({ apps }) => (
//   <TableTree headers={['Name', 'Description']} columns={[Name, Description]} items={transformApps(apps)} />
// );

const headers = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
    },
    {
      key: 'description',
      content: 'Description',
      isSortable: false,
      shouldTruncate: true,
    },
    {
      key: 'tweets',
      content: 'Tweets/Week',
      isSortable: true,
    },
    {
      key: 'status',
      content: 'Status',
      isSortable: true,
    },
  ],
};

const AppList = ({ apps }) => <DynamicTable head={headers} rows={transformApps(apps)} />;

export default AppList;
