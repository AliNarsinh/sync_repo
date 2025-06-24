import { useTranslation } from 'react-i18next';

const useLocalization = () => {
  const { t: translate, i18n } = useTranslation();

  const changeLanguage = (lang: any) => {
    i18n.changeLanguage(lang);
  };

  return { translate, changeLanguage, i18n };
};

export default useLocalization;
