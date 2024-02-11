// import { OPERATION_TYPE } from 'libs/Enums';

export type TypeLinkTarget = "_self" | "_blank";
// export type OperationType = OPERATION_TYPE;
// export type TypeConvertToSchema = <T>(operationType: OperationType, data: T, initialValue: T, isConvertToLocalDate?: boolean) => T;
export type TypeConvertToModel = <T>(model: T, data?: Record<string, any>, rest?: { isConvertToLocalDate?: boolean; }) => T;
export type TypeConvertToPayload = <T>(model: T, data?: Record<string, any>, rest?: { isConvertToUtcDate?: boolean; dateTimeFields?: string[]; }) => T;

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & unknown;

export type TypeFunctionWithoutArgs<R = unknown> = () => (R | Promise<R>);
export type TypeFunctionWithArgs<A extends any[] = undefined[], R = unknown> = (...args: A) => (R | Promise<R>);

// export type TypeGenericFunction<A extends any[] = undefined[], R = void> = TypeFunctionWithoutArgs<R> | TypeFunctionWithArgs<A, R>;
export type TypeGenericFunction<A extends any[] = undefined[], R = unknown> = TypeFunctionWithArgs<A, R>;

export type TypeCommonDropdownOption = {
  value: string;
  text: string;
  label?: string;
  rank?: any;
  isDefault?: boolean;
  isSelectable?: boolean;
} & Record<string, any>;

export type TypeCommonDropdownOptions = TypeCommonDropdownOption[];

export type TypeCustomFieldOption = {
  id: string;
  inputType: string;
  inputSize: number;
  label: string;
  isRequired: boolean
  maxLength: number;
  rank: number;
  valueOptions: string[];
};

export type TypeKeyValuePair = {
  key: string;
  value: any;
};

// export type TypeMutateResponse = {
//   success: boolean;
//   errors: Record<string, any>;
// };

// export type TypeCreateResponse<T = Record<string, any>> = {
//   data: T;
// } & TypeMutateResponse;

// export type TypeUpdateResponse = TypeMutateResponse;
// export type TypeDeleteResponse = TypeMutateResponse;

export type TypeDownloadableContent = {
  fileName: string;
  fileContent: string;
  FileContentBytes: ArrayBuffer;
  contentType: string;
};

export type TypeBlobDownload = {
  fileName: string;
  fileBlob: Blob;
  contentType: string;
};

export type TypeGetDownloadUrlResp = {
  id: string;
  publicUrl: string;
};