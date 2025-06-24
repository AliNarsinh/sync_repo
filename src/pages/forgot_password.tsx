import { loginNamicoImg, logoImg } from '@app/assets/images';
import Button from '@app/components/Button';
import Input from '@app/components/Input';
import { useLocalization } from '@app/hooks';
import { forgetPassword } from '@app/services';
import { getPrivacyPolicyLink, getTermsOfUseLink } from '@app/utils/helper';
import { ToastType, showToast } from '@app/utils/toastUtils';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const { translate } = useLocalization();
  const [email, setEmail] = useState('');
  const [validationErrors, setValidationsErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const onHandleForgotpassword = async () => {
    //check if valdation errors
    if (Object.keys(validationErrors).length > 0) return;
    setIsLoading(true);
    try {
      await forgetPassword(email);
      showToast(ToastType.Success, translate('reset_password.link_sent'));
    } catch (error: any) {
      //no need to show toast, as we have global intercepter to show it
      console.error('Error while forget password', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-custom-gradient flex items-center justify-center rounded-bl-curved-bottom rounded-br-curved-bottom">
        <div className="flex flex-col items-center justify-center">
          <img src={logoImg} alt="logo" className="sm:w-full w-[189.22px]" />
          <img src={loginNamicoImg} alt="logo" className="sm:w-full w-[294px]" />
        </div>
      </section>
      <section>
        <div className="container mx-auto py-5 sm:px-0 px-3 flex flex-col gap-10">
          <h1 className="font-inter font-semibold text-2xl leading-7 text-center text-primary-color">
            {translate('forget_password.intro')}
          </h1>
          <div className="lg:w-3/5 sm:w-4/5 w-full mx-auto py-5">
            <Input
              label={translate('login.email')}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={setEmail}
              containerClassNames="mb-4"
              isRequired={true}
              placeholder={translate('login.email_placeholder')}
              validate={{
                regex:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                errorMessage: translate('signup.validation_error_messages.email'),
              }}
              onValidationError={onValidationError}
            />
            <Button label="Reset Password" isLoading={isLoading} onClick={onHandleForgotpassword} disabled={!email} />
          </div>

          <div className="mt-8 text-center flex gap-1 items-center justify-center">
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
        </div>
      </section>
    </motion.div>
  );
};

export default ForgotPassword;
