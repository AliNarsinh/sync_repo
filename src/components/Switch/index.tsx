import { ChangeEvent } from 'react';
import { Ru, Us } from 'react-flags-select'; // Assuming you are using react-flags-select or similar for flag icons.

interface PropsTypes {
  isChecked: boolean;
  onHandleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SwitchLanguage = ({ isChecked, onHandleChange }: PropsTypes) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="relative inline-flex items-center cursor-pointer">
        {/* Hidden Checkbox */}
        <input type="checkbox" checked={isChecked} onChange={onHandleChange} className="sr-only peer" />

        {/* Background Track */}
        <span
          className={`w-14 h-7 rounded-full transition-all bg-gray-400 text-[10px] flex items-center  border-gray-400 ${
            isChecked ? 'bg-blue-600 justify-start pl-1.5' : 'bg-gray-200 justify-end pr-2'
          }`}
        >
          {isChecked ? 'RUS' : 'EN'}
        </span>

        {/* Thumb with Flag */}
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-transform flex items-center justify-center ${
            isChecked ? 'translate-x-7 bg-slate-200' : 'translate-x-0 bg-slate-200'
          }`}
        >
          {/* Display Flags */}
          {isChecked ? (
            <Ru className="w-4 h-4" /> // Russian Flag
          ) : (
            <Us className="w-4 h-4" /> // USA Flag
          )}
        </span>
      </label>
    </div>
  );
};

export default SwitchLanguage;
