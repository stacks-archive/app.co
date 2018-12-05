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
const Newsletter = (props) => (
  <NewsletterWrapper>
    {({ bind, isValid, loading, error, success, doSubmit }) => (
      <Box py={5} width={[1]} {...props}>
        <Box position="relative">
          <Button cursor={isValid ? 'pointer' : undefined} disabled={!isValid} onClick={doSubmit} />
          {loading ? <Overlay /> : null}
          {success ? <Overlay label="Thanks for Subscribing!" /> : null}
          <form onSubmit={doSubmit}>
            <Input
              width={[1]}
              border="2px solid"
              variant="marketing"
              placeholder="Subscribe for updates"
              disabled={success}
              type="email"
              px={undefined}
              pl={5}
              pr={'62px'}
              {...bind}
            />
          </form>
        </Box>
      </Box>
    )}
  </NewsletterWrapper>
)

export { Newsletter }
