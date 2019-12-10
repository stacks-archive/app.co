import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useVisibilityChange from 'use-visibility-change';
import { Flex, Box } from 'blockstack-ui';
import { Button } from '@blockstack/ui';
import { MakerCardHeader, MakerCardText } from '../styled';
import { fetchApps } from '@stores/maker/actions';

const Kyc = ({ app, user }) => {
  const [loading, setLoading] = useState(false);
  const [hasStartedKyc, setHasStartedKyc] = useState(false);
  const dispatch = useDispatch();

  useVisibilityChange({
    onShow() {
      if (!hasStartedKyc) return;
      fetchApps({ user })(dispatch);
    }
  });

  const initiateKYC = async () => {
    setLoading(true);
    setHasStartedKyc(true);
    const url = `${process.env.API_SERVER}/api/maker/apps/initiate-kyc?appId=${
      app.id
    }`;
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        authorization: `Bearer ${user.jwt}`
      })
    });
    const data = await response.json();
    window.open(data.embedURL);
    setLoading(false);
  };

  const buttonText = () => {
    if (loading) {
      return 'Loading…';
    }
    return app.hasCollectedKYC ? 'Verified' : 'Start verification';
  };

  return (
    <>
      <Flex>
        <Box width={1} mt={0}>
          <MakerCardHeader>Identity Verification</MakerCardHeader>
          <MakerCardText>
            Verifying your identity helps keep App Mining secure and fight
            fraud. Your ID will never be shared.
          </MakerCardText>
          <Button
            onClick={initiateKYC}
            mt={4}
            disabled={app.hasCollectedKYC}
          >
            {buttonText()}
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Kyc;
