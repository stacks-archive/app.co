import sys from 'system-components';

export const Img = sys(
  {
    is: 'img',
    width: '48px',
    boxShadow:
      'rgba(20, 33, 68, 0.04) 0px 1px 5px 0px, rgba(20, 33, 68, 0.09) 0px 1px 6px 1px',
    borderRadius: 10,
  },
  {
    float: 'right',
    margin: '0 0 2em 2em',
  }
);

export const Description = sys(
  {
    is: 'p',
    display: 'block',
    opacity: 0.7,
    fontSize: '0.9em',
  },
  {
    lineHeight: '1.5em',
  }
);
