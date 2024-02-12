import React from 'react';
import {
  Controller,
  useFormContext,
  UseFormReturn
} from 'react-hook-form';
import {
  Checkbox as DefaultCheckBox,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { CheckboxProps as DefaultCheckBoxProps } from '@mui/material/Checkbox';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlankOutlined
} from '@mui/icons-material';
import {
  green,
  grey
} from '@mui/material/colors';

type CheckBoxProps = {
  name: string;
  label?: string;
  labelPlacement?: "start" | "end" | "top" | "bottom";
} & Record<string, any>;

type CheckBoxControllerProps = CheckBoxProps & {
  methods: UseFormReturn;
};

export const CheckBoxController = React.memo(({ name, label, labelPlacement, methods, ...rest }: CheckBoxControllerProps) => {

  const onChange = rest?.onChange ?? (() => null);
  const formControlClassName = rest?.className ?? "";

  delete rest?.onChange;
  delete rest?.className;

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => (
        <>
          <FormControlLabel
            className={formControlClassName}
            control={
              <CustomCheckBox
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
            !!methods.getFieldState(name).error &&
            <FormHelperText error>
              <>{methods.getFieldState(name).error?.message ?? ''}</>
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
      (prevProps.methods.getFieldState(name).error?.message ?? '') === (nextProps.methods.getFieldState(name).error?.message ?? '') &&
      (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false)
    );
  }
);

const CustomCheckBox = (props: DefaultCheckBoxProps) => {
  const icon = <CheckBoxOutlineBlankOutlined fontSize='large' style={{ color: props.disabled ? grey[500] : "var(--agency-theme-color-secondary)" }} />;
  const checkedIcon = <CheckBoxIcon fontSize='large' style={{ color: props.disabled ? grey[500] : green[500] }} />;
  return (
    <DefaultCheckBox
      color="default"
      icon={icon}
      checkedIcon={checkedIcon}
      {...props}
    />
  );
};

export const CheckBox = ({ name, label = "", labelPlacement = "end", ...rest }: CheckBoxProps) => {
  const methods = useFormContext();

  return (
    <CheckBoxController
      name={name}
      label={label}
      labelPlacement={labelPlacement}
      methods={methods}
      {...rest}
    />
  );
};

export default CheckBox;