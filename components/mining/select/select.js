import React from 'react';
import ReactSelect from 'react-select';
import { theme } from 'blockstack-ui';

const { colors } = theme;

const selectStyles = ({ error }) => ({
  container: (styles, state) => ({
    ...styles,
    width: '100%',
  }),
  control: (styles, state) => ({
    ...styles,
    width: '100%',
    backgroundColor: String('white'),
    borderColor: `${error ? colors.red : colors.blue.mid} !important`,
    color: `${state.isFocused ? colors.blue.dark : colors.blue.mid} !important`,
    boxShadow: state.isFocused
      ? error
        ? theme.shadows.focused.error
        : theme.shadows.focused.light
      : 'none',
    ':hover': {
      borderColor: colors.blue.dark,
      color: colors.blue.dark,
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: 'transparent',
      fontFamily: theme.fonts.normal,
      color: String(colors.blue.dark),
      width: '100%',

      ':hover': {
        backgroundColor: String(colors.blue.light),
        color: `${String(colors.blue.dark)}`,
      },
    };
  },
  input: styles => ({
    ...styles,
    color: 'white',
    width: '100%',
  }),
  placeholder: styles => ({
    ...styles,
    color: 'currentColor',
  }),
  menu: styles => ({
    ...styles,
    backgroundColor: String('white'),
    border: `1px solid ${String(colors.blue.mid)} !important`,
    width: '100%',
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: `${String(colors.blue.dark)}`,
    width: '100%',
  }),
});

const SelectComponent = ({ ...rest }) => (
  <ReactSelect
    styles={selectStyles(rest)}
    style={{ width: '100%' }}
    theme={theme => ({
      ...theme,
      spacing: {
        ...theme.spacing,
        controlHeight: 48,
      },
      colors: {
        ...theme.colors,
        neutral20: colors.blue.light,
      },
    })}
    {...rest}
  />
);

export default SelectComponent;
