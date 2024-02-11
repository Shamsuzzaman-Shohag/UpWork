import React, { ReactElement } from 'react';
import {
  Controller,
  useFormContext,
  UseFormReturn
} from 'react-hook-form';
import {
  InputAdornment,
  IconButton,
  SvgIcon
} from '@mui/material';
import { StyledTextField } from './Input';

type InputWithIconProps = {
  name: string;
  label: string;
  icon: ReactElement<typeof SvgIcon> | null;
  onIconClick: (event: React.MouseEvent<HTMLElement>) => void;
  isDisableIcon?: boolean;
} & Record<string, any>;

type InputWithIconControllerProps = InputWithIconProps & {
  methods: UseFormReturn;
};

export const InputWithIconController = React.memo(
  ({ name, label, icon, onIconClick, isDisableIcon, methods, ...rest }: InputWithIconControllerProps) => {
    // console.log("InputWithIcon", name);

    const onChange = rest.onChange ?? (() => null);
    delete rest?.onChange;

    const inputProps = {
      startAdornment: (
        rest?.type === "money"
          ? <InputAdornment position="start"><b>$</b></InputAdornment>
          : ""
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            name={name}
            onClick={async (event) => await onIconClick(event)}
            disabled={isDisableIcon || (rest?.disabled ?? false)}
          >
            {icon}
          </IconButton>
        </InputAdornment>
      )
    };

    return (
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <StyledTextField
            fullWidth
            margin="dense"
            autoComplete="off"
            className="no-spinner"
            label={label}
            value={field.value}
            onChange={async (event: any) => {
              field.onChange(event);
              await onChange();
            }}
            onBlur={field.onBlur}
            inputRef={field.ref}
            InputProps={inputProps}
            {...rest}
            error={!!methods.formState.errors[name]}
            helperText={<>{methods.formState.errors[name] ? methods.formState.errors[name]?.message : ''}</>}
          />
        )}
      />
    );
  },
  (prevProps, nextProps) => {
    const name: string = prevProps.name;

    return (
      prevProps.methods.formState.errors[name] === nextProps.methods.formState.errors[name] &&
      (prevProps?.required ?? false) === (nextProps?.required ?? false) &&
      (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false) &&
      (prevProps?.type ?? "text") === (nextProps?.type ?? "text") &&
      prevProps.icon === nextProps.icon &&
      prevProps.isDisableIcon === nextProps.isDisableIcon
    );
  }
);

export const InputWithIcon = ({ name, label, icon, onIconClick, isDisableIcon = false, ...rest }: InputWithIconProps) => {
  const methods = useFormContext();

  return (
    <InputWithIconController
      name={name}
      label={label}
      icon={icon}
      onIconClick={onIconClick}
      isDisableIcon={isDisableIcon}
      methods={methods}
      {...rest}
    />
  );
};

export default InputWithIcon;