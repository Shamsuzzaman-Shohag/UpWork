import { TypedUseSelectorHook, useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { ObjectSchema } from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
// import type { RootState, AppDispatch } from 'types/Redux.types';
import { useEffect, useState, useCallback, useRef } from 'react';
// import { getLocalStorageItem, setLocalStorageItem } from './Helpers';
// import { LOCAL_STORAGE_KEY } from './Enums';
import { TypeTableRenderValue } from 'types/Shared.types';

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// export const useShallowEqualSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useShallowEqualSelector(selector, shallowEqual);
// export const useAppDispatch = () => useDispatch<AppDispatch>();

//#region React Hook Form override

type UseAppFormProps<T extends Record<string, any>> = {
  initialState: T;
  schema: ObjectSchema;
  shouldUnregister?: boolean;
};

export const useAppForm = <TFieldValues extends FieldValues>({ schema, initialState, shouldUnregister }: UseAppFormProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>({
    // resolver: joiResolver(schema),
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

//#region localStorage hook

// export const useLocalStorage = (key: LOCAL_STORAGE_KEY | string, defaultValue: any) => {
//   const [value, setValue] = useState(() => {
//     return getLocalStorageItem(key) || defaultValue;
//   });

//   useEffect(() => {
//     // storing input name
//     setLocalStorageItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

//#endregion

// https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render
//create your forceUpdate hook
export const useForceUpdate: (isShowLoader?: boolean) => [TypeTableRenderValue, (isShowLoader?: boolean) => void] = (isShowLoader = true) => {
  const [value, setValue] = useState({ val: 0, isShowLoader }); // state

  return [value, (isShowLoader?: boolean) => setValue(value => ({ val: (value.val + 1), isShowLoader: isShowLoader !== false }))]; // update the state to force render
};

// https://medium.com/technology-hits/how-to-fix-memory-leak-issue-in-react-js-using-hook-a5ecbf9becf8
type useStateSafeParams<T> = T | (() => T);

type dispatch<T> = React.Dispatch<React.SetStateAction<T>>;
/**
 * Wrapper around react's `useState` hook.
 * Use this hook to prevent memory leak as this wont call set state on unmounted component.
 *
 * @param initialValue initial state value
 */

export const useStateSafe = <T>(
  initialValue: useStateSafeParams<T>
): [T, dispatch<T>] => {
  const [val, setVal] = useState<T>(initialValue);
  const mountedRef = useRef<boolean>();
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const setValue: dispatch<T> = useCallback(
    (s: React.SetStateAction<T>) => {
      if (mountedRef.current) {
        setVal(s);
      }
    },
    [setVal]
  );
  return [val, setValue];
};