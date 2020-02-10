import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useVisibilityChange from 'use-visibility-change';

import { Flex, Box } from 'blockstack-ui';
import { Button, Text } from '@blockstack/ui';
import { fetchApps } from '@stores/maker/actions';
import { MakerCardHeader, MakerCardText } from '../styled';

const Kyc = ({ app, user }) => {
  const [loading, setLoading] = useState(false);
  const [hasStartedKyc, setHasStartedKyc] = useState(false);
  let syncKycUrl = null;
  const [kycUrl, setKycUrl] = useState(null);
  const dispatch = useDispatch();

  useVisibilityChange({
    onShow() {
      if (!hasStartedKyc) return;
      fetchApps({ user })(dispatch);
    },
  });

  useEffect(() => {
    async function getEmbed() {
      setLoading(true);
      const url = `${process.env.API_SERVER}/api/maker/apps/initiate-kyc?appId=${app.id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
          authorization: `Bearer ${user.jwt}`,
        }),
      });
      const data = await response.json();
      //
      // Some confusion here as despite calling setKycUrl()
      // when reading this value from the initiateKyc fn
      // it remains null
      setKycUrl(data.embedURL);
      syncKycUrl = data.embedURL;
      setLoading(false);
    }
    getEmbed();
  }, [app.id]);

  const buttonText = () => {
    if (loading) {
      return 'Loading…';
    }
    return app.hasCollectedKYC ? 'Verified' : 'Start verification';
  };

  const url = app.hasCollectedKYC ? null : syncKycUrl || kycUrl;

  return (
    <>
      <Flex>
        <Box width={1} mt={0}>
          <MakerCardHeader>Identity Verification</MakerCardHeader>
          <MakerCardText>
            Verifying your identity helps keep App Mining secure and fight
            fraud. Your ID will never be shared.
          </MakerCardText>
          <Box>
            <a href={url} target="_blank" style={{ textDecoration: 'none' }}>
              <Button mt={2} disabled={app.hasCollectedKYC}>
                {buttonText()}
              </Button>
            </a>
          </Box>
          <Text as="p" display="block" textStyle="caption" mt={4} mb={0}>
            Note: It may take a few minutes for this page to update after you’ve
            completed identity verification.
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default Kyc;
