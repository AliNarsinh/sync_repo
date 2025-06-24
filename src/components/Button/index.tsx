import clsx from 'clsx';
import React from 'react';
import Loader from '../Loader';

const btnTypeClasses = {
  primary:
    'w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300',
  secondary: '',
};

interface IButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  btnType?: 'primary' | 'secondary';
  isLoading?: boolean;
  btnClassNames?: string;
  rightIcon?: JSX.Element;
}

const Button: React.FC<IButtonProps> = ({
  label,
  onClick,
  isLoading = false,
  btnClassNames = '',
  btnType = 'primary',
  disabled = false,
  rightIcon,
}) => {
  return (
    <button className={clsx(btnTypeClasses[btnType], btnClassNames)} onClick={onClick} disabled={disabled || isLoading}>
      <span className="flex justify-center">
        {isLoading ? (
          <div>
            <Loader width="6" height="6" />
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <span>{label}</span>
            {rightIcon}
          </div>
        )}
      </span>
    </button>
  );
};

export default Button;
