import React, { useState } from 'react';
import {
  Controller,
  useFormContext,
  UseFormReturn
} from 'react-hook-form';
import {
  Select as DefaultSelect,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  styled,
  ListSubheader
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { checkAreEqual } from 'libs/Helpers';
import { TypeCommonDropdownOption } from 'types/Common.types';

type SelectProps<T> = {
  name: string;
  label: string;
  options: T[];
  required?: boolean;
  placeholder?: string | null;
} & Record<string, any>;

type SelectControllerProps<T> = SelectProps<T> & {
  methods: UseFormReturn;
};

export const SelectController = React.memo(<T extends TypeCommonDropdownOption>
  ({ name, label, options, methods, ...rest }: SelectControllerProps<T>) => {

  const [onFocus, setOnFocus] = useState(false);
  const onChange = rest?.onChange ?? (() => null);
  const isWithOptGroup = !!((options ?? []).find(x => x.isSelectable != null && !x.isSelectable));

  // console.log(((options ?? []).find(x => x.isSelectable != null && x.isSelectable)));
  // console.log({ isDirty: methods.formState.dirtyFields[name] });

  const required = rest?.required ?? false;
  const isCustomField = rest?.isCustomField;

  delete rest?.onChange;
  delete rest?.required;
  delete rest?.isCustomField;

  const placeholder = rest?.placeholder;
  const placeholderMenuItem = placeholder !== null
    ? <MenuItem key="-1" value={""}>
      <em>{`${placeholder ?? "Select..."}`}</em>
    </MenuItem >
    : null;

  delete rest?.placeholder;

  const id = Math.random();

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => (
        <>
          <FormControl
            fullWidth
            required={required}
            // done double check intentionally to maintain validation for both simple field name and nested field name like 'customField.ANYNAMELIKEGUID'
            error={
              isCustomField
                ? !!methods.getFieldState(name).error
                : !!methods.formState.errors[name]
            }
            margin='dense'
          >
            <StyledInputLabel
              filled={rest.displayEmpty}
              shrink={rest.displayEmpty}
              id={`${id}-label`}>
              {(!onFocus && placeholder && !rest.displayEmpty && !field.value) ? placeholder : label}
              {/* {label} */}
            </StyledInputLabel>
            <StyledSelect
              labelId={`${id}-label`}
              name={name}
              value={field.value}
              onChange={async (event) => {
                field.onChange(event);
                // console.log('event :>> ', event);
                await onChange();
              }}
              onFocus={() => {
                setOnFocus(true);
              }}
              onBlur={() => {
                field.onBlur();
                setOnFocus(false);
              }}
              inputRef={field.ref}
              input={<OutlinedInput notched={rest.displayEmpty} label={label} />}
              IconComponent={rest?.disabled ? undefined : KeyboardArrowDown}
              {...{
                ...rest,
                placeholder: rest.placeholder === null ? undefined : rest.placeholder
              }}
            >
              {placeholderMenuItem}
              {
                (options ?? []).map((x, index) => (x.isSelectable != null && !x.isSelectable)
                  ? <ListSubheader key={index} className="select-opt-group">
                    {x.text}
                  </ListSubheader>
                  : <MenuItem key={index} value={x.value} className={`${isWithOptGroup ? "select-with-opt-group" : ""}`}>
                    {x.text}
                  </MenuItem>
                )
              }
            </StyledSelect>
          </FormControl>
          {
            (
              isCustomField
                ? !!methods.getFieldState(name).error
                : !!methods.formState.errors[name]
            ) &&
            <FormHelperText error>
              <>{
                isCustomField
                  ? (methods.getFieldState(name).error?.message ?? "")
                  : (methods.formState.errors[name]?.message ?? "")
              }</>
            </FormHelperText>
          }
        </>
      )}
    />
  );
},
  (prevProps, nextProps) => {
    const name: string = prevProps.name;

    return (
      // (prevProps.methods.getFieldState(name).error?.message ?? '') === (nextProps.methods.getFieldState(name).error?.message ?? '') &&
      (
        prevProps.isCustomField
          ? (prevProps.methods.getFieldState(name).error ?? "") === (nextProps.methods.getFieldState(name).error ?? "")
          : (prevProps.methods.formState?.errors[name]?.message ?? "") === (nextProps.methods.formState?.errors[name]?.message ?? "")
      ) &&
      checkAreEqual(prevProps.options, nextProps.options) &&
      (prevProps?.isCustomField ?? false) === (nextProps?.isCustomField ?? false) &&
      (prevProps?.required ?? false) === (nextProps?.required ?? false) &&
      (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false) &&
      (prevProps?.methods.formState.dirtyFields[name] ?? false) === (nextProps?.methods.formState.dirtyFields[name] ?? false)
    );
  }
);

export const StyledInputLabel = styled(InputLabel)(() => ({
  '&:not(.MuiInputLabel-shrink)': {
    lineHeight: 1.2
  },
  '&.Mui-focused': {
    color: 'var(--agency-theme-color-primary)'
  },
  '&.Mui-focused.Mui-error': {
    color: 'var(--color-danger)'
  },
  '&.MuiFormLabel-filled.Mui-error': {
    color: 'var(--color-danger)'
  },
  '&.MuiFormLabel-filled.Mui-disabled': {
    color: 'var(--agency-theme-color-secondary)'
  },
  '&.MuiFormLabel-filled.Mui-disabled.Mui-error': {
    color: 'var(--color-danger)'
  },
  '&.Mui-focused.MuiFormLabel-filled.Mui-error': {
    color: 'var(--color-danger)'
  },
  '&.MuiFormLabel-filled': {
    color: 'var(--agency-theme-color-secondary)'
  },
  '&.Mui-focused.MuiFormLabel-filled': {
    color: 'var(--agency-theme-color-primary)'
  }
}));

export const StyledSelect = styled(DefaultSelect)(() => ({
  '& fieldset': {
    border: '2px solid',
    borderColor: 'var(--agency-theme-color-secondary)',
    '& legend': {
      width: 'auto'
    }
  },
  '&:hover fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--agency-theme-color-secondary)'
  },
  '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--agency-theme-color-primary)'
  },
  '&.Mui-focused.Mui-error fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: "var(--color-danger)"
  },
  '&.Mui-disabled .MuiSelect-select.MuiSelect-outlined.Mui-disabled': {
    color: '#000',
    "WebkitTextFillColor": "#000",
    zIndex: "1"
  },
  '&.Mui-disabled fieldset.MuiOutlinedInput-notchedOutline': {
    backgroundColor: "var(--agency-theme-color-secondary-light)",
    color: '#000',
    borderColor: 'var(--agency-theme-color-secondary)'
  },
  '&.Mui-disabled:hover fieldset.MuiOutlinedInput-notchedOutline': {
    backgroundColor: "var(--agency-theme-color-secondary-light)",
    color: '#000',
    borderColor: 'var(--agency-theme-color-secondary)'
  },
  '&.Mui-disabled.Mui-error fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: "var(--color-danger)"
  },
  '&.Mui-error:hover fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-danger)'
  },
  '&.Mui-disabled.Mui-error:hover fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-danger)'
  },
  '& .MuiSelect-select': {
    padding: '13.5px 15px'
  }
}));

export const Select = <T extends { value: any; text: string }>({ name, label, options, ...rest }: SelectProps<T>) => {
  const methods = useFormContext();

  return (
    <SelectController
      name={name}
      label={label}
      options={options}
      methods={methods}
      {...rest}
    />
  );
};

export default Select;