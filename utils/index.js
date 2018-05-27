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
  return (
    <div>
      <br />
      <Select
        options={options}
        placeholder={placeholder}
        className="react-select"
        onChange={onChange}
        isSearchable={false}
        // selectedValue={props.value}
        value={props.value}
        menuPlacement={props.menuPlacement || 'bottom'}
      />
      <br />
    </div>
  );
};

export { colorHexFromString, truncate, outboundLink, enumSelect };
