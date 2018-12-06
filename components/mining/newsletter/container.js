import React from 'react'
import fetch from 'cross-fetch'
import { string } from 'yup'
import debounce from 'lodash.debounce'

const API = 'https://app-co-api.herokuapp.com/api/blockstack-subscribe'

export const NewsletterContext = React.createContext()

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

  doSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault() // to prevent page reload when user submits via hitting return
    }
    if (!this.state.isValid) {
      console.debug('not valid!')
      return null
    }

    this.loading()

    if (this.state.isValid && this.state.value) {
      try {
        const res = await this.submit(this.state.value)
        const data = await res.json()

        if (data.success) {
          this.success()
          return this.state.value
        } else {
          this.setError(data.error)
          return false
        }
      } catch (error) {
        this.setError(error.message)
        return false
      }
    } else if (this.state.error) {
      this.setState({ showError: true })
      return false
    }
  }

  render() {
    const props = {
      loading: this.state.loading,
      isValid: this.state.value !== '' && this.state.isValid,
      error: this.state.showError && this.state.error,
      success: this.state.success,
      doSubmit: this.props.onSubmit ? (e) => this.props.onSubmit(() => this.doSubmit(e)) : this.doSubmit,
      value: this.state.value,
      bind: {
        onChange: (e) => this.onChange(e)
      }
    }
    return <NewsletterContext.Provider value={props}>{this.props.children(props)}</NewsletterContext.Provider>
  }
}

export default NewsletterWrapper
