import { loginNamicoImg } from '@app/assets/images';
import { RightToBracketIcon } from '@app/assets/images/icons';
import Button from '@app/components/Button';
import Input from '@app/components/Input';
import { APP_ROUTES, UserTypes, defaultCompanyCode } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { requestSignUp } from '@app/services';
import { ISignUp } from '@app/types/AuthTypes';
import { ToastType, showToast } from '@app/utils/toastUtils';
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getLogoByRegion, getTermsOfUseLink, getPrivacyPolicyLink } from '@app/utils/helper';
// import { getLogoByRegion } from '@app/utils/helper';

const Signup: React.FC = () => {
  const { translate } = useLocalization();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationsErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //company specific ids
  //TODO: fetch other than query param

  const companyCode = searchParams.get('companyCode') || defaultCompanyCode;
  const isFormValid = userName && email && password && confirmPassword;

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

  const onHandleSignup = async () => {
    //check if valdation errors
    if (Object.keys(validationErrors).length > 0) return;

    const payload: ISignUp = {
      email,
      password,
      username: userName,
      userType: UserTypes.USER, //DEFAILT USER
      companyCode,
    };

    setIsLoading(true);
    try {
      await requestSignUp(payload).then((resp) => {
        //success reponse
        showToast(ToastType.Success, translate('signup.success_message'));
        navigate(APP_ROUTES.login);
      });
    } catch (err) {
      console.error('Error while register', err);
    }
    setIsLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-custom-gradient flex items-center justify-center rounded-bl-curved-bottom rounded-br-curved-bottom">
        <div className="flex flex-col items-center justify-center">
          <img src={getLogoByRegion()} alt="logo" className="sm:w-full w-[189.22px]" />
          <img src={loginNamicoImg} alt="logo" className="sm:w-full w-[294px]" />
        </div>
      </section>
      <section>
        <div className="container mx-auto py-5 sm:px-0 px-3">
          <h1 className="font-inter font-semibold text-2xl leading-7 text-center text-primary-color">
            {translate('signup.intro')}
          </h1>
          <div className="lg:w-3/5 sm:w-4/5 w-full mx-auto py-5">
            <Input
              label={translate('login.email')}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={setEmail}
              isRequired={true}
              isDisabled={false}
              containerClassNames="mb-4"
              placeholder={translate('login.email_placeholder')}
              validate={{
                regex:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                errorMessage: translate('signup.validation_error_messages.email'),
              }}
              onValidationError={onValidationError}
            />
            <Input
              label={translate('login.username')}
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={setUserName}
              isRequired={true}
              isDisabled={false}
              containerClassNames="mb-4"
              placeholder={translate('login.username_placeholder')}
            />
            <Input
              label={translate('signup.password')}
              type="password"
              id="newpass"
              name="newpass"
              value={password}
              onChange={setPassword}
              isDisabled={false}
              isRequired={true}
              containerClassNames="mb-4"
              placeholder={translate('signup.password_placeholder')}
              validate={{
                regex: /^.{6,}$/,
                errorMessage: translate('signup.validation_error_messages.password'),
              }}
              onValidationError={onValidationError}
            />
            <Input
              label={translate('signup.confirm_password')}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={setConfirmPassword}
              isRequired={true}
              containerClassNames="mb-4"
              placeholder={translate('signup.confirm_password_placeholder')}
              validate={{
                validate: () => password === confirmPassword,
                errorMessage: translate('signup.validation_error_messages.confirm_password'),
              }}
              onValidationError={onValidationError}
            />
            <Button
              label={translate('signup.btn_label')}
              isLoading={isLoading}
              onClick={onHandleSignup}
              rightIcon={<RightToBracketIcon />}
              disabled={!isFormValid}
            />
          </div>
          <div className="text-center"></div>
          <div className="mt-8 text-center flex flex-col items-center justify-center">
            <Link
              to={APP_ROUTES.login}
              className="font-inter font-normal sm:text-lg text-sm leading-[21px] text-dark-grey hover:underline"
            >
              {translate('forget_password.already_have')}
            </Link>
            <p className="font-inter font-semibold sm:text-sm text-xs leading-[21px] text-dark-grey">
              {translate('terms_conditions.first_dec')}
              <span
                onClick={() => (window.location.href = getTermsOfUseLink())}
                className="font-inter font-semibold sm:text-sm text-xs leading-[21px] text-dark-grey underline"
              >
                {translate('terms_conditions.terms_of_user')}
              </span>
              {translate('terms_conditions.and')}
              <span
                onClick={() => (window.location.href = getPrivacyPolicyLink())}
                className="font-inter font-semibold sm:text-sm text-xs leading-[21px] text-dark-grey underline"
              >
                {translate('terms_conditions.privacy_policy')}
              </span>
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Signup;
