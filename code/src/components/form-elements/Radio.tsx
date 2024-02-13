import React from 'react';
import {
  Controller,
  useFormContext,
  UseFormReturn
} from 'react-hook-form';
import {
  Radio as DefaultRadio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { green } from '@mui/material/colors';

type RadioProps = {
  name: string;
  label?: string | React.ReactNode;
  labelPlacement?: "start" | "end" | "top" | "bottom";
  group: { value: string, label: string }[];
} & Record<string, any>;

type RadioControllerProps = RadioProps & {
  methods: UseFormReturn;
};

export const RadioController = React.memo(({ name, label, labelPlacement, group, methods, ...rest }: RadioControllerProps) => {

  const onChange = rest.onChange ?? (() => null);
  const row = rest.row ?? true;
  delete rest?.onChange;
  delete rest?.row;

  return (
    <FormControl className='radio-control'>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => {
          const groups = group.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.value}
              label={item.label}
              labelPlacement={labelPlacement}
              control={
                <DefaultRadio
                  onChange={async (event) => {
                    field.onChange(event);
                    await onChange();
                  }}
                  {...rest}
                  sx={{
                    color: "var(--color-secondary)",
                    '&.Mui-checked': {
                      color: green[600]
                    }
                  }}
                />
              }
            />
          ));

          return (
            <RadioGroup
              row={row}
              {...field}
            >
              {groups}
            </RadioGroup>
          );
        }}
      />
      {
        !!methods.formState.errors[name] &&
        <FormHelperText error>
          <>{methods.formState.errors[name] ? methods.formState.errors[name]?.message : ''}</>
        </FormHelperText>
      }
    </FormControl>
  );
},
  (prevProps, nextProps) => {
    const name: string = prevProps.name;
    return (nextProps.methods.control._defaultValues[name] ?? "") === "" ? false : true &&
      (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false);
  }
);

export const Radio = ({ name, label = "", labelPlacement = "end", group, ...rest }: RadioProps) => {
  const methods = useFormContext();

  return (
    <RadioController
      name={name}
      label={label}
      labelPlacement={labelPlacement}
      group={group}
      methods={methods}
      {...rest}
    />
  );
};

export default Radio;