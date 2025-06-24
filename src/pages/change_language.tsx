import BottomNavigationWrapper from '@app/components/BottomNavigationWrapper';
import Navbar from '@app/components/Navbar';
import { APP_ROUTES, LANGS } from '@app/constants';
import { useLocalization } from '@app/hooks';
import useAuth from '@app/hooks/useAuth';
import { useTypedDispatch, useTypedSelector } from '@app/store';
import { changeLanguage as changeLang } from '@app/store/actions';
import { useState } from 'react';
import { Ru, Us } from 'react-flags-select';

const ChangeLanguage = () => {
  const { translate, changeLanguage } = useLocalization();
  const { isAuthenticated } = useAuth();
  const { language } = useTypedSelector((state) => state.lang);
  const dispatch = useTypedDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState<any>(language);

  // Unified handle function for radio buttons and switch
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    changeLanguage(value);
    dispatch(changeLang(value));
  };

  const renderComponent = () => {
    return (
      <>
        {isAuthenticated ? (
          <></>
        ) : (
          <Navbar title={translate('change_Language.switch_language')} backRoute={APP_ROUTES.login} />
        )}

        <div className="py-4 px-3">
          <h2 className="font-inter font-semibold text-xl leading-[28px] text-primary-color">
            {translate('change_Language.switch_language')}
          </h2>
          <div className="language-switch">
            <div className="mt-4 flex-col flex items-center justify-noraml">
              <label className="flex items-center justify-between w-full border-b border-[#dedede] py-3 px-3">
                <div className="flex items-center gap-2">
                  <Us className="w-10 h-10" />{' '}
                  <h6 className="font-inter font-semibold text-base leading-[28px] text-primary-color">
                    {translate('change_Language.english_language')}
                  </h6>
                </div>
                <input
                  type="radio"
                  value={LANGS.ENGLISH}
                  checked={selectedLanguage === LANGS.ENGLISH}
                  onChange={() => handleLanguageChange(LANGS.ENGLISH)}
                  className="  form-radio text-primary-color focus:ring-0 w-5 h-5 outline-norussiane focus:ring-primary-color"
                />
              </label>
              <label className="flex items-center justify-between w-full border-b border-[#dedede] py-3 px-3">
                <div className="flex items-center gap-2">
                  <Ru className="w-10 h-10" />
                  <h6 className="font-inter font-semibold text-base leading-[28px] text-primary-color">
                    {translate('change_Language.russia_language')}
                  </h6>
                </div>
                <input
                  type="radio"
                  value={LANGS.RUSSIAN}
                  checked={selectedLanguage === LANGS.RUSSIAN}
                  onChange={() => handleLanguageChange(LANGS.RUSSIAN)}
                  className="form-radio text-primary-color focus:ring-0 w-5 h-5 outline-none focus:ring-primary-color"
                />
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };
  if (isAuthenticated) {
    return <BottomNavigationWrapper>{renderComponent()}</BottomNavigationWrapper>;
  }
  return renderComponent();
};

export default ChangeLanguage;
