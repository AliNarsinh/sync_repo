import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import { LANGS_EN, LANGS } from '@app/constants';

export const getDateLanguage = (language: string): string => {
  if (language === LANGS.ENGLISH) {
    return LANGS_EN.ENGLISH;
  } else if (language === LANGS.RUSSIAN) {
    return LANGS_EN.RUSSIAN;
  } else {
    return LANGS_EN.ENGLISH;
  }
};

export const formatDateTime = (dateTime: string, language: string) => {
  dayjs.locale(language);
  return dayjs(dateTime).format('hh:mm a MMMM DD, YYYY');
};

export const utcToDateformate = (date: string, language: string) => {
  dayjs.locale(language);
  const parsedDate = dayjs(date);
  const formattedTimestamp = parsedDate.format('hh:mm a MMMM DD, YYYY');
  return formattedTimestamp;
};
