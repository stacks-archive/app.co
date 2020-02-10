import * as React from 'react';
import { Heading, Section } from '@containers/mining/shared';
import { Box } from '@components/mining';
import styled from 'styled-components';

import Content from '@containers/mining/faq/faq-content.md';

export const FAQwrapper = styled(Box)`
  & h2 {
    font-weight: 300;
    margin-top: 40px;
  }
  & p,
  ol,
  ul {
    opacity: 0.7;
    line-height: 1.78;
  }
  & img {
    max-width: 100%;
  }
  & .disclaimer {
    opacity: 0.7;
  }
`;

const FAQ = ({ ...props }) => (
  <>
    <Section
      minHeight="40vh"
      justifyContent="flex-end"
      mt={6}
      flexDirection="column"
      {...props}
    >
      <Heading mb={5} maxWidth={['100%', '800px']}>
        Frequently asked
        <br />
        questions
      </Heading>
      <FAQwrapper maxWidth="680px" color="white">
        <Content />
      </FAQwrapper>
    </Section>
  </>
);

export { FAQ };
