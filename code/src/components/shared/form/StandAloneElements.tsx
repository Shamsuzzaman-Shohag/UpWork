import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Checkbox,
  Radio,
  RadioGroup,
  InputAdornment,
  FormHelperText,
  TextFieldProps,
  InputProps,
  AutocompleteChangeReason,
  createFilterOptions,
  Autocomplete
} from "@mui/material";
import {
  Cancel,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlankOutlined,
  Clear,
  Info,
  KeyboardArrowDown,
  OpenInNew
} from "@mui/icons-material";
import {
  green,
  grey
} from "@mui/material/colors";
import { StyledInputLabel, StyledSelect } from "./Select";
import { StyledSwitch } from "./Switch";

type StandAloneSelectProps<T> = {
  value: string;
  label?: string;
  options: T[];
  placeholder?: string;
  containerClassName?: string;
  onChange: (value: string) => Promise<void> | void;
} & Record<string, any>;

type StandAloneCheckBoxProps = {
  className?: string;
  label?: string;
  labelPlacement?: "start" | "end" | "top" | "bottom";
  value?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void | Promise<void>;
};

export const StandAloneSelect = React.memo(<T extends { value: any; text: string }>({
  value,
  label,
  options,
  placeholder = "",
  onChange,
  containerClassName,
  ...rest
}: StandAloneSelectProps<T>) => {
  const [localValue, setLocalValue] = useState("");
  const required = rest?.required ?? false;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  delete rest?.required;

  const placeholderMenuItem = placeholder !== ""
    ? <MenuItem key="-1" value="">
      <em>{`${placeholder}`}</em>
    </MenuItem >
    : null;

  const id = Math.random();

  return (
    <FormControl
      fullWidth
      margin='dense'
      className={containerClassName}
      required={required}
    >
      {
        label &&
        <StyledInputLabel id={`${id}-label`}>{label}</StyledInputLabel>
      }

      <StyledSelect
        labelId={`${id}-label`}
        value={localValue}
        onChange={async (event: any) => {
          const updatedValue = (event.target?.value ?? event.currentTarget.id ?? "").toString();
          setLocalValue(updatedValue);
          await onChange(updatedValue);
        }}
        input={<OutlinedInput label={label} />}
        IconComponent={KeyboardArrowDown}
        {...rest}
      >
        {placeholderMenuItem}
        {
          (options ?? []).map((item, index) =>
            <MenuItem key={index} value={item.value} >
              {item.text}
            </MenuItem>
          )
        }
      </StyledSelect>
    </FormControl>
  );
});

export const StandAloneCheckBox = React.memo(({ className, label, labelPlacement = "end", value, disabled, onChange }: StandAloneCheckBoxProps) => {
  const [localValue, setLocalValue] = useState(false);
  const icon = <CheckBoxOutlineBlankOutlined fontSize='large' style={{ color: "var(--agency-theme-color-secondary)" }} />;
  const checkedIcon = <CheckBoxIcon fontSize='large' style={{ color: disabled ? grey[500] : green[500] }} />;

  // console.log({ value });

  return (
    <FormControlLabel
      className={className}
      disabled={disabled}
      control={
        <Checkbox
          color="default"
          checked={value == null ? localValue === true : value}
          icon={icon}
          checkedIcon={checkedIcon}
          onChange={async (event) => {
            setLocalValue(event.target.checked);

            if (onChange) {
              await onChange(event.target.checked);
            }
          }}
        />
      }
      label={label ?? ""}
      labelPlacement={labelPlacement}
    />
  );
}/* ,
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value
    );
  } */
);

export const StandAloneSwitch = React.memo(({ className, label, labelPlacement = "end", onChange }: StandAloneCheckBoxProps) => {
  return (
    <FormControlLabel
      className={className ?? ""}
      control={
        <StyledSwitch
          onChange={async (event) => {
            if (onChange) {
              await onChange(event.target.checked);
            }
          }}
        />
      }
      label={label ?? ""}
      labelPlacement={labelPlacement}
    />
  );
});