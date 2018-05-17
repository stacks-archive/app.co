import _ from 'lodash';

const colorHexFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  return colour;
};

const truncate = (str, options) => {
  const defaults = {
    after: '...',
    length: 50,
  };

  const opts = _.defaults(options, defaults);

  if (str.length > opts.length) {
    return str.slice(0, opts.length - opts.after.length) + opts.after;
  }
  return str;
};

export { colorHexFromString, truncate };
