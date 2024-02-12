import { toast } from 'react-toastify';
import muiCapitalize from '@mui/utils/capitalize';
import {
  cloneDeep as lodashCloneDeep,
  isEqual as lodashIsEqual,
  isArray as lodashIsArray,
  round as lodashRound,
  camelCase as lodashCamelCase,
  uniq as lodashUniq
} from 'lodash';
import {
  format as dfFormat,
  parse as dfParse,
  addDays as dfAddDays,
  differenceInCalendarDays as dfDifferenceInCalendarDays,
  differenceInMinutes as dfDifferenceInCalendarMinutes
} from 'date-fns';
import { getType } from 'mime';

/**
 * @description Check if item is an array, not object
 * @param  {any} item item to check
 * @param  {string} [type] type of item
 */
export const checkIsArray = (items: any, type?: string) => {
  // console.log('items :>> ', items);
  if (type) {
    return lodashIsArray(items) && items.every(item => typeof item === type);
  }

  return lodashIsArray(items);
  // return Array.isArray(items);
};

/**
 * @description check if item is an object, not array
 * @param {any} item item to check
 */
export const checkIsObject = (obj: any) => {
  return typeof obj === 'object' &&
    !Array.isArray(obj) &&
    obj !== null;
};

/**
 * @description check if string is JSON parsable
 * @param {string} str item to check
 */
export const checkIsJsonParsable = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const checkIsValidDate = (date: any, isUseConstructor = true) => {
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

/**
 * @description: check if two items are equal
 * @param  {any} item1 first item
 * @param  {any} item2 second item
 * @return {boolean} true if two items are equal
 */
export const checkAreEqual = (item1: any, item2: any) => {
  let parsedItem1 = item1;
  let parsedItem2 = item2;

  // if (checkIsArray(item1) && checkIsArray(item2)) {
  //   parsedItem1 = lodashSortBy([...item1]);
  //   parsedItem2 = lodashSortBy([...item2]);
  // }

  // console.log('parsedItem1 & parsedItem2 :>> ', { parsedItem1, parsedItem2 });

  return lodashIsEqual(parsedItem1, parsedItem2);
};

/**
 * @param  {string} title Set title of a page
 */
export const setPageTitle = (title: string) => {
  document.title = title;
};

/**
 * @param  {number} ms milliseconds to wait
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @description storage event is dispatched when a new value is added or removed from local storage
 */
export const dispatchStorageEvent = () => {
  window.dispatchEvent(new StorageEvent('storage'));
};

/**
 * @description set localStorage item
 * @param  {string} key - key of stored value
 * @param  {any} value - value to store
 */
export const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
  dispatchStorageEvent();
};

/**
 * @description get localStorage item
 * @param  {string} key - key of stored value
 * @returns {any} stored value
 */
export const getLocalStorageItem = (key: string) => {
  let value = null;
  const parsedValue = localStorage.getItem(key);
  // console.log({ parsedValue });

  if (parsedValue && !["null", "undefined"].includes(parsedValue)) {
    value = JSON.parse(parsedValue);
  }

  return value;
};

/**
 * @description remove localStorage item
 * @param  {string} key - key of stored value
 */
export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
  dispatchStorageEvent();
};

export const capitalize = muiCapitalize;

export const makeCamelCase = lodashCamelCase;

/**
 * @param  {string} str - string to be pascal cased
 * @param  {boolean} [isWithSpace] - if true, will add space between words. Default is true
 * @returns string
 */
export const makePascalCase = (str?: string, isWithSpace = true): string => {
  if (!str) return "";

  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(isWithSpace ? " " : "");
};

export const isNullOrEmpty = (value: any, placeholder?: any) => {
  return (value ?? "") === "" ? (placeholder === undefined ? "" : placeholder) : value;
};

export const isNull = (value: any, placeholder: any) => {
  if (value != null) {
    return value;
  }

  return placeholder === undefined ? "" : placeholder;
};

export const isEmpty = (value: any, placeholder?: any) => {
  if (value !== "") {
    return value;
  }

  return placeholder === undefined ? "" : placeholder;
};

export const getFileExtension = (fileName: string) => {
  return fileName.split('.').pop();
};

export const getFileNameWithoutExtension = (fileName: string) => {
  return fileName.substring(0, fileName.lastIndexOf('.'));
};

export const getFileExtensionFromMimeType = (mimeType: string) => {
  return mimeType.split('/').pop();
};

export const getMimeTypeFromFileExtension = (extension: string) => {
  return getType(extension);
};

export const getCategoryExtensions = (category: string) => {
  const allExtensions: Record<string, string[]> = {
    DOCUMENT: ["pdf", "txt", "doc", "docx", "xls", "xlsx", "csv"],
    IMAGE: ["png", "jpg", "jpeg", "bmp", "gif", "tif"],
    AUDIO: ["mp3", "wav", "3gp"],
    VIDEO: ["avi", "wmv", "mpg", "mpeg", "mp4", "m4v", "m4p", "mov", "flv"]
  };

  return allExtensions[category];
};

export const validateFileType = (file: File, fileTypes: string[]) => {
  const result = { isValid: true, errorMessage: "" };

  const fileExtension = getFileExtension(file.name);

  // #region Check file size
  /* const category = getFileCategory(file.name);

  const maxFileSize = category === "video"
    ? config.MAX_ATTACHMENT_SIZE_VIDEO
    : config.MAX_ATTACHMENT_SIZE_FILE;

  if (file.size > maxFileSize) {
    result.isValid = false;
    result.errorMessage = `Please select a file smaller than ${maxFileSize / 1000000} MB.`;
  } */
  // #endregion

  // if ((acceptFileExtensions && acceptFileExtensions.length !== 0) || !fileTypes.includes(`.${fileExtension}`)) {
  if (!fileTypes.includes(`.${fileExtension}`)) {
    result.isValid = false;
    result.errorMessage = `${result.errorMessage} Selected file type is not allowed`;
  }

  return result;
};

export const formatCurrency = (value?: number, IsWrapNegativeWithBracket = true) => {
  if (value == null)
    return "";

  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  let formattedValue = nf.format(value);

  if (value < 0 && IsWrapNegativeWithBracket) {
    formattedValue = `(${nf.format(Math.abs(value))})`;
  }

  return formattedValue;
};

export const formatCurrencyNoFractions = (value?: number, IsWrapNegativeWithBracket = true) => {
  if (value == null)
    return "";

  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  let formattedValue = nf.format(value);

  if (value < 0 && IsWrapNegativeWithBracket) {
    formattedValue = `(${nf.format(Math.abs(value))})`;
  }

  return formattedValue;
};

export const getPercentageFromRatio = (value: string | number, precision = 0) => {
  return roundValue(parseFloat(value.toString()) * 100, precision);
};

export const formatDateTime = (date: Date) => {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minute;
};

/**
 * @param  {string|number|Date} date - Date to be formatted
 * @param  {string} [format=dd/MM/yyyy] - Format to be used, default is "dd/MM/yyyy"
 * @return {string} - Formatted date
 */
export const formatDateToString = (date?: string | number | Date | null, format = "dd/MM/yyyy") => {
  // console.log({ date });

  // return (moment(new Date(date)).format(format)).toString();
  if (!date) {
    return "";
  }

  return dfFormat(new Date(date), format);
};

export const formatDateStringToDate = (date: string, format = "yyyyMMdd") => { //20201025 => Date
  // return (new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`));
  // https://date-fns.org/v2.17.0/docs/parse#examples
  // return dfParse(date, format, new Date());
  return formatUtcToLocalDate(dfParse(date, format, new Date()));
};

export const formatDateWithoutTimePart = (date: string | number | Date, isUseLocal = true) => {
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

export const formatUtcToLocalDate = (utcDate: string | number | Date = new Date()) => {
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

export const formatLocalToUtcDate = (localDate = new Date()) => {
  const localToUtcDateTime = new Date(localDate);

  const extraMinutes = localToUtcDateTime.getUTCHours() * 60 + localToUtcDateTime.getUTCMinutes();
  const offsetMinutes = localToUtcDateTime.getTimezoneOffset();

  if (extraMinutes !== 0) {
    localToUtcDateTime.setMinutes(localToUtcDateTime.getMinutes() - offsetMinutes);
  }

  // console.log('offsetMinutes :>> ', offsetMinutes);
  // console.log('extraMinutes :>> ', extraMinutes);
  // console.log('localToUtcDateTime :>> ', localToUtcDateTime);

  return localToUtcDateTime;
};

export const convertTimeZone = (date: string | number | Date, tzString: string) => {
  return (new Date((["string", "number"].includes(typeof date) ? new Date(date) : date)).toLocaleString("en-US", { timeZone: tzString }));
};

export const addDaysToDate = (date = Date.now(), amount = 0) => {
  return dfAddDays(new Date(date), amount);
};

export const calcDateDiffInDays = (startDate: string | number | Date, endDate: string | number | Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return dfDifferenceInCalendarDays(end, start);
};

export const calculateDateDiffInMin = (startDate: string | number | Date, endDate?: string | number | Date) => {
  const start = new Date(startDate);
  const end = endDate == null ? new Date() : new Date(endDate);

  start.setSeconds(0);
  end.setSeconds(0);

  // var difference = end.getTime() - start.getTime();
  // return Math.round(difference / 60000);

  return dfDifferenceInCalendarMinutes(end, start);
};

export const formatDateDiffMinutesToText = (totalMinutes: number) => {
  const minutesInDay = 60 * 24;
  const days = Math.floor(totalMinutes / minutesInDay);
  const hours = Math.floor((totalMinutes % minutesInDay) / 60);
  const minutes = Math.round(totalMinutes % 60);

  //console.log("dd/hh/mm", days + ":" + hours + ":" + minutes);

  let label = "";
  const daysLabel = days === 0
    ? ""
    : days === 1
      ? days + " day "
      : days + " days ";

  label += daysLabel;

  const hoursLabel = hours === 0
    ? ""
    : hours === 1
      ? hours + " hour "
      : hours + " hours ";

  label += hoursLabel;

  const minutesLabel = totalMinutes > 59 && minutes === 0
    ? ""
    : minutes === 1
      ? minutes + " min"
      : minutes + " mins";

  label += minutesLabel;

  return label.trim();
};

/** @description Returns the rounded float value using Math.round(), by default 2 digits.
    * @param {String|number} value Input value field. Can be string or integer or float.
    * @param {number} [precision=2] How many digits after decimal point. Default value is 2.
    * @return {number}
  */
export const roundValue = (value: string | number, precision = 2) => {
  return lodashRound(parseFloat(value.toString()), precision);
};

export const arrayToObject = (array: any[], keyField = "key") => {
  return array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

  // example: const peopleObject = arrayToObject(peopleArray, "id")
};

/**
 * @param  {any} jsonObject The object to be modified
 * @param  {} extraSubStrings An array of strings to be removed from the keys. e.g. ["_", "-", "plan_"]
 * @param  {} extraReplacer A string to replace the extraSubStrings. Default is ""
 */
export const replaceJsonKey = (jsonObject: any, extraSubStrings = [], extraReplacer = "") => {
  const underscoreSpecifyFormat = (str: string) => {
    if (Array.isArray(extraSubStrings)) {
      extraSubStrings.forEach(extraSubstr => {
        if (extraSubstr !== "") {
          str = str.replaceAll(extraSubstr, extraReplacer);
        }
      });
    }

    str = str.replace(/^([A-Z])/, (_, v) => v.toLowerCase()).replace(/(_)(.)/g, (_, __, v) => v.toUpperCase());

    return str;
  };

  const formatObject = (value: any): any => {
    if ((typeof value) === "object") {
      // if (value?.constructor === {}.constructor) {
      if (checkIsObject(value)) {
        return replaceJsonKey(value ?? "", extraSubStrings, extraReplacer);
      }

      // if (value?.constructor === [].constructor) {
      if (checkIsArray(value)) {
        return (value ?? []).map((x: any) => replaceJsonKey(x, extraSubStrings, extraReplacer));
      }
    }

    return value ?? "";
  };

  const resultObject = Object.fromEntries(Object.entries(jsonObject).map(([key, value]) => [underscoreSpecifyFormat(key), formatObject(value)]));
  return resultObject;
};

export const reorderArray = (list: any[], sourceIndex: number, destinationIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
};

export const makeUniqueArray = <T extends string | number | boolean>(inputArray: T[]) => {
  return lodashUniq(inputArray);
};

export const showNotification = (type: "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "DEFAULT", message: string, timerMilliseconds?: number, isShowInPublicPage?: boolean) => {
  if (!message) {
    return;
  }

  toast(message, {
    type: toast.TYPE[type],
    autoClose: timerMilliseconds ?? 5000,
  });
};

export const openInNewTab = (url: string, isRelative = true) => {
  const newWindow = window.open(isRelative ? `${window.location.origin}${url}` : url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const generateUrlWithQueryString = <T extends Record<string, any>>(searchValues: T, checkBoxFields = [] as string[]): string => {
  let queryStr = "";

  console.log({ searchValues });

  Object.keys(searchValues).forEach(property => {
    const searchValue = searchValues[property as keyof T] as any;

    let value = "";

    if (searchValue instanceof Date) {
      value = formatDateToString(searchValue, "yyyy-MM-dd");
    }

    if (typeof searchValue === "boolean") {
      value = searchValue ? "true" : checkBoxFields.includes(property) ? "" : "false";
    }

    if (typeof searchValue === "number") {
      value = searchValue.toString();
    }

    if (Array.isArray(searchValue)) {
      value = searchValue.join(",");
    }

    if (typeof searchValue === "string") {
      value = searchValue;
    }

    if (value) {
      queryStr += `${queryStr.length === 0 ? "?" : "&"}${property}=${value}`;
    }
  });

  return queryStr;
};

export const removeNonAlphanumericCharacters = (str: string) => {
  return str.replace(/[^a-z0-9 ]/gi, '');
};

export const monthOptions = [
  { value: "1", text: "January" },
  { value: "2", text: "February" },
  { value: "3", text: "March" },
  { value: "4", text: "April" },
  { value: "5", text: "May" },
  { value: "6", text: "June" },
  { value: "7", text: "July" },
  { value: "8", text: "August" },
  { value: "9", text: "September" },
  { value: "10", text: "October" },
  { value: "11", text: "November" },
  { value: "12", text: "December" }
];

export const booleanOptions = [
  // { value: "", text: "All" },
  { value: true, text: "Yes" },
  { value: false, text: "No" }
];

// return the authToken from the local storage
export const getAuthToken = () => {
  return localStorage.getItem('authToken') || null;
}

// remove the authToken from the local storage
export const removeUserSession = () => {
  localStorage.removeItem('authToken');
}

// set the authToken and user from the local storage
export const setUserSession = (authToken: string) => {
  localStorage.setItem('authToken', authToken);
}