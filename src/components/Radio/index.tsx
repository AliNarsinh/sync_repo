import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';

const radioTypeClasses = {
  primary: 'peer hidden',
  secondary: '',
};

interface IRadioProps {
  label: string;
  value: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  defaultChecked?: boolean;
}

const Radio: React.FC<IRadioProps> = ({ label, value, onChange, labelClassName, name, defaultChecked }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);

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
        className={clsx('peer hidden', radioTypeClasses.primary)}
        onChange={handleOnChange}
        checked={isChecked}
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

export default Radio;
