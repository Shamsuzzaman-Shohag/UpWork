import React, { useEffect, useRef, useState } from 'react';
import {
  Controller,
  useFormContext,
  UseFormReturn
} from 'react-hook-form';
import {
  TextField,
  InputAdornment,
  styled
} from '@mui/material';
import { checkAreEqual } from 'libs/Helpers';

type TypeInputProps = {
  name: string;
  label: string;
  className?: string;
  inputProps?: Record<string, any>;
  required?: boolean;
} & Record<string, any>;

type InputControllerProps = TypeInputProps & {
  methods: UseFormReturn;
};

export const InputController = React.memo(({ name, label, methods, ...rest }: InputControllerProps) => {
  const [isOnFocus, setIsOnFocus] = useState(false);

  // console.log("Render Input: >> ", name);
  const onChange = rest.onChange ?? (() => null);
  const inputType = rest?.type;
  const restInputProps = rest?.inputProps ?? {};
  const externalRef = rest?.inputRef as React.RefObject<HTMLInputElement> ?? undefined;
  const isNumberTypeInput = ["number", "money", "percentage"].includes(inputType);

  delete rest?.onChange;
  delete rest?.inputProps;
  delete rest?.inputRef;

  const setInputAdornment = (value: any) => {
    return (inputType === "money" && (value !== "" || isOnFocus))
      ? <InputAdornment position="start"><b>$</b></InputAdornment>
      : (inputType === "percentage" && (value !== "" || isOnFocus))
        ? <InputAdornment position="start"><b>%</b></InputAdornment>
        : restInputProps.startAdornment;
  };

  let inputRef = useRef<HTMLInputElement>(null);
  if (externalRef) {
    inputRef = externalRef;
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onwheel = (e) => {
        // console.log("Wheel: ", e);
        e.preventDefault();
      };

      inputRef.current.onkeydown = (e) => {
        // console.log("onkeyup: ", e);
        if (["ArrowUp", "ArrowDown"].includes(e.key)) {
          // inputRef.current?.blur();
          e.preventDefault();
        }
      };
    }
  }, [inputRef.current]);

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field }) => {
        return (
          <StyledTextField
            fullWidth
            margin="dense"
            autoComplete="off"
            className="no-spinner"
            label={label}
            value={field.value}
            onChange={async (event) => {
              if (isNumberTypeInput) {
                const customEvent: Record<string, any> = {
                  ...event,
                  target: {
                    ...event.target,
                    value: event.target.value !== "" ? parseFloat(event.target.value) : ""
                  }
                };

                field.onChange(customEvent);
              } else {
                field.onChange(event);
              }

              await onChange();
            }}
            onFocus={() => setIsOnFocus(true)}
            onBlur={(e) => { setIsOnFocus(false); field.onBlur(); }}
            inputRef={field.ref}
            InputProps={{
              ...restInputProps,
              startAdornment: setInputAdornment(field.value),
              className: isNumberTypeInput ? "no-scroll" : undefined,
              inputProps: {
                ref: isNumberTypeInput ? inputRef : (externalRef ?? undefined)
              },
              value: typeof field.value === "boolean"
                ? field.value === true ? "Yes" : "No"
                : field.value ?? ""
            }}
            {...rest}
            type={isNumberTypeInput ? "number" : inputType}
            error={!!methods.formState.errors[name]}
            helperText={<>{methods.formState.errors[name]?.message ?? ""}</>}
          />
        );
      }}
    />
  );
},
  (prevProps, nextProps) => {
    const name: string = prevProps.name;

    // console.log('prevProps.methods.control._formValues :>> ', prevProps.methods.control._formValues);
    // console.log({
    //   p: prevProps.methods.formState?.errors[name],
    //   n: nextProps.methods.formState?.errors[name]
    // });

    return (
      (prevProps.methods.formState?.errors[name]?.message ?? "") === (nextProps.methods.formState?.errors[name]?.message ?? "") &&
      (prevProps?.required ?? false) === (nextProps?.required ?? false) &&
      (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false) &&
      checkAreEqual(prevProps?.inputProps, nextProps?.inputProps) &&
      (prevProps?.type ?? "text") === (nextProps?.type ?? "text")
    );
  }
);

export const StyledTextField = styled(TextField)({
  "& label": {
    fontSize: "14px"
  },
  // root: {
  '& label:not(.MuiInputLabel-shrink)': {
    lineHeight: 1.2
  },
  '& label.Mui-focused': {
    color: 'var(--color-primary)'
  },
  '& label.Mui-focused.Mui-error': {
    color: 'var(--color-danger)'
  },
  '& label.MuiFormLabel-filled.Mui-error': {
    color: 'var(--color-danger)'
  },
  '& label.MuiFormLabel-filled.Mui-disabled': {
    color: 'var(--color-secondary)'
  },
  '& label.MuiFormLabel-filled.Mui-disabled.Mui-error': {
    color: 'var(--color-danger)'
  },
  '& label.Mui-focused.MuiFormLabel-filled.Mui-error': {
    color: 'var(--color-danger)'
  },
  '& label.MuiFormLabel-filled': {
    color: 'var(--color-secondary)',
    lineHeight: "15px",
    marginTop: "1px"
  },
  '& label.Mui-focused.MuiFormLabel-filled': {
    color: 'var(--color-primary)'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid',
      borderColor: 'var(--color-secondary)',
      '& legend': {
        width: 'auto'
      }
    },
    '&.Mui-disabled': {
      backgroundColor: "var(--color-secondary-light)",
      color: '#000',
      borderColor: 'var(--color-secondary)'
    },
    '&.Mui-disabled fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--color-secondary)',
      color: '#000'
    },
    '&:hover fieldset': {
      borderColor: 'var(--color-secondary)'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-primary)'
    },
    '&.Mui-focused.Mui-error fieldset': {
      borderColor: "var(--color-danger)"
    },
    '&.Mui-disabled.Mui-error fieldset': {
      borderColor: "var(--color-danger)"
    },
    '&.Mui-error:hover fieldset': {
      borderColor: 'var(--color-danger)'
    },
    '&.Mui-disabled:hover fieldset': {
      borderColor: 'var(--color-secondary)'
    },
    '&.Mui-disabled.Mui-error:hover fieldset': {
      borderColor: 'var(--color-danger)'
    },
    '&.MuiInputBase-multiline': {
      paddingTop: '13.5px',
      paddingBottom: '13.5px'
    }
  },
  '& input': {
    paddingTop: '14px',
    paddingBottom: '14px',
    fontSize: "14px"
  },
  '& input.Mui-disabled': {
    "WebkitTextFillColor": "#000"
  }
  // }
});

export const Input = ({ name, label, ...rest }: TypeInputProps) => {
  const methods = useFormContext();

  return (
    <InputController
      name={name}
      label={label}
      methods={methods}
      {...rest}
    />
  );
};

export default Input;