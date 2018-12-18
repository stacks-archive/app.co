import React from 'react'
import { Box, Input, Flex, Type } from 'blockstack-ui'
import { ArrowIcon } from '@components/mining/svg'
import NewsletterWrapper from './container'

const Button = ({ disabled, ...rest }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    color="blue"
    position="absolute"
    zIndex={100}
    right={0}
    height="100%"
    px={5}
    opacity={disabled ? 0.5 : 1}
    {...rest}
  >
    <ArrowIcon />
  </Flex>
)

const Overlay = ({ label = 'Processing...', ...rest }) => (
  <Box
    position="absolute"
    px={5}
    left={'10px'}
    top={'15px'}
    bg={'white'}
    width={'calc(100% - 20px)'}
    zIndex="99999"
    style={{ whiteSpace: 'nowrap' }}
    textAlign="center"
    {...rest}
  >
    <Type style={{ whiteSpace: 'nowrap' }} color="blue" fontFamily="brand">
      {label}
    </Type>
  </Box>
)

const InputComponent = ({
  loading,
  hideSuccess,
  hideButton,
  success,
  doSubmit,
  border,
  variant,
  placeholder,
  bind,
  isValid,
  error,
  value,
  ...rest
}) => (
  <Box py={5} width={[1]} {...rest}>
    <Box position="relative">
      {hideButton ? null : <Button cursor={isValid ? 'pointer' : undefined} disabled={!isValid} onClick={doSubmit} />}
      {loading ? <Overlay /> : null}
      {!hideSuccess && success ? <Overlay label="Thanks for Subscribing!" /> : null}
      <form onSubmit={doSubmit}>
        <Input
          width={[1]}
          border={border}
          variant={variant}
          placeholder={placeholder}
          disabled={success}
          type="email"
          px={undefined}
          pl={5}
          pr={!hideButton ? '62px' : 5}
          {...bind}
        />
      </form>
    </Box>
  </Box>
)
const Newsletter = ({
  placeholder = 'Subscribe for updates',
  hideButton,
  hideSuccess,
  variant = 'marketing',
  border = '2px solid',
  children,
  list = 'e36d5dc9',
  source: SOURCE = 'app.co starter kit',
  onSubmit,
  ...props
}) => (
  <NewsletterWrapper onSubmit={onSubmit} list={list} SOURCE={SOURCE}>
    {({ bind, isValid, loading, error, success, doSubmit, value }) => {
      const inputProps = {
        value,
        loading,
        hideSuccess,
        hideButton,
        success,
        doSubmit,
        border,
        variant,
        placeholder,
        bind,
        isValid,
        error,
        ...props
      }
      return (
        <>
          <InputComponent {...inputProps} />
          {children}
        </>
      )
    }}
  </NewsletterWrapper>
)

export { Newsletter }
