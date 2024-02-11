// import {
//   ArrowDropDown,
//   ArrowDropUp,
//   AccountBoxRounded,
//   Book,
//   Receipt,
//   People,
//   Assignment,
//   PersonPinRounded,
//   RoomService,
//   Message,
//   SettingsApplications,
//   HelpOutline,
//   Person,
//   Dashboard,
//   Description,
//   Speed,
//   Domain,
//   Lock,
//   ManageAccounts,
//   ReceiptLong,
//   ChatBubbleOutline,
//   KeyboardReturn,
//   Layers,
//   VerifiedUser,
//   LocalAtm,
//   Settings,
//   BarChart,
//   ListAlt,
//   PostAdd,
//   PlaylistAdd,
//   Payment,
//   Help,
//   ModeStandby,
//   Store,
//   Scanner,
//   TrackChanges,
//   CopyAll
// } from '@mui/icons-material';
// import SvgIcon from '@mui/material/SvgIcon';
// import { toast } from 'react-toastify';
// import {
//   TypePage,
//   pages,
//   briefRoutes,
//   TypeBriefRoute,
//   routes
// } from 'router/Config';
// import muiCapitalize from '@mui/utils/capitalize';
// import {
//   TypeConvertToSchema,
//   TypeConvertToModel,
//   TypeConvertToPayload,
//   TypeCustomFieldOption,
//   TypeGetDownloadUrlResp
// } from 'types/Common.types';
// import { RequestResponseObject, ValidationData } from 'apis/Api';
// import {
//   OPERATION_TYPE,
//   NOTIFICATION_TYPE,
//   ATTACHMENT_CATEGORY,
//   LOCAL_STORAGE_KEY,
//   ROLE,
//   SIDEBAR_TYPE,
//   SERVER_EVENT,
//   ELEVATED_PERMISSION_SCOPE,
//   CUSTOM_FIELD_INPUT_TYPE,
//   IMPORT_TYPE,
//   FILTER_COMPARATOR_TYPE,
//   FILTER_TYPE
// } from 'libs/Enums';
// import { v4 as uuidv4 } from 'uuid';
// // import lodashCloneDeep from 'lodash/cloneDeep';
import {
  cloneDeep as lodashCloneDeep,
  isEqual as lodashIsEqual,
  // isEmpty as lodashIsEmpty,
  isArray as lodashIsArray,
  // isObject as lodashIsObject,
  // sortBy as lodashSortBy,
  round as lodashRound,
  camelCase as lodashCamelCase,
  // uniqBy as lodashUniqBy,
  // uniqWith as lodashUniqWith,
  uniq as lodashUniq
} from 'lodash';
import {
  format as dfFormat,
  parse as dfParse,
  addDays as dfAddDays,
  differenceInCalendarDays as dfDifferenceInCalendarDays,
  differenceInMinutes as dfDifferenceInCalendarMinutes
} from 'date-fns';
// // import {
// //   utcToZonedTime,
// //   zonedTimeToUtc
// // } from "date-fns-tz";
// import { getSupportItemOptions } from 'apis/Support';
// import { TypeSupportItemOptions, TypeSupportItemOptionsLocalStorage } from 'types/Support.types';
// // import mimeTypes from 'mime-types';
// import { getType } from 'mime';
// import { TypeAgencyBoard, TypeAgencyBoardData } from 'types/Agency.types';
// import { getAgencyBoard } from 'apis/Agency';
// import { TypePlanBoard } from 'types/Plan.types';
// import { getPlanBoard } from 'apis/Plan';
// import store, { TypeReduxStore } from 'store/Store';
// import { TypeAuthData, TypeSignInResponse } from 'types/Account.types';
// import { TypeAutocompleteLabelRequest, TypeAutocompleteLabels } from 'types/Shared.types';
// import { getAutocompleteLabels } from 'apis/Shared';
// import { encodeHtml } from './HelperComponents';
// import { getNoteDocumentDownloadUrl } from 'apis/Note';
// import { useAppSelector } from './Hooks';
// import axios, { AxiosRequestConfig } from 'axios';
// import { joi, joiBooleanSchema, joiDateSchema, joiNumberSchema, joiSchemaLike, joiStringSchema } from 'components/shared/form/Form';
// import { downloadImportFileFormat } from 'apis/Import';
// import fileDownload from 'js-file-download';
// import { getInvoiceBatchDocumentDownloadUrl } from 'apis/Claim';
// import { TypeSingleFilterModel } from 'types/AgGrid.types';
// import { setGenericModal } from 'store/slices/Shared';
// import { TypeGenericModal } from 'components/shared/modal/GenericModal';

// export type TypeApiResponseData = {
//   errors: Record<string, any[]>;
// } & Record<string, any>;

// // type SvgIconComponent = typeof SvgIcon;
// // import imgReceiptLong from 'assets/img/icon/receipt_long.svg';

// const svgIcons = {
//   ArrowDropDown,
//   ArrowDropUp,
//   AccountBoxRounded,
//   Book,
//   Receipt,
//   People,
//   Assignment,
//   PersonPinRounded,
//   RoomService,
//   Message,
//   SettingsApplications,
//   HelpOutline,
//   Person,
//   Dashboard,
//   Description,
//   Speed,
//   Domain,
//   Lock,
//   ManageAccounts,
//   ReceiptLong,
//   ChatBubbleOutline,
//   KeyboardReturn,
//   Layers,
//   VerifiedUser,
//   LocalAtm,
//   Settings,
//   BarChart,
//   ListAlt,
//   PostAdd,
//   PlaylistAdd,
//   Payment,
//   Help,
//   ModeStandby,
//   Store,
//   Scanner,
//   TrackChanges,
//   CopyAll
// };

// export type TypeIconName = keyof typeof svgIcons;

// let reduxStore: TypeReduxStore;

// export const injectStoreForHelper = (store: TypeReduxStore) => {
//   reduxStore = store;
// };

// const dispatchSetGenericModal = (payload: TypeGenericModal) => {
//   reduxStore.dispatch(setGenericModal(payload));
// };

// export const cloneDeep = lodashCloneDeep;

/**
 * @description Check if item is an array, not object
 * @param  {any} item item to check
 * @param  {string} [type] type of item
 */
export const checkIsArray = (items, type) => {
  // console.log('items :>> ', items);
  if (type) {
    return lodashIsArray(items) && items.every(item => typeof item === type);
  }

  return lodashIsArray(items);
  // return Array.isArray(items);
};

// /**
//  * @description check if item is an object, not array
//  * @param {any} item item to check
//  */
// export const checkIsObject = (obj: any) => {
//   return typeof obj === 'object' &&
//     !Array.isArray(obj) &&
//     obj !== null;
// };

// /**
//  * @description check if string is JSON parsable
//  * @param {string} str item to check
//  */
// export const checkIsJsonParsable = (str: string) => {
//   try {
//     JSON.parse(str);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };

export const checkIsValidDate = (date, isUseConstructor = true) => {
  let validDate = date;
  const typeOfDate = typeof date;

  if (isUseConstructor) {
    validDate = new Date(date);
  }

  // console.log({
  //   validDate,
  //   call: Object.prototype.toString.call(validDate) === "[object Date]",
  //   isNan: validDate ? !isNaN(validDate.getTime()) : false
  // });

  return typeOfDate !== "number"
    && validDate
    && Object.prototype.toString.call(validDate) === "[object Date]"
    && !isNaN(validDate.getTime());
};

// export const generateGuid = () => {
//   return uuidv4();
// };

/**
 * @description: check if two items are equal
 * @param  {any} item1 first item
 * @param  {any} item2 second item
 * @return {boolean} true if two items are equal
 */
export const checkAreEqual = (item1, item2) => {
  let parsedItem1 = item1;
  let parsedItem2 = item2;

  // if (checkIsArray(item1) && checkIsArray(item2)) {
  //   parsedItem1 = lodashSortBy([...item1]);
  //   parsedItem2 = lodashSortBy([...item2]);
  // }

  // console.log('parsedItem1 & parsedItem2 :>> ', { parsedItem1, parsedItem2 });

  return lodashIsEqual(parsedItem1, parsedItem2);
};

// /**
//  * @param  {string} title Set title of a page
//  */
// export const setPageTitle = (title: string) => {
//   document.title = title;
// };

// /**
//  * @param  {number} ms milliseconds to wait
//  */
// export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// /**
//  * @description storage event is dispatched when a new value is added or removed from local storage
//  */
// export const dispatchStorageEvent = () => {
//   window.dispatchEvent(new StorageEvent('storage'));
// };

// /**
//  * @description set localStorage item
//  * @param  {string} key - key of stored value
//  * @param  {any} value - value to store
//  */
// export const setLocalStorageItem = (key: LOCAL_STORAGE_KEY | string, value: any) => {
//   localStorage.setItem(key, JSON.stringify(value));
//   dispatchStorageEvent();
// };

// /**
//  * @description get localStorage item
//  * @param  {string} key - key of stored value
//  * @returns {any} stored value
//  */
// export const getLocalStorageItem = (key: LOCAL_STORAGE_KEY | string) => {
//   let value = null;
//   const parsedValue = localStorage.getItem(key);
//   // console.log({ parsedValue });

//   if (parsedValue && !["null", "undefined"].includes(parsedValue)) {
//     value = JSON.parse(parsedValue);
//   }

//   return value;
// };

// /**
//  * @description remove localStorage item
//  * @param  {string} key - key of stored value
//  */
// export const removeLocalStorageItem = (key: string) => {
//   localStorage.removeItem(key);
//   dispatchStorageEvent();
// };

// /**
//  * @description clear/empty localStorage
//  */
// export const clearLS = (isKeepDeviceRef = false) => {
//   if (localStorage.length > 0) {
//     let deviceAffinityToken = "";

//     if (isKeepDeviceRef) {
//       deviceAffinityToken = getLocalStorageItem(LOCAL_STORAGE_KEY.DEVICE_AFFINITY_TOKEN) ?? "";
//     }

//     localStorage.clear();

//     if (deviceAffinityToken) {
//       setLocalStorageItem(LOCAL_STORAGE_KEY.DEVICE_AFFINITY_TOKEN, deviceAffinityToken);
//     }

//     dispatchStorageEvent();
//   }
// };

// export const formatApiErrors = (errors: Record<string, any> | any[]) => {

//   // console.log({errors});

//   let errorMessage = '';
//   const errorArray = checkIsObject(errors)
//     ? Object.values(errors).flatMap(x => x).map(x => ({ message: x }))
//     : (errors ?? []) as any[];

//   if (errorArray.length > 0) {
//     errorArray?.forEach(error => {
//       // errorMessage = `${errorMessage === "" ? errorMessage : `${errorMessage}\n`}${(error.message || "").endsWith(".") ? `${error.message}` : `${error.message}.`}`;
//       errorMessage = `${errorMessage === "" ? errorMessage : `${errorMessage}\n`}${error.message}`;
//     });

//     return errorMessage;
//   }

//   return "Error occurred with no error message";
// };

// export const formatApiValidations = (data: TypeApiResponseData) => {
//   const dataErrors = data.errors;
//   const validationArray: ValidationData[] = [];
//   let genericErrorMessage = '';

//   for (const key in dataErrors) {
//     let errorMessage = '';

//     if (key === "") {
//       dataErrors[key].forEach(error => {
//         errorMessage = `${error && error?.endsWith(".") ? `${error}` : `${error}.`}`;
//       });

//       genericErrorMessage = errorMessage;
//     } else {
//       dataErrors[key].forEach(error => {
//         errorMessage = `${errorMessage === "" ? errorMessage : `${errorMessage} `}${error && error?.endsWith(".") ? `${error}` : `${error}.`}`;
//       });

//       validationArray.push({
//         name: key,
//         message: errorMessage,
//         apiResp: dataErrors[key]
//       });
//     }
//   }

//   if (!genericErrorMessage) {
//     genericErrorMessage = data.title ?? data.detail ?? "Api error.";
//   }

//   return { genericErrorMessage, validationArray };
// };

// export const zeroPad = (value: number, places = 2) => String(value).padStart(places, '0');

// export const getIcon = (iconName?: TypeIconName) => {

//   return svgIcons[iconName ?? "ArrowDropDown"];
// };

// export const getPageData = (code: string) => {
//   return pages[code];
// };

// // export const getPageProperty = (code: typeof pagesKeys[number], icons[propertyName]: keyof TypePage) => {
// export const getPageProperty = (code: string, propertyName: keyof TypePage) => {
//   return pages[code][propertyName];
// };

// /**
//  * @description get link or pathname of page by code name
//  * @param {string} code - page code
//  * @returns {string} - page path
//  */
// export const getPagePath = (code: string) => {
//   return pages[code].path;
// };

// // export const getSidebarSectionUsingPath = (path: string) => {
// //   const sidebarItem = globalSidebarItems.find(x =>
// //     Array.isArray(x.items)
// //       ? x.items.find(y => y.href === path)
// //       : x.href === path);

// //   return sidebarItem?.section ?? "";
// // };

// // /**
// //  * @param  {string} str - string to be capitalized
// //  * @returns {string} capitalized string
// //  */
// // export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

// export const capitalize = muiCapitalize;

// export const makeCamelCase = lodashCamelCase;

// /**
//  * @param  {string} str - string to be pascal cased
//  * @param  {boolean} [isWithSpace] - if true, will add space between words. Default is true
//  * @returns string
//  */
// export const makePascalCase = (str?: string, isWithSpace = true): string => {
//   if (!str) return "";

//   return str
//     .split(" ")
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(isWithSpace ? " " : "");
// };

// export const isNullOrEmpty = (value: any, placeholder?: any) => {
//   return (value ?? "") === "" ? (placeholder === undefined ? "" : placeholder) : value;
// };

// export const isNull = (value: any, placeholder: any) => {
//   if (value != null) {
//     return value;
//   }

//   return placeholder === undefined ? "" : placeholder;
// };

// export const isEmpty = (value: any, placeholder?: any) => {
//   if (value !== "") {
//     return value;
//   }

//   return placeholder === undefined ? "" : placeholder;
// };

export const getFileExtension = (fileName) => {
  return fileName.split('.').pop();
};

// export const getFileNameWithoutExtension = (fileName: string) => {
//   return fileName.substring(0, fileName.lastIndexOf('.'));
// };

// export const getFileExtensionFromMimeType = (mimeType: string) => {
//   return mimeType.split('/').pop();
// };

// export const getMimeTypeFromFileExtension = (extension: string) => {
//   // console.log({ extension });

//   // return mimeTypesLookup(extension);
//   return getType(extension);
// };

// export const getCategoryExtensions = (category: ATTACHMENT_CATEGORY) => {
//   const allExtensions: Record<string, string[]> = {
//     DOCUMENT: ["pdf", "txt", "doc", "docx", "xls", "xlsx", "csv"],
//     IMAGE: ["png", "jpg", "jpeg", "bmp", "gif", "tif"],
//     AUDIO: ["mp3", "wav", "3gp"],
//     VIDEO: ["avi", "wmv", "mpg", "mpeg", "mp4", "m4v", "m4p", "mov", "flv"]
//   };

//   return allExtensions[category];
// };

// export const getFileExtensions = (acceptFileExtensions: string[], acceptFileCategories: ATTACHMENT_CATEGORY[], isWithDot = true) => {
//   let fileExtensions: string[] = [];

//   if (acceptFileExtensions && acceptFileExtensions.length > 0) {
//     fileExtensions = [...acceptFileExtensions];
//   }

//   if (acceptFileCategories && acceptFileCategories.length > 0) {
//     acceptFileCategories.forEach(category => {
//       fileExtensions = [...fileExtensions, ...getCategoryExtensions(category)];
//     });
//   }

//   return isWithDot ? [...fileExtensions.map(x => `.${x.toLowerCase()}`)] : fileExtensions;
// };

// export const validateFileType = (file: File, fileTypes: string[]) => {
//   // console.log('File :>> ', file);
//   const result = { isValid: true, errorMessage: "" };

//   // let fileTypes: string[] = getFileTypes(acceptFileCategories, acceptFileExtensions);

//   const fileExtension = getFileExtension(file.name);

//   // #region Check file size
//   /* const category = getFileCategory(file.name);

//   const maxFileSize = category === "video"
//     ? config.MAX_ATTACHMENT_SIZE_VIDEO
//     : config.MAX_ATTACHMENT_SIZE_FILE;

//   if (file.size > maxFileSize) {
//     result.isValid = false;
//     result.errorMessage = `Please select a file smaller than ${maxFileSize / 1000000} MB.`;
//   } */
//   // #endregion

//   // if ((acceptFileExtensions && acceptFileExtensions.length !== 0) || !fileTypes.includes(`.${fileExtension}`)) {
//   if (!fileTypes.includes(`.${fileExtension}`)) {
//     result.isValid = false;
//     result.errorMessage = `${result.errorMessage} Selected file type is not allowed`;
//   }

//   return result;
// };

// export const claimFileExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

// export const formatCurrency = (value?: number, IsWrapNegativeWithBracket = true) => {
//   if (value == null)
//     return "";

//   const nf = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   });

//   let formattedValue = nf.format(value);

//   if (value < 0 && IsWrapNegativeWithBracket) {
//     formattedValue = `(${nf.format(Math.abs(value))})`;
//   }

//   return formattedValue;
// };

// export const formatCurrencyNoFractions = (value?: number, IsWrapNegativeWithBracket = true) => {
//   if (value == null)
//     return "";

//   const nf = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0
//   });

//   let formattedValue = nf.format(value);

//   if (value < 0 && IsWrapNegativeWithBracket) {
//     formattedValue = `(${nf.format(Math.abs(value))})`;
//   }

//   return formattedValue;
// };

// export const getPercentageFromRatio = (value: string | number, precision = 0) => {
//   return roundValue(parseFloat(value.toString()) * 100, precision);
// };

// export const formatDateTime = (date: Date) => {
//   const monthNames = [
//     "January", "February", "March",
//     "April", "May", "June", "July",
//     "August", "September", "October",
//     "November", "December"
//   ];

//   const day = date.getDate();
//   const monthIndex = date.getMonth();
//   const year = date.getFullYear();
//   const hour = date.getHours();
//   const minute = date.getMinutes();

//   return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minute;
// };

/**
 * @param  {string|number|Date} date - Date to be formatted
 * @param  {string} [format=dd/MM/yyyy] - Format to be used, default is "dd/MM/yyyy"
 * @return {string} - Formatted date
 */
export const formatDateToString = (date, format = "dd/MM/yyyy") => {
  // console.log({ date });

  // return (moment(new Date(date)).format(format)).toString();
  if (!date) {
    return "";
  }

  return dfFormat(new Date(date), format);
};

// // export const getFormattedTimestamp = (separator?: string) => {
// //   const date = new Date();
// //   const year = date.getUTCFullYear().toString();
// //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
// //   const day = date.getDate().toString().padStart(2, '0');
// //   const hour = date.getHours().toString().padStart(2, '0');
// //   const minute = date.getMinutes().toString().padStart(2, '0');
// //   const seconds = date.getSeconds().toString().padStart(2, '0');
// //   const milliSeconds = date.getMilliseconds().toString().padStart(3, '0');

// //   let timestamp = year + month + day + hour + minute + seconds + milliSeconds;

// //   if (separator) {
// //     timestamp = year + separator + month + separator + day + separator + hour + separator + minute + separator + seconds + separator + milliSeconds;
// //   }

// //   // console.log(timestamp);
// //   return timestamp;
// // };

// export const getFormattedTimestamp = (separator?: string, isWithMilliseconds = false) => {
//   // https://www.npmjs.com/package/timestamp-nano
//   const date = new Date();
//   let timestamp = formatDateToString(date, `yyyyMMddHHmmss${isWithMilliseconds ? "SSS" : ""}`);

//   if (separator) {
//     // timestamp = formatDateToString(date, "yyyy" + separator + "MM" + separator + "dd" + separator + "HH" + separator + "mm" + separator + "ss" + separator + "fff");
//     timestamp = formatDateToString(date, `yyyy${separator}MM${separator}dd${separator}HH${separator}mm${separator}ss${isWithMilliseconds ? `${separator}SSS` : ""}`);
//   }

//   // console.log(timestamp);
//   return timestamp;
// };

// export const consoleLogTimestamp = (separator = "-", isWithMilliseconds = true) => {
//   const timestamp = getFormattedTimestamp(separator, isWithMilliseconds);

//   // console.log(timestamp);
//   console.info(`timestamp: ${timestamp}`);
// };

// export const logAndReturn = (data: any) => {
//   console.log({
//     data: {
//       object: data,
//       value: data.value
//     }
//   });

//   return data;
// };

export const formatDateStringToDate = (date, format = "yyyyMMdd") => { //20201025 => Date
  // return (new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`));
  // https://date-fns.org/v2.17.0/docs/parse#examples
  // return dfParse(date, format, new Date());
  return formatUtcToLocalDate(dfParse(date, format, new Date()));
};

export const formatDateWithoutTimePart = (date, isUseLocal = true) => {
  // return (new Date(new Date(date).toDateString()));
  // return new Date(formatDateToString(date, "yyyy-MM-dd"));

  // console.log('formatDateToString(date, "yyyy-MM-dd") :>> ', formatDateToString(date, "yyyy-MM-dd"));
  // console.log('new Date(formatDateToString(date, "yyyy-MM-dd")) :>> ', new Date(formatDateToString(date, "yyyy-MM-dd")));

  if (isUseLocal === false) {
    return new Date(formatDateToString(date, "yyyy-MM-dd"));
  } else {
    return formatUtcToLocalDate(formatDateToString(date, "yyyy-MM-dd"));
  }
};

export const formatUtcToLocalDate = (utcDate = new Date()) => {
  const utcToLocalDateTime = new Date(utcDate);

  const extraMinutes = utcToLocalDateTime.getHours() * 60 + utcToLocalDateTime.getMinutes();
  const offsetMinutes = utcToLocalDateTime.getTimezoneOffset();

  if (extraMinutes !== 0) {
    utcToLocalDateTime.setMinutes(utcToLocalDateTime.getMinutes() + offsetMinutes);
  }

  // console.log('offsetMinutes :>> ', offsetMinutes);
  // console.log('extraMinutes :>> ', extraMinutes);
  // console.log('utcToLocalDateTime :>> ', utcToLocalDateTime);

  return utcToLocalDateTime;
  // return formatDateToString(utcDateTime, "yyyy-MM-dd");
};

// export const formatLocalToUtcDate = (localDate = new Date()) => {
//   const localToUtcDateTime = new Date(localDate);

//   const extraMinutes = localToUtcDateTime.getUTCHours() * 60 + localToUtcDateTime.getUTCMinutes();
//   const offsetMinutes = localToUtcDateTime.getTimezoneOffset();

//   if (extraMinutes !== 0) {
//     localToUtcDateTime.setMinutes(localToUtcDateTime.getMinutes() - offsetMinutes);
//   }

//   // console.log('offsetMinutes :>> ', offsetMinutes);
//   // console.log('extraMinutes :>> ', extraMinutes);
//   // console.log('localToUtcDateTime :>> ', localToUtcDateTime);

//   return localToUtcDateTime;
// };

// export const convertTimeZone = (date: string | number | Date, tzString: string) => {
//   return (new Date((["string", "number"].includes(typeof date) ? new Date(date) : date)).toLocaleString("en-US", { timeZone: tzString }));
// };

// export const addDaysToDate = (date = Date.now(), amount = 0) => {
//   return dfAddDays(new Date(date), amount);
// };

// export const calcDateDiffInDays = (startDate: string | number | Date, endDate: string | number | Date) => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   return dfDifferenceInCalendarDays(end, start);
// };

// export const calculateDateDiffInMin = (startDate: string | number | Date, endDate?: string | number | Date) => {
//   const start = new Date(startDate);
//   const end = endDate == null ? new Date() : new Date(endDate);

//   start.setSeconds(0);
//   end.setSeconds(0);

//   // var difference = end.getTime() - start.getTime();
//   // return Math.round(difference / 60000);

//   return dfDifferenceInCalendarMinutes(end, start);
// };

// export const formatDateDiffMinutesToText = (totalMinutes: number) => {
//   const minutesInDay = 60 * 24;
//   const days = Math.floor(totalMinutes / minutesInDay);
//   const hours = Math.floor((totalMinutes % minutesInDay) / 60);
//   const minutes = Math.round(totalMinutes % 60);

//   //console.log("dd/hh/mm", days + ":" + hours + ":" + minutes);

//   let label = "";
//   const daysLabel = days === 0
//     ? ""
//     : days === 1
//       ? days + " day "
//       : days + " days ";

//   label += daysLabel;

//   const hoursLabel = hours === 0
//     ? ""
//     : hours === 1
//       ? hours + " hour "
//       : hours + " hours ";

//   label += hoursLabel;

//   const minutesLabel = totalMinutes > 59 && minutes === 0
//     ? ""
//     : minutes === 1
//       ? minutes + " min"
//       : minutes + " mins";

//   label += minutesLabel;

//   return label.trim();
// };

// /** @description Returns the rounded float value using Math.round(), by default 2 digits.
//     * @param {String|number} value Input value field. Can be string or integer or float.
//     * @param {number} [precision=2] How many digits after decimal point. Default value is 2.
//     * @return {number}
//   */
// export const roundValue = (value: string | number, precision = 2) => {
//   // return (Math.ceil(parseFloat(value) * 100) / 100).toFixed(2); // returns 1.45 from 1.455, so not useful
//   // return (Math.ceil(((parseFloat((value)) * 100)).toFixed(10)) / 100).toFixed(2); // always take the ceiling value\

//   // return Math.round(value * Math.pow(10, digitCount)) / Math.pow(10, digitCount);

//   // works okay
//   // return parseFloat(Math.round(parseFloat(value.toString() + `e+${digitCount}`)) + `e-${digitCount}`);

//   return lodashRound(parseFloat(value.toString()), precision);
// };

// export const arrayToObject = (array: any[], keyField = "key") => {
//   return array.reduce((obj, item) => {
//     obj[item[keyField]] = item;
//     return obj;
//   }, {});

//   // example: const peopleObject = arrayToObject(peopleArray, "id")
// };

// // https://www.tutorialspoint.com/how-to-modify-key-values-in-an-object-with-javascript-and-remove-the-underscore
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
// // https://stackoverflow.com/a/11183002/8506030
// /**
//  * @param  {any} jsonObject The object to be modified
//  * @param  {} extraSubStrings An array of strings to be removed from the keys. e.g. ["_", "-", "plan_"]
//  * @param  {} extraReplacer A string to replace the extraSubStrings. Default is ""
//  */
// export const replaceJsonKey = (jsonObject: any, extraSubStrings = [], extraReplacer = "") => {
//   const underscoreSpecifyFormat = (str: string) => {
//     if (Array.isArray(extraSubStrings)) {
//       extraSubStrings.forEach(extraSubstr => {
//         if (extraSubstr !== "") {
//           str = str.replaceAll(extraSubstr, extraReplacer);
//         }
//       });
//     }

//     str = str.replace(/^([A-Z])/, (_, v) => v.toLowerCase()).replace(/(_)(.)/g, (_, __, v) => v.toUpperCase());

//     return str;
//   };

//   const formatObject = (value: any): any => {
//     if ((typeof value) === "object") {
//       // if (value?.constructor === {}.constructor) {
//       if (checkIsObject(value)) {
//         return replaceJsonKey(value ?? "", extraSubStrings, extraReplacer);
//       }

//       // if (value?.constructor === [].constructor) {
//       if (checkIsArray(value)) {
//         return (value ?? []).map((x: any) => replaceJsonKey(x, extraSubStrings, extraReplacer));
//       }
//     }

//     return value ?? "";
//   };

//   const resultObject = Object.fromEntries(Object.entries(jsonObject).map(([key, value]) => [underscoreSpecifyFormat(key), formatObject(value)]));
//   return resultObject;
// };

// export const reorderArray = (list: any[], sourceIndex: number, destinationIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(sourceIndex, 1);
//   result.splice(destinationIndex, 0, removed);

//   return result;
// };

// export const makeUniqueArray = <T extends string | number | boolean>(inputArray: T[]) => {
//   // return [...new Set(inputArray)];
//   return lodashUniq(inputArray);
// };

// export const convertToSchema: TypeConvertToSchema = (operationType, data, initialValue) => {
//   if (operationType === OPERATION_TYPE.UPDATE) {
//     const finalData = {} as typeof initialValue;

//     for (const key in initialValue) {
//       finalData[key] = data[key] ?? initialValue[key];
//     }

//     return finalData;
//   } else {
//     return initialValue;
//   }
// };

// /**
//  * @param  {any} model The model to be converted
//  * @param  {object} data The data to be converted
//  * @param  {object} rest other optional params
//  * @param  {boolean} rest.isConvertToLocalDate Whether to convert the date to Local date. Default is true
//  */
// export const convertToModel: TypeConvertToModel = (model, data, rest) => {
//   const isConvertToLocalDate = rest?.isConvertToLocalDate ?? true;
//   let finalData = {} as typeof model;

//   if (data) {
//     for (const key in model) {
//       let finalDataKey = data[key] ?? model[key];

//       if (
//         isConvertToLocalDate &&
//         finalDataKey &&
//         checkIsValidDate(finalData[key], false) &&
//         checkIsValidDate(finalDataKey, false)
//       ) {
//         type DataKeyType = typeof finalDataKey;
//         finalDataKey = formatUtcToLocalDate(new Date(finalDataKey)) as DataKeyType;
//       }

//       finalData[key] = finalDataKey;
//       // console.log({ key, mk: model[key], fdk: finalData[key], finalDataKey });
//     }
//   } else {
//     finalData = model;
//   }

//   // console.log({ finalData, data });
//   return finalData;
// };

// /**
//  * @param  {any} model The model to be converted
//  * @param  {object} data The data to be converted
//  * @param  {object} rest other optional params
//  * @param  {boolean} rest.isConvertToUtcDate Whether to convert the date to UTC date. Default is true
//  * @param  {string[]} rest.dateTimeFields Fields need to parse to date time
//  */
// export const convertToPayload: TypeConvertToPayload = (model, data, rest) => {
//   const isConvertToUtcDate = rest?.isConvertToUtcDate ?? true;
//   const dateTimeFields = rest?.dateTimeFields ?? [];
//   let finalData = {} as typeof model;

//   if (data) {
//     for (const key in model) {
//       let finalDataKey = (data[key] ?? "") === "" ? model[key] : data[key];

//       if (
//         typeof model[key] === "boolean"
//         && typeof finalDataKey === "string"
//       ) {
//         finalDataKey = finalDataKey.toLowerCase() === "true";
//       }

//       // console.log({
//       //   key,
//       //   dataKey: data[key],
//       //   modelKey: model[key],
//       //   isConvertToUtcDate,
//       //   finalDataKey,
//       //   isValidDate: checkIsValidDate(finalDataKey, false)
//       // });

//       if (
//         isConvertToUtcDate &&
//         // finalData[key] &&
//         finalDataKey &&
//         // checkIsValidDate(finalData[key]) &&
//         checkIsValidDate(finalDataKey, false)
//       ) {
//         type DataKeyType = typeof finalDataKey;
//         // finalDataKey = formatLocalToUtcDate(new Date(finalDataKey)) as DataKeyType;

//         if (dateTimeFields.length > 0 && dateTimeFields.includes(key)) {
//           finalDataKey = formatLocalToUtcDate(new Date(finalDataKey)) as DataKeyType;
//         } else {
//           // finalDataKey = formatDateToString(formatDateWithoutTimePart(finalDataKey), "yyyy-MM-dd hh:mm:ss") as DataKeyType;
//           finalDataKey = formatDateToString(formatDateWithoutTimePart(finalDataKey), "yyyy-MM-dd") as DataKeyType;
//         }
//       }

//       finalData[key] = finalDataKey;
//     }
//   } else {
//     finalData = model;
//   }

//   return finalData;
// };

// export const checkObjectFieldsChanged: <T extends Record<string, any>>(
//   updatedObject: T,
//   currentObject: Record<string, any>,
//   fields: (keyof T)[]
// ) => boolean = (updatedObject, currentObject, fields) => {
//   // console.log({ updatedObject, currentObject });

//   return !!fields.find(x => updatedObject[x] !== currentObject[x as string]);
// };

// export const setServerErrors = (methods: any, validations: ValidationData[]) => {
//   validations.forEach((error: ValidationData, index) => {
//     methods.setError(error.name.replaceAll("customField.", "customFields."),
//       {
//         message: error.message
//       },
//       {
//         shouldFocus: index === 0
//       });
//   });
// };

// export const setSignInData = (authData: TypeAuthData, isTwoFactorAuthEnabled = false) => {
//   // debugger;

//   removeLocalStorageItem(LOCAL_STORAGE_KEY.RECENT_PLANS);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.USER_ID, authData.userId);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.USER_LABEL, authData.userLabel);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.ROLE_ID, authData.roleId);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.ELEVATED_PERMISSION_SCOPES, authData.elevatedPermissionScopes);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_ID, authData.agencyId);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_NAME, authData.agencyName);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.THEME_HINT, authData.themeHint);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_PACE_ENABLED, authData.isAgencyPaceEnabled);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_CUSTOM_FIELD_ENABLED, authData.isAgencyCustomFieldsEnabled);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_CLAIMS_CSV_IMPORT_ENABLED, authData.isAgencyClaimsCsvImportEnabled);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_CLAIMS_BULK_IMPORT_ENABLED, authData.isAgencyClaimsBulkImportEnabled);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_BUDGET_FORECAST_ENABLED, authData.isAgencyBudgetForecastEnabled);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN_EXPIRY, authData.accessTokenExpiresUtc);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN_EXPIRY, authData.refreshTokenExpiresUtc);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.SESSION_TIMEOUT, authData.clientSessionIdleTimeout);
//   setLocalStorageItem(LOCAL_STORAGE_KEY.IS_TWO_FACTOR_AUTH_ENABLED, isTwoFactorAuthEnabled);
// };

// export const getAgencyInfo = async (agencyId: string) => {
//   try {
//     const formattedAgencyId = agencyId.toUpperCase();
//     const roleId = getLocalStorageItem(LOCAL_STORAGE_KEY.ROLE_ID);

//     if (![ROLE.SYSTEM_ADMIN, ROLE.OFFICE_ADMIN].includes(roleId)) {
//       return {
//         agencyId: formattedAgencyId,
//         agencyName: getLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_NAME),
//         isPaceEnabled: getLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_PACE_ENABLED),
//         isCustomFieldsEnabled: getLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_CUSTOM_FIELD_ENABLED),
//         isClaimsCsvImportEnabled: getLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_CLAIMS_CSV_IMPORT_ENABLED),
//         isClaimsBulkImportEnabled: getLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_CLAIMS_BULK_IMPORT_ENABLED),
//         isBudgetForecastEnabled: getLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_BUDGET_FORECAST_ENABLED)
//       } as TypeAgencyBoard;
//     }

//     const agencyBoardsData: TypeAgencyBoardData = getLocalStorageItem(LOCAL_STORAGE_KEY.AGENCY_BOARDS_DATA);
//     const tomorrow = formatDateWithoutTimePart(dfAddDays(new Date(), 1));
//     const isDataExpired = (agencyBoardsData?.expireAt ?? new Date()) < tomorrow;
//     const expireAt = isDataExpired ? tomorrow : agencyBoardsData.expireAt;

//     const newAgencyBoardsData: TypeAgencyBoardData = {
//       agencyBoards: isDataExpired ? [] : agencyBoardsData.agencyBoards,
//       expireAt
//     };

//     let selectedAgencyBoard = newAgencyBoardsData.agencyBoards.find(x => x.agencyId === formattedAgencyId);

//     if (!selectedAgencyBoard) {
//       const response = await getAgencyBoard(formattedAgencyId);

//       if (response.success && response.data) {
//         selectedAgencyBoard = response.data.agencyBoard;

//         newAgencyBoardsData.agencyBoards.push(selectedAgencyBoard);
//       }

//       setLocalStorageItem(LOCAL_STORAGE_KEY.AGENCY_BOARDS_DATA, newAgencyBoardsData);
//     }

//     return selectedAgencyBoard;

//   } catch (error) {
//     console.log({ error });

//     return undefined;
//   }
// };

// export const removeAgencyBoard = (agencyId: string) => {
//   const agencyBoardsData: TypeAgencyBoardData = getLocalStorageItem(LOCAL_STORAGE_KEY.AGENCY_BOARDS_DATA);

//   if (agencyBoardsData) {
//     const updatedAgencyBoardsData = {
//       agencyBoards: (agencyBoardsData.agencyBoards ?? []).filter(x => x.agencyId !== agencyId),
//       expireAt: agencyBoardsData.expireAt
//     };

//     setLocalStorageItem(LOCAL_STORAGE_KEY.AGENCY_BOARDS_DATA, updatedAgencyBoardsData);
//   }
// };

// type TypePlanBoardData = {
//   planBoards: TypePlanBoard[];
//   expireAt: Date;
// };

// export const getPlanInfo = async (planId: string) => {
//   try {
//     const planBoardsData: TypePlanBoardData = getLocalStorageItem(LOCAL_STORAGE_KEY.PLAN_BOARDS_DATA);
//     const tomorrow = formatDateWithoutTimePart(dfAddDays(new Date(), 1));
//     const isDataExpired = (planBoardsData?.expireAt ?? new Date()) < tomorrow;
//     const expireAt = isDataExpired ? tomorrow : planBoardsData.expireAt;

//     const newPlanBoardsData: TypePlanBoardData = {
//       planBoards: isDataExpired ? [] : planBoardsData.planBoards,
//       expireAt
//     };

//     let selectedPlanBoard = newPlanBoardsData.planBoards.find(x => x.planId === planId);

//     if (!selectedPlanBoard) {
//       const response = await getPlanBoard(planId);

//       if (response.success && response.data) {
//         selectedPlanBoard = response.data.planBoard;

//         newPlanBoardsData.planBoards.push(selectedPlanBoard);
//       }

//       setLocalStorageItem(LOCAL_STORAGE_KEY.PLAN_BOARDS_DATA, newPlanBoardsData);
//     }

//     return selectedPlanBoard;
//   } catch (error) {
//     console.log({ error });

//     return undefined;
//   }
// };

// export const getSharedStore = () => {
//   return store.getState().shared;
// };

// export const regenerateUrl = (url: string, params?: { agencyId?: string; planId?: string; }, isAgencyOnly = false) => {
//   const roleId = getLocalStorageItem(LOCAL_STORAGE_KEY.ROLE_ID);
//   const sharedStore = getSharedStore();
//   let finalUrl = url;

//   // console.log('sharedStore :>> ', sharedStore);

//   finalUrl = `${sharedStore.sidebar.type === SIDEBAR_TYPE.PLAN && !isAgencyOnly
//     ? `/plan/${params?.planId ?? sharedStore.planBoard.planId}`
//     : sharedStore.sidebar.type === SIDEBAR_TYPE.AGENCY || isAgencyOnly
//       // ? roleId === ROLE.SYSTEM_ADMIN
//       ? [ROLE.SYSTEM_ADMIN, ROLE.OFFICE_ADMIN].includes(roleId)
//         ? `/agency/${params?.agencyId ?? sharedStore.agencyBoard.agencyId}`
//         : ""
//       : ""}${finalUrl}`;

//   // console.log('finalUrl :>> ', finalUrl);

//   return finalUrl;
// };

// type TypeRequestByAxios = {
//   doOnSuccess?: (data: any) => Promise<void> | void;
//   abortController?: AbortController;
// } & AxiosRequestConfig;

// export const requestByAxios = async (url: string, rest?: TypeRequestByAxios) => {
//   const doOnSuccess = rest?.doOnSuccess;
//   const abortController = rest?.abortController;

//   delete rest?.doOnSuccess;
//   delete rest?.abortController;

//   try {
//     const axiosRequest: AxiosRequestConfig = {
//       // url: 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_500_kB.pdf',
//       // url: 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf',
//       url,
//       ...rest
//     };

//     console.log('raw axiosRequest :>> ', axiosRequest);

//     // GET request for remote file
//     const response = await axios(axiosRequest);

//     console.log('raw axiosResponse success :>> ', response);

//     // await delay(9000);
//     // console.log('response.data :>> ', response.data);

//     if (abortController?.signal.aborted) {
//       // console.log('aborted');
//       return;
//     }

//     if (doOnSuccess) {
//       await doOnSuccess(response.data);
//     }

//     return response.data;

//   } catch (error) {
//     console.log('raw axiosResponse error :>> ', error);
//     throw error;
//   }
// };

// export const getUrlSubdomain = (isSkipApp = false) => {
//   const subdomain = "";
//   const currentDomain = window.location.hostname;
//   const isLocal = currentDomain.includes('localhost');
//   const clientDomain = process.env.REACT_APP_CLIENT_DOMAIN as string;
//   const splitDomain = currentDomain.split(isLocal ? ".localhost" : `.${clientDomain}`);
//   // console.log({ splitDomain });
//   // debugger;

//   if (splitDomain.length === 2 && splitDomain[0] === "app" && isSkipApp) {
//     return subdomain;
//   }

//   if (splitDomain.length === 2 && splitDomain[1] === "") {
//     return splitDomain[0];
//   }

//   return subdomain;
// };

// type TypeContentPath = {
//   contentPath: string;
//   agencyId?: string;
//   roleId?: ROLE;
//   isPublicPage?: boolean;
// };

// export const prepareAgencySpecificContentPath = ({
//   contentPath,
//   agencyId,
//   roleId,
//   isPublicPage
// }: TypeContentPath) => {
//   const memberRoleId = roleId || getLocalStorageItem(LOCAL_STORAGE_KEY.ROLE_ID) as ROLE;
//   const memberAgencyId = agencyId || getLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_ID) as string;

//   const version = process.env.REACT_APP_VERSION as string;
//   // const currentDomain = window.location.hostname;
//   // const isLocal = currentDomain.includes('localhost');
//   // const clientDomain = process.env.REACT_APP_CLIENT_DOMAIN as string;
//   // const clientDomain = "planability-dev-local.com";

//   // console.log({ contentPath, agencyId, roleId });

//   const isHttps = process.env.REACT_APP_IS_HTTPS?.toLowerCase() === "true";
//   const cdnBaseUrl = process.env.REACT_APP_CDN_BASE_URL
//     ? process.env.REACT_APP_CDN_BASE_URL
//     : `${isHttps ? "https" : "http"}://${process.env.REACT_APP_CDN_SUBDOMAIN as string}.${process.env.REACT_APP_DOMAIN as string}`;

//   let cdnAgencyString = (
//     (memberAgencyId && memberAgencyId !== "app" && ![ROLE.SYSTEM_ADMIN, ROLE.OFFICE_ADMIN].includes(memberRoleId))
//       ? memberAgencyId
//       : "shared"
//   ).toLocaleLowerCase();

//   if (cdnAgencyString === "shared" /* && !["localhost", clientDomain].includes(currentDomain) */) {
//     // const splitDomain = currentDomain.split(isLocal ? ".localhost" : `.${clientDomain}`);
//     // console.log({ splitDomain });

//     // if (splitDomain.length === 2 && splitDomain[1] === "") {
//     //   cdnAgencyString = splitDomain[0];
//     // }

//     const urlSubdomain = getUrlSubdomain(true);

//     if (!memberAgencyId && urlSubdomain) {
//       cdnAgencyString = urlSubdomain;
//     }
//   }

//   const cdnContentAbsolutePath = `${cdnBaseUrl}/${cdnAgencyString}${contentPath}?v=${version}`;

//   return cdnContentAbsolutePath;
// };

// export const getRoute = (url: string, isAgencyOnly = false) => {
//   const regeneratedUrl = regenerateUrl(url, { agencyId: ":agencyId", planId: ":planId" }, isAgencyOnly);

//   // console.log('regeneratedUrl :>> ', regeneratedUrl);

//   return routes.find(x => x.path === regeneratedUrl);
// };

// export const getRouteRoles = (url: string, propertyName: keyof TypeBriefRoute, isAgencyOnly = false) => {
//   const regeneratedUrl = regenerateUrl(url, { agencyId: ":agencyId", planId: ":planId" }, isAgencyOnly);

//   // console.log('regeneratedUrl :>> ', regeneratedUrl);

//   return briefRoutes.find(x => x.path === regeneratedUrl)?.[propertyName];
// };

// type typeAdditionalPermissionCheck = {
//   url: string;
//   roleId: ROLE;
//   isAgencyOnly?: boolean;
//   isPaceManaged?: boolean;
// };

// export const checkPageAdditionalPermission = ({
//   url,
//   roleId,
//   isAgencyOnly = false,
//   isPaceManaged = false
// }: typeAdditionalPermissionCheck) => {
//   const localRoleId = roleId ?? getLocalStorageItem(LOCAL_STORAGE_KEY.ROLE_ID) as ROLE;
//   const elevatedPermissionScopes = (getLocalStorageItem(LOCAL_STORAGE_KEY.ELEVATED_PERMISSION_SCOPES) ?? []) as ELEVATED_PERMISSION_SCOPE[];
//   const regeneratedUrl = regenerateUrl(url, { agencyId: ":agencyId", planId: ":planId" }, isAgencyOnly ?? false);
//   const pageRoute = routes.find(x => x.path === regeneratedUrl);
//   let hasPermission = true;

//   // console.log('regeneratedUrl :>> ', regeneratedUrl);

//   if (
//     pageRoute &&
//     pageRoute.isAdditionalPermissionCheck
//   ) {
//     if (!(
//       pageRoute.elevatedPermissionSet &&
//       pageRoute.elevatedPermissionSet[localRoleId] &&
//       elevatedPermissionScopes.includes(pageRoute.elevatedPermissionSet[localRoleId] as unknown as ELEVATED_PERMISSION_SCOPE)
//     )) {
//       hasPermission = false;
//     }
//   }

//   return hasPermission;
// };

// export const showNotification = (type: NOTIFICATION_TYPE, message: any, timerMilliseconds?: number, isShowInPublicPage?: boolean) => {
//   // if (!isShowInPublicPage && !getLocalStorageItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)) {
//   //   return;
//   // }

//   // const messageString = "yes\nno<br/>done";

//   if (!message) {
//     return;
//   }

//   const messageString = ["string", "number"].includes(typeof message) ? message : message?.message ?? `Error: ${JSON.stringify(message)}`;
//   const isDebugMode = process.env.REACT_APP_STAGE !== "prod" && (
//     window.location.search.includes("debug=true") ||
//     getLocalStorageItem(LOCAL_STORAGE_KEY.DEBUG_MODE)?.toString()?.toLowerCase() === "true"
//   );

//   // debugger;
//   // console.log({ messageString });

//   if (messageString) {
//     toast(encodeHtml(messageString), {
//       type: toast.TYPE[type],
//       autoClose: timerMilliseconds ?? 5000,
//       onClick: isDebugMode
//         ? () => {
//           console.log(messageString);
//           // alert(messageString);
//           // dispatchSetGenericModal({
//           //   name: 'ERROR_DETAILS',
//           //   title: 'Error Details',
//           //   content: messageString,
//           //   size: 'md'
//           // });
//         }
//         : undefined
//     });
//   }
// };

// export const prepareApiBaseUrl = () => {
//   // const baseUrl = 'https://jsonplaceholder.typicode.com';
//   const apiBaseUrlFromFeature = "http://planability-web-api-dev-feature.azurewebsites.net";
//   const apiBaseUrlFromLocal = "http://planability.fixxt.local";
//   const isHttps = process.env.REACT_APP_IS_HTTPS?.toLowerCase() === "true";
//   // const apiBaseUrlFromEnvOld = `${isHttps ? "https" : "http"}://${process.env.REACT_APP_API_SUBDOMAIN as string}.${process.env.REACT_APP_DOMAIN as string}`;
//   const apiBaseUrlFromEnv = `${isHttps ? "https" : "http"}://${process.env.REACT_APP_API_DOMAIN
//     ? (process.env.REACT_APP_API_DOMAIN as string)
//     : `${process.env.REACT_APP_API_SUBDOMAIN as string}.${process.env.REACT_APP_DOMAIN as string}`}`;

//   // const apiBaseUrl = apiBaseUrlFromFeature;
//   // const apiBaseUrl = apiBaseUrlFromLocal;
//   const apiBaseUrl = apiBaseUrlFromEnv;

//   return apiBaseUrl;
// };

// export const fixUrlHttps = (url?: string) => {
//   // if (url) {
//   //   if (window.location.protocol === "https:") {
//   //     return url.replace(/^http:/, "https:");
//   //   } else {
//   //     return url.replace(/^https:/, "http:");
//   //   }
//   // }

//   return url;
// };

// export const openInNewTab = (url: string, isRelative = true) => {
//   const newWindow = window.open(isRelative ? `${window.location.origin}${url}` : url, '_blank', 'noopener,noreferrer');
//   if (newWindow) newWindow.opener = null;
// };

// // export const onClickUrl = (url: string): (() => void) => () => openInNewTab(url);
// // export const onClickUrl = (url: string) => openInNewTab(url);

// export const openBlobInNewTab = async (
//   id: string,
//   getDownloadUrl: (url: string) => Promise<RequestResponseObject<TypeGetDownloadUrlResp>>,
//   dispatchSetLoading?: (isLoading: boolean) => any,
//   isRelative = false
// ) => {
//   const doDispatchSetLoading = dispatchSetLoading ?? (() => null);

//   try {
//     await doDispatchSetLoading(true);
//     const response = await getDownloadUrl(id);
//     // await delay(5000);

//     if (response.success && response.data) {
//       openInNewTab(response.data.publicUrl, isRelative);
//     } else {
//       throw response.errorMessage;
//     }
//   } catch (error: any) {
//     showNotification(NOTIFICATION_TYPE.ERROR, error);
//     console.log("Exception", error);
//   } finally {
//     await doDispatchSetLoading(false);
//   }
// };

// export const openNoteAttachmentBlobInNewTab = async (id: string, dispatchSetLoading?: (isLoading: boolean) => any, isRelative = false) => {
//   openBlobInNewTab(id, getNoteDocumentDownloadUrl, dispatchSetLoading, isRelative);
// };

// export const openInvoiceBatchDocumentBlobInNewTab = async (id: string, dispatchSetLoading?: (isLoading: boolean) => any, isRelative = false) => {
//   openBlobInNewTab(id, getInvoiceBatchDocumentDownloadUrl, dispatchSetLoading, isRelative);
// };

// export const downloadCsvFileImportFormat = async (importType: IMPORT_TYPE, dispatchSetLoading?: (isLoading: boolean) => any) => {
//   const doDispatchSetLoading = dispatchSetLoading ?? (() => null);

//   try {
//     await doDispatchSetLoading(true);

//     const response = await downloadImportFileFormat(importType);

//     if (response.success && response.data) {
//       fileDownload(response.data.fileContent, response.data.fileName, response.data.contentType);
//     } else {
//       throw response.errorMessage;
//     }
//   } catch (error: any) {
//     showNotification(NOTIFICATION_TYPE.ERROR, error);
//     console.log("Exception", error);
//   } finally {
//     await doDispatchSetLoading(false);
//   }
// };

// export const issueListSortCompare: (order: "asc" | "desc") => (obj1: { data: any }, obj2: { data: any }) => number = (order) =>
//   ({ data: issuesList1 }, { data: issuesList2 }) => {
//     const item1 = (issuesList1?.props?.children ?? [])[0]?.props?.children ?? "";
//     const item2 = (issuesList2?.props?.children ?? [])[0]?.props?.children ?? "";

//     // console.log('issuesList1 :>> ', (issuesList1?.props?.children??[])[0]?.props?.children);
//     // console.log('issuesList2 :>> ', (issuesList2?.props?.children??[])[0]?.props?.children);

//     return ((item1 > item2 && order === 'asc') || (item1 < item2 && order === 'desc')) ? 1 : -1;
//   };

// // export const generateUrlWithQueryString = <T extends ObjectConstructor>(searchValues: T): string => {
// export const generateUrlWithQueryString = <T extends Record<string, any>>(searchValues: T, checkBoxFields = [] as string[]): string => {
//   let queryStr = "";

//   console.log({ searchValues });

//   Object.keys(searchValues).forEach(property => {
//     const searchValue = searchValues[property as keyof T] as any;

//     let value = "";

//     if (searchValue instanceof Date) {
//       value = formatDateToString(searchValue, "yyyy-MM-dd");
//     }

//     if (typeof searchValue === "boolean") {
//       value = searchValue ? "true" : checkBoxFields.includes(property) ? "" : "false";
//     }

//     if (typeof searchValue === "number") {
//       value = searchValue.toString();
//     }

//     if (Array.isArray(searchValue)) {
//       value = searchValue.join(",");
//     }

//     if (typeof searchValue === "string") {
//       value = searchValue;
//     }

//     if (value) {
//       queryStr += `${queryStr.length === 0 ? "?" : "&"}${property}=${value}`;
//     }
//   });

//   return queryStr;
// };

// export const loadAutocompleteLabels = async (
//   payload: TypeAutocompleteLabelRequest,
//   onSuccess: (labels: TypeAutocompleteLabels) => (void | Promise<void>)
// ) => {
//   try {
//     const response = await getAutocompleteLabels(payload);

//     if (response.success && response.data) {
//       const data = response.data;

//       await onSuccess(data);
//     } else {
//       throw response.errorMessage;
//     }
//   } catch (error: any) {
//     throw error.toString();
//   }
// };

// export const userRoleOptions = [
//   { value: ROLE.SYSTEM_ADMIN, text: "System Admin", rank: 1, weight: 1, type: "GLOBAL" },
//   { value: ROLE.OFFICE_ADMIN, text: "Office Admin", rank: 2, weight: 2, type: "GLOBAL" },
//   { value: ROLE.SUPPORT_COORDINATOR, text: "Support Coordinator", rank: 3, weight: 6, type: "MIXED" },
//   { value: ROLE.CARER, text: "Carer", rank: 4, weight: 5, type: "MIXED" },
//   { value: ROLE.DIRECTOR, text: "Director", rank: 5, weight: 3, type: "AGENCY" },
//   { value: ROLE.PLAN_MANAGER, text: "Plan Manager", rank: 6, weight: 4, type: "AGENCY" }
// ];

// export const tableUserRoleOptions = [
//   { value: ROLE.SYSTEM_ADMIN, text: "System Admin" },
//   { value: ROLE.OFFICE_ADMIN, text: "Office Admin" },
//   { value: ROLE.DIRECTOR, text: "Director" },
//   { value: ROLE.PLAN_MANAGER, text: "Plan Manager" },
//   { value: ROLE.SUPPORT_COORDINATOR, text: "Support Coordinator" },
//   { value: ROLE.CARER, text: "Carer" },
//   { value: ROLE.PARTICIPANT, text: "Participant" }
// ];

// export const bookingTypeOptions = [
//   { value: "ZSAG", text: "Standard Booking" },
//   { value: "ZPLM", text: "Plan Managed" }
// ];

// export const bookingInitiatorOptions = [
//   { value: "STAFF", text: "STAFF" },
//   { value: "PROVIDER", text: "PROVIDER" }
// ];

// // export const resolveSupportItemOptionsPrev = async (supportCategoryId: string, isPlanPaceManaged = false) => {
// //   const storageItemName = `SUPPORT_ITEM_OPTIONS_${supportCategoryId}`;
// //   let options: TypeSupportItemOptions = getLocalStorageItem(storageItemName);

// //   if (!options) {
// //     const response = await getSupportItemOptions(supportCategoryId, isPlanPaceManaged);

// //     if (response.success && response.data) {
// //       options = response.data;

// //       setLocalStorageItem(storageItemName, options);
// //     } else {
// //       throw response.errorMessage;
// //     }
// //   }

// //   return options;
// // };

// // export const resolveSupportItemOptions = async (supportCategoryId: string, isPaceManaged = false) => {
// //   const userRole = getLocalStorageItem(LOCAL_STORAGE_KEY.ROLE_ID) ?? "";
// //   const isAgencyPaceEnabled = [ROLE.SYSTEM_ADMIN, ROLE.OFFICE_ADMIN].includes(userRole)
// //     ? store.getState().shared.agencyBoard.isPaceEnabled
// //     : getLocalStorageItem(LOCAL_STORAGE_KEY.MEMBER_AGENCY_PACE_ENABLED);
// //   const isPlanPaceManaged = store.getState().shared.planBoard.isPlanPaceManaged;

// //   const storageItemName = `SUPPORT_ITEM_OPTIONS_${supportCategoryId}`;
// //   let data: TypeSupportItemOptionsLocalStorage = getLocalStorageItem(storageItemName);

// //   if (!data ||
// //     data?.extraData?.isAgencyPaceEnabled !== isAgencyPaceEnabled ||
// //     data?.extraData?.isPlanPaceManaged !== isPlanPaceManaged
// //   ) {
// //     const response = await getSupportItemOptions(supportCategoryId, isPaceManaged);

// //     if (response.success && response.data) {
// //       data = {
// //         supportItemOptions: response.data,
// //         extraData: {
// //           isAgencyPaceEnabled: isAgencyPaceEnabled,
// //           isPlanPaceManaged: isPlanPaceManaged
// //         }
// //       };

// //       setLocalStorageItem(storageItemName, data);
// //     } else {
// //       throw response.errorMessage;
// //     }
// //   }

// //   return data;
// // };

// export const resolveSupportItemOptions = async (supportCategoryId: string, isPlanPaceManaged = false) => {
//   const storageItemName = `SUPPORT_ITEM_OPTIONS_${supportCategoryId}${isPlanPaceManaged ? "_PACE" : ""}`;
//   let options: TypeSupportItemOptions = getLocalStorageItem(storageItemName);

//   if (!options) {
//     const response = await getSupportItemOptions(supportCategoryId, isPlanPaceManaged);

//     if (response.success && response.data) {
//       options = response.data;

//       setLocalStorageItem(storageItemName, options);
//     } else {
//       throw response.errorMessage;
//     }
//   }

//   return options;
// };

// export const removeNonAlphanumericCharacters = (str: string) => {
//   return str.replace(/[^a-z0-9 ]/gi, '');
// };

// export const claimTransitionEvents = [
//   { transition: "SUBMIT", event: SERVER_EVENT.CLAIM_SUBMIT },
//   { transition: "RESUBMIT", event: SERVER_EVENT.CLAIM_SUBMIT },
//   { transition: "REJECT", event: SERVER_EVENT.CLAIM_REJECT },
//   { transition: "HOLD_FOR_REVIEW", event: SERVER_EVENT.CLAIM_HOLD_FOR_REVIEW },
//   { transition: "MARK_AS_REVIEWED", event: SERVER_EVENT.CLAIM_MARK_AS_REVIEWED },
//   { transition: "REQUEST_APPROVAL", event: SERVER_EVENT.CLAIM_REQUEST_APPROVAL },
//   { transition: "APPROVE", event: SERVER_EVENT.CLAIM_APPROVE },
//   { transition: "MARK_FOR_BATCH_SUBMIT", event: SERVER_EVENT.CLAIM_MARK_FOR_BATCH_SUBMIT },
//   { transition: "UNMARK_FOR_BATCH_SUBMIT", event: SERVER_EVENT.CLAIM_UNMARK_FOR_BATCH_SUBMIT }
// ];

// export const monthOptions = [
//   { value: "1", text: "January" },
//   { value: "2", text: "February" },
//   { value: "3", text: "March" },
//   { value: "4", text: "April" },
//   { value: "5", text: "May" },
//   { value: "6", text: "June" },
//   { value: "7", text: "July" },
//   { value: "8", text: "August" },
//   { value: "9", text: "September" },
//   { value: "10", text: "October" },
//   { value: "11", text: "November" },
//   { value: "12", text: "December" }
// ];

// export const booleanOptions = [
//   // { value: "", text: "All" },
//   { value: true, text: "Yes" },
//   { value: false, text: "No" }
// ];

// export const rightStickyCellProps = (columnMeta: any) => {
//   return {
//     className: "right-sticky-col"
//   };
// };

// export const customFieldsSchemaData = (formOptionsCustomFields: TypeCustomFieldOption[]) => {

//   const customFieldsInitialValue: Record<string, any> = {};
//   const customFieldsDefaultValue: Record<string, any> = {};
//   const customFieldsJoiSchema: Record<string, any> = {};

//   formOptionsCustomFields.forEach(x => {
//     let customFieldDefaultValue: string | number | boolean | Date | null = null;
//     let customFieldInitialValue: string | number | boolean | Date | null = null;

//     let customFieldJoiSchema: joiStringSchema |
//       joiNumberSchema |
//       joiBooleanSchema |
//       joiDateSchema |
//       undefined = undefined;

//     switch (x.inputType) {
//       case CUSTOM_FIELD_INPUT_TYPE.TEXT_BOX:
//         customFieldJoiSchema = joi.string().empty("") as joiStringSchema;
//         customFieldInitialValue = "";

//         if (x.isRequired) {
//           customFieldJoiSchema = customFieldJoiSchema.required();
//           customFieldDefaultValue = "";
//         }

//         if (x.maxLength) {
//           customFieldJoiSchema = customFieldJoiSchema.max(x.maxLength);
//         }

//         break;
//       case CUSTOM_FIELD_INPUT_TYPE.TEXT_AREA:
//         customFieldJoiSchema = joi.string().empty("") as joiStringSchema;
//         customFieldInitialValue = "";

//         if (x.isRequired) {
//           customFieldJoiSchema = customFieldJoiSchema.required();
//           customFieldDefaultValue = "";
//         }

//         if (x.maxLength) {
//           customFieldJoiSchema = customFieldJoiSchema.max(x.maxLength);
//         }

//         break;
//       case CUSTOM_FIELD_INPUT_TYPE.COMBO_BOX:
//         customFieldJoiSchema = joi.string().empty("") as joiStringSchema;
//         customFieldInitialValue = "";

//         if (x.isRequired) {
//           customFieldJoiSchema = customFieldJoiSchema.required();
//           customFieldDefaultValue = "";
//         }

//         if (x.maxLength) {
//           customFieldJoiSchema = customFieldJoiSchema.max(x.maxLength);
//         }

//         break;
//       case CUSTOM_FIELD_INPUT_TYPE.NUMERIC_INPUT:
//         customFieldJoiSchema = joi.number().empty("") as joiNumberSchema;
//         customFieldInitialValue = "";

//         if (x.isRequired) {
//           customFieldJoiSchema = customFieldJoiSchema.required();
//           customFieldDefaultValue = "";
//         }

//         break;
//       case CUSTOM_FIELD_INPUT_TYPE.CHECK_BOX:
//         customFieldJoiSchema = joi.boolean() as joiBooleanSchema;
//         customFieldInitialValue = false;
//         customFieldDefaultValue = false;

//         break;
//       case CUSTOM_FIELD_INPUT_TYPE.DATE_INPUT:
//         customFieldJoiSchema = joi.date().empty(null) as joiDateSchema;
//         customFieldInitialValue = null;
//         customFieldDefaultValue = null;

//         if (x.isRequired) {
//           customFieldJoiSchema = customFieldJoiSchema.required();
//         }

//         break;
//       default:
//         break;
//     }

//     if (customFieldJoiSchema) {
//       customFieldsJoiSchema[x.id] = customFieldJoiSchema.label(x.label) as joiSchemaLike;
//       customFieldsInitialValue[x.id] = customFieldInitialValue;
//       customFieldsDefaultValue[x.id] = customFieldDefaultValue;
//     }
//   });

//   return {
//     customFieldsJoiSchema,
//     customFieldsInitialValue,
//     customFieldsDefaultValue
//   };
// };

// // https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
// /** @description Returns formatted bytes text/label, by default 2 digits.
//     * @param {number} bytes Number of bytes in integer or float.
//     * @param {number} [precision=2] How many digits after decimal point. Default value is 2.
//     * @return {string}
//   */
// export const formatBytes = (bytes: number, precision = 2) => {
//   if (bytes === 0) {
//     return '0 Bytes';
//   }

//   const KILO_BYTES = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//   const sizesIndex = Math.floor(Math.log(bytes) / Math.log(KILO_BYTES));

//   // return parseFloat((bytes / Math.pow(KILO_BYTES, sizesIndex)).toFixed(decimalPlaces)) + ' ' + sizes[sizesIndex];
//   return parseFloat(roundValue(bytes / Math.pow(KILO_BYTES, sizesIndex), precision).toString()) + ' ' + sizes[sizesIndex];
// };

// export const filterChipStringBuilder = (filterParams: TypeSingleFilterModel) => {
//   const filterType = filterParams.filterType;
//   const filterValue = filterParams?.filter ?? "";
//   const comparator = filterParams?.type ?? "";
//   let label = "";

//   const comparatorText = getFilterComparatorText(filterType as FILTER_TYPE, comparator as FILTER_COMPARATOR_TYPE);

//   // "blank", "notBlank" is common to all type of filters
//   if (["blank", "notBlank"].includes(comparator)) {
//     label = `${comparatorText}`;
//   } else {
//     if (filterType === FILTER_TYPE.TEXT) { // Text filter
//       label = `${comparatorText} '${filterValue}'`;
//     } else { // Date/Number filter
//       if (filterType === FILTER_TYPE.DATE) { //Date filter
//         if (comparator === "inRange") {
//           label = `Between ${formatDateToString(filterParams.dateFrom)} and ${formatDateToString(filterParams.dateTo)}`;
//         } else {
//           label = `${comparatorText} ${formatDateToString(filterParams.dateFrom)}`;
//         }
//       } else { // Number filter
//         if (comparator === "inRange") {
//           label = `Between ${filterValue} and ${filterParams.filterTo}`;
//         } else {
//           label = `${comparatorText} '${filterValue}'`;
//         }
//       }
//     }
//   }

//   return label;
// };

// export const getFilterComparatorText = (filterType: FILTER_TYPE, comparator: FILTER_COMPARATOR_TYPE) => {
//   if (["lessThan", "greaterThan"].includes(comparator)
//     && filterType === FILTER_TYPE.DATE) {
//     comparator = `${comparator}${capitalize(filterType)}` as FILTER_COMPARATOR_TYPE;
//   }

//   const index = Object.keys(FILTER_COMPARATOR_TYPE).indexOf(comparator);
//   const value = Object.values(FILTER_COMPARATOR_TYPE)[index] ?? "";

//   return value;
// };

// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}