import React from 'react';
import {
  useFormContext,
  UseFormReturn,
  Controller
} from 'react-hook-form';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as DefaultDatePicker } from '@mui/x-date-pickers/DatePicker';
import { StyledTextField } from './Input';

type SingleDatePickerProps = {
  name: string;
  label: string;
} & Record<string, any>;

type SingleDatePickerControllerProps = SingleDatePickerProps & {
  methods: UseFormReturn;
};

export const SingleDatePickerController = React.memo(({ name, label, methods, ...rest }: SingleDatePickerControllerProps) => {
  const onChange = rest.onChange;
  const required = rest?.required ?? false;
  const inputParams = rest?.inputParams ?? {};
  const datePickerInputFormat = rest?.inputFormat ?? "dd/MM/yyyy";

  delete rest?.onChange;
  delete rest?.required;
  delete rest?.inputParams;

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => {
        // console.log(`field`, field);
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DefaultDatePicker
              label={label}
              value={field.value}
              // value={field.value != null ? formatDateWithoutTimePart(field.value) : null}
              // showTodayButton={false}
              // value={
              //   field.value != null
              //     /* ? field.value.toString() !== "Invalid Date" */
              //     ? checkIsValidDate(field.value as Date)
              //       ? formatDateWithoutTimePart(field.value)
              //       : field.value
              //     : null
              // }
              onChange={async (event, context) => {
                // console.log("datePicker event", { context });

                // let date = event ?? null;

                // if (date && checkIsValidDate(date)) {
                //   date = formatDateWithoutTimePart(date);

                //   field.onChange(event ?? null);

                //   if (onChange) {
                //     await onChange();
                //   }
                // }

                // console.log("date", { date });
                // const date = event ? formatDateWithoutTimePart(event) : undefined;
                // const date = event && checkIsValidDate(event as Date) ? formatDateWithoutTimePart(event) : undefined;

                field.onChange(event ?? null);

                if (onChange) {
                  await onChange();
                }
              }}
              inputRef={field.ref}
              {...rest}
              inputFormat={datePickerInputFormat}
              mask="__/__/____"
              renderInput={(params) => {
                return (
                  <StyledTextField
                    fullWidth
                    required={required}
                    margin="dense"
                    {...params}
                    // error={!!methods.formState.errors[name]}
                    // helperText={methods.formState.errors[name] ? methods.formState.errors[name]?.message : ''}
                    error={!!methods.getFieldState(name).error}
                    helperText={<>{methods.getFieldState(name).error?.message ?? ''}</>}
                  />
                );
                // return (
                //   <StyledTextField
                //     fullWidth
                //     required={required}
                //     margin="dense"
                //     {...params}
                //     inputProps={{
                //       ...params.inputProps ?? {},
                //       value: field.value != null ? params?.inputProps?.value ?? "" : ""
                //     }}
                //     error={!!methods.formState.errors[name]}
                //     helperText={methods.formState.errors[name] ? methods.formState.errors[name].message : ''}
                //   />
                // );
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
},
  (prevProps, nextProps) => {
    const name: string = prevProps.name;

    return (
      (prevProps.methods.getFieldState(name).error?.message ?? '') === (nextProps.methods.getFieldState(name).error?.message ?? '') &&
      (prevProps?.required ?? false) === (nextProps?.required ?? false) &&
      (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false)
    );
  }
);

export const SingleDatePicker = ({ name, label, ...rest }: SingleDatePickerProps) => {
  const methods = useFormContext();

  return (
    <SingleDatePickerController
      name={name}
      label={label}
      methods={methods}
      {...rest}
    />
  );
};

export default SingleDatePicker;