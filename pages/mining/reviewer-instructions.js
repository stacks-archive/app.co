import React from 'react';
import { Page } from '@components/page';
import { Section, Content } from '@components/mining-admin/month';
import Head from '@containers/head';
import { Type } from 'blockstack-ui';
import { Ol, Li } from '@components/mining/instructions';

const ReviewerInstructions = () => (
  <Page>
    <Head title="App Mining Reviewer Instructions" />
    <Section mx="auto" my={5} width={[1, 0.6]}>
      <h2>Reviewer instructions for App Mining</h2>
      <Content>
        <Type.p>
          Reviewers submit their app rankings to Blockstack every month. The
          first day of the month Blockstack will email reviewers a spreadsheet
          in which to record rankings.
        </Type.p>
        <Type.p>To submit app rankings, complete the following steps:</Type.p>
        <Ol>
          <Li>
            <Type.p>Download spreadsheet for the month</Type.p>
            <Type.p>
              The spreadsheet is sent to the email address we have on file for
              you. The sheet lists all apps eligible for ranking.
            </Type.p>
          </Li>
          <Li>
            <Type.p>Record your rankings in the spreadsheet</Type.p>
            <Type.p>
              Place a rank value in the Ranking column next to each app you
              would like to rank. You can rank only those apps you want and omit
              ranking others. Rank each application numerically where 1 (one) is
              the highest.
            </Type.p>
            <Type.p>
              Please avoid modifying the spreadsheet in apart from adding your
              rankings. The App ID column, in particular, must be preserved to
              process your rankings accurately.
            </Type.p>
            <Type.p>
              <a href="https://docs.google.com/spreadsheets/d/1_PILCyCMpdlKAI_NirKKtL47bZCvvlsrV5hV3XDzDkE/edit?usp=sharing">
                View example of completed spreadsheet
              </a>
            </Type.p>
          </Li>
          <Li>
            <Type.p>
              Return your rankings by the 15th to app.mining@blockstack.org
            </Type.p>
            <Type.p>
              <Type.strong fontWeight="700">IMPOR TANT</Type.strong>: We must
              receive your rankings by the 15th of the month or they won't be
              considered!
            </Type.p>
            <Type.p>
              Attach your completed spreadsheet to your email. Include in the
              email a brief explanation summarizing your methodology or thoughts
              when ranking. Please mention any app you want to highlight for the
              month.
            </Type.p>
          </Li>
        </Ol>
      </Content>
    </Section>
  </Page>
);

export default ReviewerInstructions;
