import React from 'react';

import { Img, Description } from '@components/mining/reviewer/styled';
import { Type } from '@components/typography';
import { Hr } from '@components/mining-admin/month';

import reviewerData from '@common/lib/reviewers';

const Reviewer = ({ reviewer, index }) => {
  const name = reviewer.reviewerName;
  const { summary } = reviewer;
  const data = reviewerData[name];
  if (!data) return '';
  return (
    <>
      <Hr />
      <Type.h3 ml={0} mt={2} p={0}>
        Reviewer #{index + 1}
      </Type.h3>
      <Img
        src={`https://appco.imgix.net/reviewers/${data.logo}?fit=clip&h=96&w=96`}
        alt={name}
      />
      <Description>
        {data.description}{' '}
        <a href={data.website} target="_blank">
          Visit Website
        </a>
      </Description>
      {summary && summary.length > 0 && <Type.p>{summary}</Type.p>}
    </>
  );
};

export default Reviewer;
