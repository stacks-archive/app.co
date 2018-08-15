import * as React from 'react'

import { StyledCard } from '@components/mining/card/styled'

const Card = ({ ...rest }) => <StyledCard p={[3, 4]} {...rest} />

export { Card }
