import React from 'react';
import { Flex, Box, Field } from 'blockstack-ui';
import { Select } from '@components/mining/select';

export const FormSection = ({
  state,
  fields,
  handleChange,
  errors,
  message,
  setState,
}) => (
  <>
    {fields.map(field => {
      if (field.type === 'radio') {
        if (!field.options || field.options.length !== 2) {
          console.log('Radio type fields need 2 options (true/false)');
          return null;
        }
        return (
          <React.Fragment key={`radio-${field.name}`}>
            <Field.LabelAdvanced
              pb={3}
              label={field.label}
              required={field.required}
              error={
                errors && field && errors[field.name] && errors[field.name]
              }
            />
            <Box pb={field.options.length ? 4 : 0}>
              {field.options.map(option => (
                <Flex
                  pb={3}
                  alignItems="center"
                  key={`radio-${field.name}-${option.value}`}
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    defaultChecked={
                      String(option.value) === state[field.name] || undefined
                    }
                    id={String(option.value)}
                    onChange={e => handleChange(e)(setState)}
                  />
                  <Field.Label
                    pb={0}
                    pl={2}
                    is="label"
                    htmlFor={String(option.value)}
                  >
                    {option.label}
                  </Field.Label>
                </Flex>
              ))}
            </Box>
          </React.Fragment>
        );
      }
      if (field.type === 'select') {
        const selectProps = { ...field };
        if (!!state[field.name]) {
          selectProps.defaultValue = {
            label: state[field.name],
            value: state[field.name],
          };
        }
        return (
          <React.Fragment key={`select-${field.name}`}>
            <Box pb={4}>
              <Field.LabelAdvanced
                required={field.required}
                hint={field.hint}
                message={field.message}
                label={field.label}
                error={
                  errors && field && errors[field.name] && errors[field.name]
                }
              />
              <Flex pb={3} alignItems="center">
                <Select
                  onChange={e =>
                    handleChange({
                      target: {
                        name: field.name,
                        value: e ? e.value : null,
                      },
                    })(setState)
                  }
                  error={
                    errors && field && errors[field.name] && errors[field.name]
                  }
                  isClearable
                  {...selectProps}
                />
              </Flex>
            </Box>
          </React.Fragment>
        );
      }
      if (field.type === 'checkbox') {
        return (
          <React.Fragment key={`checkbox-${field.name}`}>
            <Box pb={4}>
              <Flex pb={3} alignItems="center">
                <input
                  type="checkbox"
                  name={field.name}
                  id={field.name}
                  defaultChecked={!!state[field.name] || undefined}
                  onChange={e =>
                    handleChange({
                      persist: e.persist,
                      target: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    })(setState)
                  }
                />
                <Field.LabelAdvanced
                  labelProps={{
                    pb: !!(errors && field && errors[field.name]) ? 2 : 0,
                    htmlFor: field.name,
                  }}
                  pl={2}
                  required={field.required}
                  label={field.label}
                  error={errors && field && errors[field.name]}
                />
              </Flex>
              {field.message ? (
                <Field.Message maxWidth={400} lineHeight={1.5}>
                  {field.message}
                </Field.Message>
              ) : null}
            </Box>
          </React.Fragment>
        );
      }
      return (
        <Field
          noValidate="novalidate"
          onChange={e => handleChange(e)(setState)}
          key={`field-${field.name}`}
          defaultValue={state[field.name]}
          error={errors && field && errors[field.name] && errors[field.name]}
          {...field}
        />
      );
    })}
    {message ? <Box pb={4}>{message}</Box> : null}
  </>
);
