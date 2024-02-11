import React from 'react';
import {
  useFormContext,
  UseFormReturn
} from 'react-hook-form';

type ResetButtonProps = {
  label?: string;
  callback?: () => void | Promise<void>;
} & Record<string, any>;

type ResetButtonControllerProps = ResetButtonProps & {
  methods: UseFormReturn;
};

export const ResetButtonController = React.memo(({ label, callback, methods, ...rest }: ResetButtonControllerProps) => {
  // console.log("Reset Button Rendered");

  //TODO: Disable using css class
  const disabled = rest?.disabled ?? false;
  const className = rest?.className;

  delete rest?.disabled;
  delete rest?.className;

  return (
    <span //******* Don't use button, reset will not work ********
      className={`btn btn-secondary ${className ?? ""}`}
      onClick={async () => {
        methods.reset();

        if (callback) {
          // console.log({ callback });
          await callback();
        }
      }}
      {...rest}
    >
      {label}
    </span>
  );
},
  (prevProps, nextProps) => {
    return (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false);
  }
);

export const ResetButton = ({ label = "Clear", callback, ...rest }: ResetButtonProps) => {
  const methods = useFormContext();

  return (
    <ResetButtonController
      label={label}
      callback={callback}
      methods={methods}
      {...rest}
    />
  );
};

export default ResetButton;