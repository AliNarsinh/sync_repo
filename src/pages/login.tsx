import { loginNamicoImg } from '@app/assets/images';
import { LockIcon, MailIcon, RightToBracketIcon } from '@app/assets/images/icons';
import Button from '@app/components/Button';
import Input from '@app/components/Input';
import SwitchLanguage from '@app/components/Switch';
import { APP_ROUTES, LANGS, UserTypes } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { requestLogin } from '@app/services/AuthService';
import { useTypedDispatch, useTypedSelector } from '@app/store';
import { changeLanguage as changeLang, login, loginFailed } from '@app/store/actions';
import { getCompanyName, getLogoByRegion, getPrivacyPolicyLink, getTermsOfUseLink } from '@app/utils/helper';
import { setSentryUser } from '@app/utils/sentryUtil';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { translate } = useLocalization();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationsErrors] = useState<Record<string, string>>({});
  const { language } = useTypedSelector((state) => state.lang);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const isFormValid = userName && password;
  const [selectedLanguage, setSelectedLanguage] = useState<any>(language);
  const checkRus = getLogoByRegion().includes('logo-rus');
  const isRussian = selectedLanguage === LANGS.RUSSIAN;

  const onValidationError = (name: string, error: string) => {
    const _validationErrors = validationErrors;
    if (error) {
      _validationErrors[name] = error;
      setValidationsErrors(_validationErrors);
    } else {
      delete _validationErrors[name]; //TODO figure out better way
      setValidationsErrors(_validationErrors);
    }
  };

  const onHandleLogin = async () => {
    //check if valdation errors
    if (Object.keys(validationErrors).length > 0) return;
    setIsLoading(true);
    try {
      const response = await requestLogin({
        email: userName,
        password: password,
        userType: UserTypes.USER,
      });
      const { user, tokens } = response?.data as Record<string, any>;
      const { access, refresh } = tokens;
      const expiresAt = Date.now() + access?.expires;
      const refreshToken = refresh?.token;

      if (user && access?.token) {
        setSentryUser(userName);
        dispatch(login(true, user, access?.token, expiresAt, refreshToken));

        const hasFirstName = user.firstName !== null && user.firstName !== undefined;
        const hasLastName = user.lastName !== null && user.lastName !== undefined;

        if (!hasFirstName && !hasLastName) {
          navigate(APP_ROUTES.profile);
        } else {
          navigate(APP_ROUTES.home);
        }
      }
    } catch (error: any) {
      dispatch(loginFailed(false, null, null));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirection = () => {
    navigate(APP_ROUTES.signup);
  };

  const handleLanguageToggle = () => {
    const newLanguage = isRussian ? LANGS.ENGLISH : LANGS.RUSSIAN;
    setSelectedLanguage(newLanguage);
    dispatch(changeLang(newLanguage));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-custom-gradient flex-col flex items-center justify-center rounded-bl-curved-bottom rounded-br-curved-bottom">
        <div className="w-full flex justify-end p-5">
          <SwitchLanguage isChecked={isRussian} onHandleChange={handleLanguageToggle} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={getLogoByRegion()} alt="logo" className={`sm:w-full w-[250px] ${checkRus && 'mt-8'}`} />
          <img src={loginNamicoImg} alt="logo" className="sm:w-full w-[294px]" />
        </div>
      </section>
      <section>
        <div className="container mx-auto py-5 sm:px-0 px-3 flex flex-col gchangeLanguageap-10">
          <h1 className="font-inter font-semibold text-2xl leading-7 text-center text-primary-color">
            {`${translate('login.intro')} ${getCompanyName()}`}
          </h1>
          <div className="lg:w-3/5 sm:w-4/5 w-full mx-auto py-5">
            <Input
              label={translate('login.email')}
              type="email"
              id="email"
              name="email"
              value={userName}
              onChange={setUserName}
              containerClassNames="mb-4"
              placeholder={translate('login.email_placeholder')}
              rightIcon={<MailIcon />}
              isRequired={true}
              isDisabled={false}
              validate={{
                regex:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                errorMessage: translate('signup.validation_error_messages.email'),
              }}
              onValidationError={onValidationError}
            />
            <Input
              label={translate('login.password')}
              type="password"
              id="pass"
              name="pass"
              value={password}
              onChange={setPassword}
              containerClassNames="mb-4"
              placeholder={translate('login.password_placeholder')}
              rightIcon={<LockIcon />}
              isRequired={true}
              isDisabled={false}
              validate={{
                regex: /^.{6,}$/,
                errorMessage: translate('signup.validation_error_messages.password'),
              }}
              onValidationError={onValidationError}
            />
            <div className="flex flex-col text-center gap-2">
              <Button
                label={translate('login.btn_label')}
                isLoading={isLoading}
                onClick={onHandleLogin}
                rightIcon={<RightToBracketIcon />}
                disabled={!isFormValid}
              />
              <Button label={translate('signup.btn_label')} onClick={handleRedirection} disabled={isLoading} />
              {/* <Link
                to={APP_ROUTES.forgot_password}
                className="font-inter font-normal sm:text-lg text-sm leading-[21px] text-dark-grey hover:underline"
              >
                {translate('forget_password.link')}
              </Link> */}
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center text-center">
            {/* <Link
              to={APP_ROUTES.signup}
              className="font-inter font-normal sm:text-lg text-sm leading-[21px] text-dark-grey hover:underline"
            >
              {translate('register.dont_have')}
            </Link> */}
            <div className="flex items-center justify-center gap-1">
              <a
                href={getPrivacyPolicyLink()}
                className="font-inter font-semibold sm:text-sm text-xs leading-[21px] text-dark-grey hover:underline"
              >
                {translate('terms_conditions.privacy_policy')} |
              </a>
              <a
                href={getTermsOfUseLink()}
                className="font-inter font-semibold sm:text-sm text-xs leading-[21px] text-dark-grey hover:underline"
              >
                {translate('terms_conditions.Term_use')}
              </a>
            </div>
            <Link
              to={APP_ROUTES.change_language}
              className="font-inter font-semibold sm:text-sm text-xs leading-[21px] text-dark-grey hover:underline"
            >
              {translate('change_Language.switch_language')}
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Login;
