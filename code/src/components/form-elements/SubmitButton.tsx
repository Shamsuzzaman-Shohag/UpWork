import React from 'react';
import {
  useFormContext,
  UseFormReturn
} from 'react-hook-form';
import imgProcessing from 'assets/processing.svg';

type SubmitButtonProps = {
  label: string;
  isUseLoading?: boolean;
  loadingLabel?: string;
} & Record<string, any>;

type SubmitButtonControllerProps = SubmitButtonProps & {
  methods: UseFormReturn;
};

export const SubmitButtonController = React.memo(({
  label,
  isUseLoading,
  loadingLabel,
  methods,
  ...rest
}: SubmitButtonControllerProps) => {
  // console.log("Submit Button Rendered");
  // console.log('methods :>> ', methods.control);

  const disabled = rest?.disabled ?? false;
  const innerRef = rest?.innerRef;
  const successClassName = rest?.successClassName ?? "btn btn-info solid";

  delete rest?.disabled;
  delete rest?.ref;
  delete rest?.innerRef;
  delete rest?.successClassName;

  return (
    <button
      type="submit"
      className={`${isUseLoading ? "btn btn-info loader-button" : successClassName} ${rest?.className ?? ""}`}
      disabled={disabled || (isUseLoading && methods.formState.isSubmitting)}
      onClick={() => { console.log({ methods, values: methods.getValues(), errors: methods.formState.errors }); }}
      ref={innerRef}
    >
      {
        isUseLoading &&
        methods.formState.isSubmitting
        && <img src={imgProcessing} alt="" />
      }
      {
        !isUseLoading
          ? label
          : methods.formState.isSubmitting
            ? loadingLabel
            : label
      }
    </button>
  );
},
  (prevProps, nextProps) => {
    return (
      prevProps.methods.formState.isSubmitting === nextProps.methods.formState.isSubmitting &&
      prevProps?.label === nextProps?.label &&
      prevProps?.className === nextProps?.className &&
      (prevProps?.disabled ?? false) === (nextProps?.disabled ?? false)
    );
  }
);

export const SubmitButton = ({ label, isUseLoading = false, loadingLabel = label, ...rest }: SubmitButtonProps) => {
  const methods = useFormContext();

  return (
    <SubmitButtonController
      label={label}
      isUseLoading={isUseLoading}
      loadingLabel={loadingLabel}
      methods={methods}
      {...rest}
    />
  );
};

export default SubmitButton;