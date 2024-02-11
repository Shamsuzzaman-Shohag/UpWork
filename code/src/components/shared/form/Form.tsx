import React from 'react';
import Joi, { AnySchema, DateSchema } from 'joi';
import { JoiPasswordExtend, joiPasswordExtendCore } from 'joi-password';
import { FormProvider as HookFormProvider } from 'react-hook-form';
import { Input as FormInput } from './Input';
import { InputWithIcon as FormInputWithIcon } from './InputWithIcon';
import { Select as FormSelect } from './Select';
import { SingleDatePicker as FormSingleDatePicker } from './SingleDatePicker';
import { CheckBox as FormCheckBox } from './CheckBox';
import { Switch as FormSwitch } from './Switch';
import { Radio as FormRadio } from './Radio';
import { SubmitButton as FormSubmitButton } from './SubmitButton';
import { ResetButton as FormResetButton } from './ResetButton';
import { checkIsArray, checkIsValidDate, formatDateWithoutTimePart, getFileExtension } from 'libs/Helpers';

// https://stackoverflow.com/questions/47618273/how-to-extend-a-module-from-npm-using-typescript/47684595#47684595
// interface ExtendedNumberSchema extends Joi.NumberSchema {
//   round(): this;
//   dividable(num: number): this;
// }

// interface ExtendedJoi extends Joi.Root {
//   number(): ExtendedNumberSchema;
// }

interface IJFileSchema extends Joi.AnySchema {
  jAllowedExtensions(types: string[]): this;
}

interface IExtendedDateSchema extends Joi.DateSchema {
  fourDigitYear(): this;

  /**
   * Converts input date to local date without time part.
   */
  dateOnly(): this;
}

interface IExtendedJoi extends Joi.Root {
  /**
   * Generates a schema object that matches a string data type with no empty strings allowed.
   */
  jString(): Joi.StringSchema;

  /**
   * Generates a schema object that matches a file data type.
   */
  jFile(): IJFileSchema;

  date<TSchema = IExtendedDateSchema>(): DateSchema<TSchema>;
  // date(): IExtendedDateSchema;
}

type FormProviderProps = {
  methods: any;
  onSubmit: (data: any) => any;
  children: React.ReactNode
  className?: string;
};

const FormProvider = ({ methods, onSubmit, className, children }: FormProviderProps) => {
  return (
    <HookFormProvider {...methods}>
      <form
        noValidate
        className={className ?? ""}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {children}
      </form>
    </HookFormProvider>
  );
};

// https://stackoverflow.com/questions/66054067/how-do-i-add-custom-validators-in-joi-17/66061195#66061195
const extensions: Array<Joi.Extension | Joi.ExtensionFactory> = [
  joi => ({
    type: 'jString',
    base: joi.string().empty("")
  }),
  joi => ({
    type: 'date',
    base: joi.date(),
    messages: {
      'date.fourDigitYear': "{{#label}} is not of valid format 'DD/MM/YYYY'"
    },
    prepare(value, helpers) {
      if (helpers.schema.$_getFlag("isDateOnly")) {
        if (!value || !checkIsValidDate(value)) {
          return;
        } else {
          return { value: formatDateWithoutTimePart(value) };
        }
      }

      if (value && value.valueOf() < new Date("999-12-31 23:59:59.999").valueOf()) {
        return { value, errors: helpers.error('date.fourDigitYear') };
      }

      return { value };
    },
    coerce: (value, helpers) => {
      if (helpers.schema.$_getFlag("isDateOnly")) {
        if (value && checkIsValidDate(value)) {
          return { value: formatDateWithoutTimePart(value) };
        }
      }

      return { value };
    },
    rules: {
      minYear: {
        method() {
          return this.$_addRule('fourDigitYear');
        },
        validate(value, helpers, args, options) {
          if (value && value.valueOf() < new Date("999-12-31 23:59:59.999").valueOf()) {
            return { value, errors: helpers.error('date.fourDigitYear') };
          }
        }
      },
      dateOnly: {
        method: function () {
          return this.$_setFlag("isDateOnly", true);
        }
      }
    }
  }),
  joi => ({
    type: 'jFile',
    base: joi.any().empty(null),
    messages: {
      'jFile.base': '{{#label}} must be a file',
      'jFile.jAllowedExtensions': '{{#label}} must be one of these extensions {{#extensions}}'
    },
    validate: (value, helpers) => {

      // Base validation regardless of the rules applied

      // console.log('value :>> ', value);
      // console.log('value instanceof File :>> ', value instanceof File);
      if (!(value instanceof File)) {
        return { value, errors: helpers.error('jFile.base') };
      }
    },
    rules: {
      jAllowedExtensions: {
        alias: "jExtensions",
        method: function (extensions) {
          return this.$_addRule({ name: 'jAllowedExtensions', args: { extensions } });
        },
        args: [
          {
            name: 'extensions',
            ref: true,
            // assert: (value) => typeof value === 'number' && !isNaN(value),
            assert: value => checkIsArray(value, "string"),
            message: 'must be an array of string'
          }
        ],
        validate: (value, helpers, args, options) => {

          // console.log('value :>> ', value);
          const extension = getFileExtension(value.name);

          // Value is valid
          if (args.extensions.map((x: string) => x.toLocaleLowerCase()).includes(extension?.toLocaleLowerCase())) {
            return value;
          }

          return helpers.error('jFile.jAllowedExtensions', { extensions: args.extensions.join(", ") });
        }
      }
    }
  })
];

let extendedJoi = Joi;

extensions.forEach(extension =>
  extendedJoi = extendedJoi.extend(extension));

// https://joi.dev/api/?v=17.5.0#extensions
// let extendedJoi = Joi.extend((joi) => ({
//   type: 'jString',
//   base: joi.string().empty("")
// }));

// export const joi = Joi;

// export type joiSchema = Joi.SchemaLike | Joi.SchemaLike[] | undefined;
export type joiSchemaLike = Joi.SchemaLike;
export type joiStringSchema = Joi.StringSchema;
export type joiNumberSchema = Joi.NumberSchema;
export type joiBooleanSchema = Joi.BooleanSchema;
export type joiDateSchema = Joi.DateSchema<IExtendedDateSchema>;
export const joi = extendedJoi as IExtendedJoi;
export const joiPassword = joi.extend(joiPasswordExtendCore) as JoiPasswordExtend;
export const Input = FormInput;
export const InputWithIcon = FormInputWithIcon;
export const Select = FormSelect;
export const SingleDatePicker = FormSingleDatePicker;
export const CheckBox = FormCheckBox;
export const Switch = FormSwitch;
export const Radio = FormRadio;
export const SubmitButton = FormSubmitButton;
export const ResetButton = FormResetButton;
export const Form = React.memo(FormProvider);
