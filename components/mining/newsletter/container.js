import React from 'react';
import fetch from 'cross-fetch';
import { string } from 'yup';
import debounce from 'lodash.debounce';

import { trackEvent } from '@utils';

const API = 'https://api.app.co/api/blockstack-subscribe';

export const NewsletterContext = React.createContext();

class NewsletterWrapper extends React.PureComponent {
  state = {
    loading: false,
    success: false,
    value: null,
    isValid: false,
    showError: false,
    error: null,
  };

  schema = string()
    .email('Invalid email.')
    .nullable()
    .required('Please enter an email.');

  submit = async value =>
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({
        email: value,
        SOURCE: this.props.SOURCE,
        list: this.props.list,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

  handleChange = debounce(async value => {
    this.setState({ value });
  }, 200);

  onChange = ({ target }) => this.handleChange(target.value);

  setError = error =>
    this.setState({
      loading: false,
      showError: true,
      error,
    });

  clearError = () =>
    this.setState({
      error: null,
    });

  loading = () => this.setState({ loading: true });
  success = () =>
    this.setState({
      success: true,
      loading: false,
    });

  validate = async email => {
    try {
      const isValid = await this.schema.validate(email);
      if (isValid) {
        this.clearError();
        this.setState({
          isValid,
        });
      } else {
        this.setState({
          isValid: false,
        });
      }
    } catch (e) {
      console.log(e);
      e.errors && e.errors.length && this.setError(e.errors[0]);
      return this.setState({
        isValid: false,
      });
    }
  };

  doSubmit = async e => {
    if (e && e.preventDefault) {
      e.preventDefault(); // to prevent page reload when user submits via hitting return
    }

    await this.validate(this.state.value);

    if (this.state.isValid && this.state.value) {
      try {
        this.loading();

        const res = await this.submit(this.state.value);
        const data = await res.json();

        if (data.success) {
          trackEvent('Starter Kit Submission Success');
          this.success();
          return this.state.value;
        } else {
          trackEvent('Starter Kit Submission Error');
          this.setError(data.error);
          return false;
        }
      } catch (error) {
        trackEvent('Starter Kit Submission Success');
        this.setError(error.message);
        return false;
      }
    } else if (this.state.error) {
      this.setState({ showError: true });
      return false;
    }
  };

  render() {
    const props = {
      loading: this.state.loading,
      isValid: this.state.value !== '' && this.state.isValid,
      error: this.state.showError && this.state.error,
      success: this.state.success,
      doSubmit: this.props.onSubmit
        ? e => this.props.onSubmit(() => this.doSubmit(e))
        : this.doSubmit,
      value: this.state.value,
      bind: {
        onChange: e => this.onChange(e),
      },
    };
    return (
      <NewsletterContext.Provider value={props}>
        {this.props.children(props)}
      </NewsletterContext.Provider>
    );
  }
}

export default NewsletterWrapper;
