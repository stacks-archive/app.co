import React from 'react'
import fetch from 'cross-fetch'
import { string } from 'yup'
import debounce from 'lodash.debounce'

const API = 'https://app-co-api.herokuapp.com/api/blockstack-subscribe'

class NewsletterWrapper extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  state = {
    loading: false,
    success: false,
    value: null,
    isValid: false,
    showError: false,
    error: null
  }

  schema = string().email('Invalid email.')

  submit = async (value) =>
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({
        email: value,
        from: this.props.from,
        list: this.props.list
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

  handleChange = debounce(async (value) => {
    this.setState({ value })
    await this.validate(value)
  }, 200)

  onChange = ({ target }) => this.handleChange(target.value)

  setError = (error) =>
    this.setState({
      error
    })

  clearError = () =>
    this.setState({
      error: null
    })

  loading = () => this.setState({ loading: true })
  success = () =>
    this.setState({
      success: true,
      loading: false
    })

  validate = async (email) => {
    try {
      const isValid = await this.schema.validate(email)
      if (isValid) {
        this.clearError()
        this.setState({
          isValid
        })
      } else {
        this.setState({
          isValid: false
        })
      }
    } catch (e) {
      console.log(e)
      e.errors && e.errors.length && this.setError(e.errors[0])
      return this.setState({
        isValid: false
      })
    }
  }

  doSubmit = async () => {
    if (!this.state.isValid) {
      console.log('not valid!')
      return null
    }

    this.loading()

    if (this.state.isValid && this.state.value) {
      try {
        const res = await this.submit(this.state.value)
        const data = await res.json()

        if (data.success) {
          this.success()
        } else {
          this.setError(data.error)
        }
      } catch (error) {
        this.setError(error.message)
      }
    } else if (this.state.error) {
      this.setState({ showError: true })
    }
  }

  render() {
    const props = {
      loading: this.state.loading,
      isValid: this.state.value !== '' && this.state.isValid,
      error: this.state.showError && this.state.error,
      success: this.state.success,
      doSubmit: this.doSubmit,
      value: this.state.value,
      bind: {
        onChange: (e) => this.onChange(e)
      }
    }
    return this.props.children(props)
  }
}

export default NewsletterWrapper
