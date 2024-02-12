import {
  useForm,
  FieldValues,
  DefaultValues
} from 'react-hook-form';
import { ObjectSchema } from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

//#region React Hook Form override

type UseAppFormProps<T extends Record<string, any>> = {
  initialState: T;
  schema: ObjectSchema;
  shouldUnregister?: boolean;
};

export const useAppForm = <TFieldValues extends FieldValues>({ schema, initialState, shouldUnregister }: UseAppFormProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>({
    resolver: joiResolver(schema, {
      abortEarly: false,
      errors: { wrap: { label: '' } }
    }),
    defaultValues: initialState as DefaultValues<TFieldValues>,
    mode: "onChange",
    shouldUnregister: shouldUnregister ?? false
  });

  return methods;
};

//#endregion