import { EyeClosedIcon, EyeOpenIcon } from '@app/assets/images/icons';
import { useLocalization } from '@app/hooks';
import clsx from 'clsx';
import React, { useState } from 'react';

interface InputProps {
  name: string;
  id: string;
  placeholder?: string;
  label?: string;
  containerClassNames?: string;
  inputClassNames?: string;
  value: string | number;
  onChange(value: any): void;
  type?: 'text' | 'number' | 'email' | 'password';
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onRightIconClick?: () => void;
  isRequired?: boolean;
  validate?: IValidate;
  onValidationError?: (name: string, error: string) => void;
  isDisabled?: boolean;
}

interface IValidate {
  regex?: RegExp;
  errorMessage: string;
  validate?: () => boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  label,
  inputClassNames = '',
  containerClassNames = '',
  rightIcon,
  leftIcon,
  onRightIconClick,
  isRequired = false,
  validate,
  onValidationError,
  isDisabled,
}) => {
  //adding defult show and hide functionality for password fields
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<boolean>(false);
  const { translate } = useLocalization();
  //adding defult show and hide functionality for password fields
  if (type === 'password' && !leftIcon) {
    leftIcon = isShowPassword ? <EyeClosedIcon /> : <EyeOpenIcon />;
    onRightIconClick = () => setIsShowPassword(!isShowPassword);
  }

  const [isBlur, setIsBlur] = useState(false);

  const validateRegex = (regex: RegExp | undefined) => {
    if (!regex) return true;
    return String(value).toLowerCase().match(regex);
  };

  const handleOnBlur = () => {
    const isValidationError =
      value && validate && (validate?.validate ? !validate.validate() : !validateRegex(validate.regex));

    setValidationError(!!isValidationError);
    if (onValidationError) {
      isValidationError ? onValidationError(name, validate?.errorMessage) : onValidationError(name, '');
    }
  };

  return (
    <div className={clsx('flex flex-col gap-2', containerClassNames)}>
      {label && (
        <span className="font-inter font-semibold text-base leading-6 -tracking-[0.25px] text-primary-color">
          {label}
          {isRequired && '*'}
        </span>
      )}
      <div className="relative flex">
        {rightIcon && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{rightIcon}</span>
        )}
        <input
          //adding defult show and hide functionality for password fields
          type={type === 'password' ? (isShowPassword ? 'text' : type) : type}
          id={id}
          name={name}
          value={value}
          onBlur={() => setIsBlur(true)}
          disabled={isDisabled}
          onChange={(ev) => onChange(ev.target.value)}
          className={clsx(
            'w-full px-4 py-3 border rounded-[4px] border-light-grey h-[48px] focus:outline-none focus:border-blue-500',
            inputClassNames,
            rightIcon && 'pl-10',
          )}
          placeholder={placeholder}
          onBlurCapture={handleOnBlur}
        />
        {leftIcon && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={onRightIconClick}>
            {leftIcon}
          </span>
        )}
      </div>
      {validationError ? (
        <span className="text-red-500">{validate?.errorMessage}</span>
      ) : (
        isRequired &&
        isBlur &&
        !value && <span className="text-red-500">{translate('components.input.required_message')}</span>
      )}
    </div>
  );
};

export default Input;
