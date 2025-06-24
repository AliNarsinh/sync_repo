import { bookmark, bookmarkRus, logoImg, logoRus2, marklogo } from '@app/assets/images';
import { GenderType, IS_RUSSIAN } from '@app/constants';
import { Sex } from '@binah/web-sdk';

export const getBinahGender = (gender: GenderType) => {
  if (gender === GenderType.MALE) {
    return Sex.MALE;
  } else if (gender === GenderType.FEMALE) {
    return Sex.FEMALE;
  } else {
    return Sex.UNSPECIFIED;
  }
};

export const getLogoByRegion = () => {
  return !IS_RUSSIAN ? logoImg : logoRus2;
};

const termlifelinq = 'https://lifelinq.ai/terms-of-use-app';
const termMobilemed = 'https://mobilemed.ai/terms-of-use-app';

const privacyLifelinq = 'https://lifelinq.ai/privacy-for-app';
const privacyMobilemed = 'https://mobilemed.ai/privacy-for-app';

export const getTermsOfUseLink = () => {
  return !IS_RUSSIAN ? termlifelinq : termMobilemed;
};

export const getPrivacyPolicyLink = () => {
  return !IS_RUSSIAN ? privacyLifelinq : privacyMobilemed;
};

export const getBookMarkByRegion = () => {
  return !IS_RUSSIAN ? bookmark : bookmarkRus;
};

export const getLogoMark = () => {
  return !IS_RUSSIAN ? marklogo : bookmarkRus;
};

export const getCompanyName = () => {
  return !IS_RUSSIAN ? 'LIFELINQ.AI' : 'MOBILEMED.AI';
};

export const calculateAge = (birthYear: number) => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
};

export function splitNumberedParagraph(paragraph: string) {
  if (!paragraph) return { beforeList: '', listItems: [] };

  const [beforeList, ...rawItems] = paragraph.split(/(?=\d+\.\s)/);
  const listItems = rawItems.map((item) => item.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);

  return { beforeList, listItems };
}
