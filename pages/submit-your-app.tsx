import React, { useState } from 'react';
import 'isomorphic-unfetch';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { Button, Text } from '@blockstack/ui';
import { Field, Flex, Box } from 'blockstack-ui';
import debounce from 'lodash/debounce';

import Head from '@containers/head';
import { Page } from '@components/page';
import { selectAppConstants, selectUser } from '@stores/apps/selectors';
import {
  FormSection,
  ErrorMessage,
  sections as getSections,
} from '@containers/submit';
import SuccessCard from '@components/submit';
import UserStore from '@stores/user';
import * as MakerStore from '@stores/maker/actions';

import { trackEvent } from '@utils/index';
import { SubmitSignIn } from '@components/submit/submit-sign-in';
import { isUserSignedIn } from '@stores/user/selectors';
import { BlockstackIdCard } from '@components/submit/blockstack-id-card';

const APP_SUBMISSION_DATA = 'app_submission_data';

const outerHandleChange = e => (setState: any) => {
  if (e && e.persist) e.persist();
  setState((s: any) => ({
    ...s,
    values: {
      ...s.values,
      [e.target.name]: e.target.value,
    },
  }));
};

interface SubmitProps {
  appConstants: any;
  setState: any;
  state: any;
  errors: any;
  submit: any;
  user: any;
  loading: any;
  signIn: any;
  isSignedIn: boolean;
  success: any;
  isAppMiningEligible: any;
}

type Submit = React.FC<SubmitProps>;

const Submit: Submit = ({
  appConstants,
  setState,
  state,
  errors,
  submit,
  user,
  loading,
  signIn,
  isSignedIn,
}) => {
  const sections = getSections(user, appConstants);
  const [signingIn, setSigningIn] = useState(false);
  const dispatch = useDispatch();

  const validate = async () => {
    let errorsObj = {};
    let errorCount = 0;

    if (!(user && user.jwt)) {
      return {
        count: 1,
        errors: {},
      };
    }

    await Promise.all(
      sections.map(async section =>
        Promise.all(
          (section.fields as any[]).map(async field => {
            const isBool = field.type === 'radio' || field.type === 'checkbox';
            const value = state[field.name];
            if (isBool && field.required && !value) {
              errorsObj = {
                ...errorsObj,
                [field.name]: 'This is required.',
              };
              errorCount += 1;
            } else if (field.validation) {
              try {
                await field.validation.validate(value);
              } catch (e) {
                errorsObj = {
                  ...errorsObj,
                  [field.name]: e.errors[0],
                };
                errorCount += 1;
              }
            }
          })
        )
      )
    );
    return {
      count: errorCount,
      errors: errorsObj,
    };
  };

  const handleValidation = async (e: any) => {
    if (e) e.preventDefault();
    const validation = await validate();
    if (validation.count > 0) {
      trackEvent('App Submission Page - Validation Errors');
      setState(() => ({
        errorCount: validation.count,
        errors: validation.errors,
      }));
    } else {
      setState(() => ({
        errorCount: null,
        errors: {},
      }));
      submit();
    }
  };

  const blockstackAuth = (e: any) => {
    setSigningIn(true);
    if (e) {
      e.preventDefault();
    }
    localStorage.setItem(APP_SUBMISSION_DATA, JSON.stringify(state));
    signIn('submit-your-app');
  };

  const [personalDetailsSection, ...appDetailsSections] = sections;

  return (
    <Box mx="auto" maxWidth={540}>
      <Text as="h1" color="ink" display="block" pt={2} pb={10}>
        Submit your app
      </Text>
      <Text as="h2" color="ink" display="block" pb={8}>
        Personal details
      </Text>

      {!isSignedIn && (
        <section>
          {/* <Text as="h2" textStyle="body.small" color="ink">Connect your Blockstack ID</Text> */}
          <Field.LabelAdvanced
            label="Connect your Blockstack ID"
            pb={2}
            required
          />
          <SubmitSignIn
            handleBlockstackAuth={blockstackAuth}
            loading={signingIn}
          />
        </section>
      )}

      {user && user.jwt && (
        <Flex pt={6}>
          <Box mb={4} width={1}>
            <Field.LabelAdvanced
              labelProps={{
                pb: 3,
              }}
              pl={0}
              required
              label="Blockstack ID"
            />
            <BlockstackIdCard
              name={user.user.blockstackUsername}
              onSignOut={() => dispatch(UserStore.actions.signOut())}
            />
            <Text fontSize={1} display="block" mt={3}>
              You will use your ID to make changes to your app, and remove or
              modify its listing in the future.
            </Text>
          </Box>
        </Flex>
      )}

      <Flex flexWrap="wrap" pt={6} flexDirection="column">
        <form noValidate onSubmit={handleValidation}>
          <FormSection
            errors={errors}
            handleChange={outerHandleChange}
            setState={setState}
            key={`section-${personalDetailsSection.fields[0].name}`}
            message={personalDetailsSection.message}
            fields={personalDetailsSection.fields}
            state={state}
          />

          <Text as="h2" display="block" color="ink" pt={12} pb={10}>
            About your app
          </Text>
          {appDetailsSections.map(section => (
            <FormSection
              errors={errors}
              handleChange={outerHandleChange}
              setState={setState}
              key={`section-${section.fields[0].name}`}
              message={section.message}
              fields={section.fields}
              state={state}
            />
          ))}
          {errors ? (
            <ErrorMessage
              message={
                !(user && user.jwt)
                  ? 'You must sign in with Blockstack'
                  : undefined
              }
            />
          ) : null}
          <Button>{loading ? 'Loading...' : 'Submit your app'}</Button>
        </form>
      </Flex>
    </Box>
  );
};

const getValues = () => {
  if (typeof localStorage !== 'undefined') {
    const appDataJSON = localStorage.getItem(APP_SUBMISSION_DATA);
    if (appDataJSON) {
      const appData = JSON.parse(appDataJSON);
      return appData;
    }
  }
  return {};
};

interface SubmitDappProps {
  handleSignIn(server: string): void;
  user: any;
  appConstants: any;
  signIn(): void;
  isSignedIn: boolean;
  fetchApps(x?: any, y?: any): void;
}

interface SubmitDappState {
  values: any;
  loading: any;
  success: any;
  errors: any;
  referralCode: any;
  refSource: any;
  accessToken: any;
  errorCount: any;
  newAppId: number | null;
}

class SubmitDapp extends React.Component<SubmitDappProps, SubmitDappState> {
  state = {
    values: getValues(),
    loading: false,
    success: false,
    errors: {},
    referralCode: null,
    refSource: null,
    accessToken: null,
    errorCount: 0,
    newAppId: null,
  };

  componentDidMount() {
    const queries = document.location.search;
    if (queries) {
      const referralCodeMatch = queries.match(/referralCode=(\w+)/);
      const referralCode = referralCodeMatch ? referralCodeMatch[1] : null;
      const refSourceMatch = queries.match(/refSource=(\w+)/);
      const refSource = refSourceMatch ? refSourceMatch[1] : null;
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        referralCode,
        refSource,
      });
    }
  }

  setStateFromData() {
    const { search } = document.location;
    if (search) {
      const refPart = search.match(/referralCode=(\w+)/);
      if (refPart) {
        const referralCode = refPart[1];
        const refSource = search.match(/refSource=(\w+)/)[1];
        this.setState({
          referralCode,
          refSource,
        });
      }
    }
  }

  submit = async () => {
    const url = `${process.env.API_SERVER}/api/submit`;
    this.setState({ loading: true });

    /**
     * Clean twitter handle of @ sign
     */
    let twitterHandle = this.state.values && this.state.values.twitterHandle;
    if (twitterHandle && twitterHandle.includes('@')) {
      twitterHandle = twitterHandle.replace('@', '');
    }

    const values = {
      ...this.state.values,
      twitterHandle,
      referralCode: this.state.referralCode,
      refSource: this.state.refSource,
    };

    try {
      const headers: Record<string, string> = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      };
      if (this.props.user && this.props.user.jwt) {
        headers.Authorization = `Bearer ${this.props.user.jwt}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(values),
      });
      const resData = await response.json();
      trackEvent('App Submission Page - Submission Success');
      this.setState({
        success: true,
        loading: false,
        accessToken: resData.app.accessToken,
        newAppId: resData.app.id,
      });
      this.props.fetchApps({ user: this.props.user });
    } catch (e) {
      trackEvent('App Submission Page - Submission Error');
      this.setState({ success: false, loading: false });
      console.error(e.message);
    }
  };

  makerPortalURL() {
    const { accessToken } = this.state;
    return `/maker/${accessToken}`;
  }

  appMiningEligible() {
    const { values } = this.state;
    return (
      values.authentication === 'Blockstack' &&
      values.category !== 'Sample Blockstack Apps'
    );
  }

  render() {
    const { appConstants } = this.props;

    return (
      <Page innerPadding={0} pt={0} background="white">
        <Head
          title="Submit your app"
          description="Submit your app to be listed on the Universal Dapp Store."
        />
        <Page.Section p={['32px', '64px']} mb={3} bg="white">
          {this.state.success ? (
            <SuccessCard
              newAppId={this.state.newAppId}
              //
              // Always must be false while app mining programme is paused
              isAppMiningEligible={false}
            />
          ) : (
            <Submit
              loading={this.state.loading}
              isSignedIn={this.props.isSignedIn}
              submit={this.submit}
              success={this.state.success}
              appConstants={appConstants}
              setState={debounce((args: any) => this.setState(args), 100)}
              state={this.state.values}
              errors={this.state.errorCount > 0 && this.state.errors}
              signIn={this.props.signIn}
              user={this.props.user}
              //
              // Always must be false while app mining programme is paused
              isAppMiningEligible={false}
            />
          )}
        </Page.Section>
      </Page>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    { ...UserStore.actions, fetchApps: MakerStore.fetchApps },
    dispatch
  );
}

const mapStateToProps = (state: any) => ({
  appConstants: selectAppConstants(state),
  user: selectUser(state),
  isSignedIn: isUserSignedIn(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitDapp);
