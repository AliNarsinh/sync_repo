import React from 'react';

interface InputRangeProps {
  min: number;
  max: number;
  value: number | undefined; // Make sure to handle undefined values
  color?: string;
  title?: string;
}

const InputRange: React.FC<InputRangeProps> = ({ min, max, value, color, title }) => {
  return (
    <div className="input-wrapper w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value || min} // Use a default value or handle undefined values appropriately
        readOnly
        className={`${color}-color-range-${title} ${value !== undefined && value >= min && value <= max ? 'active' : ''}`}
      />
      <style>
        {`
        .${color}-color-range-${title}::-webkit-slider-thumb {
          display: ${value !== undefined && value >= min && value <= max ? 'block' : 'none'};
        }
      `}
      </style>
    </div>
  );
};

export default InputRange;
