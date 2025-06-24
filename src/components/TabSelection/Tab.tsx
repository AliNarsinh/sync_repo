import clsx from 'clsx';
import React, { ChangeEvent } from 'react';

interface ITabProps {
  label: string;
  value: string;
  name?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  labelClassName?: string;
}

const Tab: React.FC<ITabProps> = ({ label, value, onChange, checked, labelClassName, name }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        className="peer hidden"
        onChange={handleOnChange}
        checked={checked}
      />
      <label
        htmlFor={value}
        className={clsx(
          labelClassName, // Additional class for the label
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Tab;
