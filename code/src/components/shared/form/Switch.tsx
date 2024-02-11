import React from 'react';
import {
  Controller,
  useFormContext,
  UseFormReturn
} from 'react-hook-form';
import {
  Switch as DefaultSwitch,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import {
  green,
  lightGreen
} from '@mui/material/colors';
import { styled } from '@mui/material/styles';

type SwitchProps = {
  name: string;
  label?: string;
  labelPlacement?: "start" | "end" | "top" | "bottom";
} & Record<string, any>;

type SwitchControllerProps = SwitchProps & {
  methods: UseFormReturn;
};

export const SwitchController = React.memo(({ name, label, labelPlacement, methods, ...rest }: SwitchControllerProps) => {

  const onChange = rest.onChange ?? (() => null);
  delete rest?.onChange;

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => (
        <>
          <FormControlLabel
            control={
              <StyledSwitch
                checked={field.value}
                onChange={async (event) => {
                  field.onChange(event.target.checked);
                  await onChange();
                }}
                onBlur={field.onBlur}
                inputRef={field.ref}
                {...rest}
              />
            }
            label={label ?? ""}
            labelPlacement={labelPlacement}
          />
          {
            !!methods.formState.errors[name] &&
            <FormHelperText error>
              <>{methods.formState.errors[name] ? methods.formState.errors[name]?.message : ''}</>
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
      prevProps.methods.formState.errors[name] === nextProps.methods.formState.errors[name] &&
      (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false)
    );
  }
);

export const StyledSwitch = styled(DefaultSwitch)(() => ({
  '& .MuiSwitch-switchBase': {
    color: "#FAFAFA",
    '&.Mui-checked': {
      color: green[500],
      '& + .MuiSwitch-track': {
        backgroundColor: lightGreen[600]
      },
      '&.Mui-disabled':{
        color: green[200]
      }
    }
  },
  '& .MuiSwitch-track': {
    backgroundColor: lightGreen[600]
  }
}));

export const Switch = ({ name, label = "", labelPlacement = "end", ...rest }: SwitchProps) => {
  const methods = useFormContext();

  return (
    <SwitchController
      name={name}
      label={label}
      labelPlacement={labelPlacement}
      methods={methods}
      {...rest}
    />
  );
};

export default Switch;