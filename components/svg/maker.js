import React from 'react';

export const CheckMarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <circle cx="10" cy="10" r="10" fill="#00A73E" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7.57 10.694l2.084 1.39 2.777-4.167"
    />
  </svg>
);

export const CrossMarkIcon = ({ width = 20, height = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 20 20"
    style={{ display: 'block' }}
  >
    <circle cx="10" cy="10" r="10" fill="#C1C3CC" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M8.586 10L5.765 7.178l1.414-1.414L10 8.585l2.821-2.82 1.414 1.414-2.82 2.82 2.82 2.822-1.414 1.414-2.82-2.821-2.822 2.822-1.415-1.415L8.586 10z"
      clipRule="evenodd"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 12 12"
  >
    <path
      fill="#BFBFC3"
      fillRule="evenodd"
      d="M4.586 6L0 1.413 1.415 0 6 4.585 10.584.001 12 1.415 7.414 5.999l4.585 4.585L10.585 12 6 7.414l-4.586 4.585L0 10.585l4.586-4.586z"
      clipRule="evenodd"
    />
  </svg>
);

export const ArrowDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="4"
    fill="none"
    viewBox="0 0 6 4"
  >
    <path
      fill="#A1A7B3"
      fillRule="evenodd"
      d="M3 4L0 0h6L3 4z"
      clipRule="evenodd"
    />
  </svg>
);
