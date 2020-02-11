import React from 'react';

import { Text, Badge } from '@components/mining-admin/status';

const ReportStatus = ({ status }) => {
  const value = status || 'pending';
  const published = value === 'published';
  const string = published ? 'Published' : 'Not published';
  return (
    <>
      <Text>{string}</Text>
      <Badge background={published ? '#00C853' : '#FDD835'} />
    </>
  );
};

export default ReportStatus;
