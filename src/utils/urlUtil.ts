import { isArray, isObject, map } from 'lodash';

export const appendQueryParams = (url: string, paramsObj: Record<string, any>) => {
  const paramsArr: Array<string> = [];
  Object.keys(paramsObj).forEach((key) => {
    if (Array.isArray(paramsObj[key])) {
      paramsObj[key].forEach((paramsVal: string) => {
        paramsArr.push(`${key}[]=${paramsVal}`);
      });
    } else {
      paramsArr.push(`${key}=${paramsObj[key]}`);
    }
  });
  const newUrl = `${url}?${paramsArr.join('&')}`;
  return newUrl;
};
export const appendRouteParams = (url: string, paramsObj: Record<string, any>) => {
  const paramsArr: Array<string> = [];
  Object.keys(paramsObj).forEach((key) => {
    if (Array.isArray(paramsObj[key])) {
      paramsObj[key].forEach((paramsVal: string) => {
        paramsArr.push(`${paramsVal}`);
      });
    } else {
      paramsArr.push(`${paramsObj[key]}`);
    }
  });
  const newUrl = `${url}?${paramsArr.join('/')}`;
  return newUrl;
};

export const buildQueryParamsFromJson = (jsonData: Record<string, any>) => {
  if (!isObject(jsonData)) {
    throw new Error('Input must be an object');
  }

  function buildParams(value: any, key: string) {
    if (isArray(value)) {
      return value.map((item: string) => `${key}[]=${item}`).join('&');
    } else if (isObject(value)) {
      return Object.entries(value)
        .map(([subKey, subValue]) => `${key}[${subKey}]=${subValue}`)
        .join('&');
    } else {
      return `${key}=${value}`;
    }
  }

  return `?${map(jsonData, buildParams).join('&')}`;
};
