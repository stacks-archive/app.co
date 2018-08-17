import * as React from 'react'
import { Flex, Box } from '@components/mining'
import { Type } from '@components/typography'
import Observer from 'react-intersection-observer'
import { Spring, animated, config } from 'react-spring'

import styled from 'styled-components'


const HeaderType = (props) => <Type.h3 color="white" fontSize="23px" fontWeight={300} {...props} />
const Heading = (props) => <Type.h3 color="white" fontSize={[4, 5]} textAlign="center" fontWeight={200} {...props} />
const SubHeading = (props) => (
  <Type.h4 color="#11A9BC" fontSize="19px" lineHeight={1.5} textAlign="center" fontWeight={400} {...props} />
)
const Section = (props) => <Flex alignItems="center" justifyContent="center" py={4} px={3} {...props} />

const Watch = ({ top, ...props }) => {
  const unit = 40
  return (
    <Observer threshold={0.2} triggerOnce>
      {({ inView, ref }) => (
        <Spring
          config={{ tension: 140, friction: 42 }}
          native
          delay={top ? 0 : 200}
          from={{ opacity: 0, y: unit }}
          to={{ opacity: inView ? 1 : 0, y: inView ? 0 : unit }}
        >
          {({ y, ...styles }) => (
            <animated.div
              style={{
                transform: y.interpolate((amount) => `translate3d(0,${top ? `-${amount}` : amount}px,0)`),
                ...styles
              }}
            >
              <div ref={ref}>
                <Box {...props} />
              </div>
            </animated.div>
          )}
        </Spring>
      )}
    </Observer>
  )
}

export { HeaderType, Section, Heading, SubHeading, Watch, Input }
