import React from 'react'
import { Flex, Box, Button, Field, Type } from 'blockstack-ui'

const Info = ({ display }) => {
  console.log('info!')
  return (
    <Flex style={{ display: display ? 'flex' : 'none' }}>
      <Box width={1} mt={0}>
        <Type fontSize={3} fontWeight={600} mb={3}>Useful Links:</Type>
        <Type mt={3} display="block" is="a" href="">SEC Participation Agreement</Type>
      </Box>
    </Flex>
  )
}

export default Info
