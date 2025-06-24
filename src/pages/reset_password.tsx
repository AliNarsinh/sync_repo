import { loginNamicoImg } from '@app/assets/images';
import Button from '@app/components/Button';
import Input from '@app/components/Input';
import { APP_ROUTES } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { resetPassword } from '@app/services';
import { getLogoByRegion, getPrivacyPolicyLink, getTermsOfUseLink } from '@app/utils/helper';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const { translate } = useLocalization();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationsErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isFormValid = password && confirmPassword;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get('token');

  if (!resetPasswordToken) {
    navigate('/login');
  }
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

  const onHandleVerification = async () => {
    //check if valdation errors
    if (Object.keys(validationErrors).length > 0) return;
    setIsLoading(true);
    try {
      await resetPassword(password, resetPasswordToken as string);
      navigate(APP_ROUTES.login);
    } catch (error: any) {
      console.error('Error while reset password', error);
    } finally {
      setIsLoading(false);
    }
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
            {translate('reset_password.intro')}
          </h1>
          <div className="lg:w-3/5 sm:w-4/5 w-full mx-auto py-5">
            <div>
              <Input
                label={translate('signup.password')}
                type="password"
                id="newpass"
                name="newpass"
                value={password}
                onChange={setPassword}
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
              {/* You can include a button or any other UI elements for submission */}
              <Button
                label={translate('reset_password.btn_label')}
                isLoading={isLoading}
                onClick={onHandleVerification}
                disabled={!isFormValid}
              />
            </div>
          </div>

          <div className="mt-8 text-center flex gap-1 items-center justify-center">
            <a
              href={getTermsOfUseLink()}
              className="font-inter font-semibold sm:text-sm text-xs leading-[21px] text-dark-grey hover:underline"
            >
              {translate('terms_conditions.privacy_policy')} |
            </a>
            <a
              href={getPrivacyPolicyLink()}
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

export default ResetPassword;
