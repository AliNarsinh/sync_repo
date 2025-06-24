import { ChangeEvent, useState } from 'react';
import Tab from './Tab';

interface TabSelectionProps {
  tabs: {
    label: string;
    value: string;
  }[];
  value?: string;
  onChange?: (selected: string) => void;
}

const TabSelection: React.FC<TabSelectionProps> = ({ tabs, value, onChange }) => {
  const [selected, setSelected] = useState<string>(value || '');
  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <div className="flex items-center bg-[#E6F6FF] rounded-xl sm:leading-10 leading-9">
      {tabs?.map((tab, i) => (
        <div key={i} className="w-full text-center overflow-hidden">
          <Tab
            key={'tab_' + i}
            label={tab.label}
            value={tab.value}
            name={tab.label}
            checked={selected === tab.value}
            onChange={onSelect}
            labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[16.8px] peer-checked:text-white peer-checked:cursor-default peer-checked:bg-secondary-color peer-checked:rounded-xl sm:py-2 pt-[0.7rem] pb-2 sm:px-[44%] px-[37%] rounded-xl"
          />
        </div>
      ))}
    </div>
  );
};

export default TabSelection;
