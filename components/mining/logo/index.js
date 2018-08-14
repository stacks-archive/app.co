import * as React from 'react'
import { Box } from '@components/mining/index'

const AppCoLogo = ({ size = 50, ...rest }) => (
  <Box {...rest}>
    <svg width={size} height={size} viewBox={`0 0 50 50`} fill="none" style={{ display: 'block' }}>
      <rect width={size} height={size} fill="black" fillOpacity="0" />
      <path
        d="M0 9.78C0 6.2497 0 4.48455 0.71962 3.15086C1.27551 2.12063 2.12063 1.27551 3.15086 0.71962C4.48455 0 6.2497 0 9.78 0H40.22C43.7503 0 45.5154 0 46.8491 0.71962C47.8794 1.27551 48.7245 2.12063 49.2804 3.15086C50 4.48455 50 6.2497 50 9.78V40.22C50 43.7503 50 45.5154 49.2804 46.8491C48.7245 47.8794 47.8794 48.7245 46.8491 49.2804C45.5154 50 43.7503 50 40.22 50H9.78C6.2497 50 4.48455 50 3.15086 49.2804C2.12063 48.7245 1.27551 47.8794 0.71962 46.8491C0 45.5154 0 43.7503 0 40.22V9.78Z"
        fill="#212D37"
        stroke="#4C4C4C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 9L7.6795 39H42.3205L25 9ZM25 20.5L13.5 39H36L25 20.5Z"
        fill="white"
      />
      <path
        d="M30 35C30 37.7614 27.7614 40 25 40C22.2386 40 20 37.7614 20 35C20 32.2386 22.2386 30 25 30C27.7614 30 30 32.2386 30 35Z"
        fill="#EF6F6F"
      />
    </svg>
  </Box>
)

export { AppCoLogo }
