import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultTitle = 'App.co, The Universal Dapp Store';

const SmallBlockOne = ({ label1, data1 }) =>
  label1 && data1 ? (
    <>
      <meta name="twitter:label1" value={label1} />
      <meta name="twitter:data1" value={data1} />
    </>
  ) : null;

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>
      {props.title === defaultTitle
        ? props.title
        : `${props.title} - ${defaultTitle}`}
    </title>
    <meta name="description" content={props.description} />
    {/* <meta property="og:url" content={props.url} /> */}
    {/* <meta name="twitter:site" content={props.url} /> */}

    <meta property="og:title" content={props.title} />
    <meta property="twitter:title" content={props.title} />

    <meta property="og:description" content={props.description} />
    <meta property="twitter:description" content={props.description} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage} />
    <meta property="og:image" content={props.ogImage} />
    <meta content="index, follow" />
    <SmallBlockOne {...props} />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  // url: string,
  ogImage: string,
};

Head.defaultProps = {
  title: defaultTitle,
  description: 'Universal dapp store - discover decentralized apps.',
  ogImage: 'https://app.co/static/images/open_graph/image.png',
  // url: 'https://app.co',
};

export default Head;
