import _ from 'lodash';
import React from 'react';
import Select from '@atlaskit/select';

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

const outboundLink = (app) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'outgoing_click', {
      event_label: app.name,
      event_category: 'Apps',
      app_name: app.name,
      app_id: app.id,
      url: app.website,
    });
  }
  window.open(app.website, '_blank');
};

const enumSelect = (enums, placeholder, props = {}) => {
  const options = _.map(_.keys(enums), (opt) => ({ label: opt, value: opt }));
  const onChange = (option) => {
    props.onChange({ [props.apiAttr || placeholder.toLowerCase()]: option.value });
  };
  const value = props.value ? { label: props.value, value: props.value } : null;
  return (
    <div>
      <h3>{placeholder}</h3>
      <br />
      <Select
        options={options}
        placeholder={placeholder}
        className="react-select"
        onChange={onChange}
        isSearchable={false}
        value={value}
        menuPlacement={props.menuPlacement || 'bottom'}
      />
      <br />
    </div>
  );
};

const appRoute = (app) => {
  const slug = app.Slugs[0];
  return `/app/${slug ? slug.value : app.id}`;
};

const appStatuses = [
  { label: 'Pending Audit', value: 'pending_audit' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Accepted', value: 'accepted' },
];

const appStatusFromValue = (value) => _.find(appStatuses, (status) => status.value === value);

const capitalize = (lower) => lower.charAt(0).toUpperCase() + lower.substr(1);

export {
  colorHexFromString,
  truncate,
  outboundLink,
  enumSelect,
  appStatuses,
  appStatusFromValue,
  appRoute,
  capitalize,
};
