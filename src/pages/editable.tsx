import React, { useState, ChangeEvent } from 'react';
import { useLocalization } from '@app/hooks';
import { ArrowLeftIcon, SquarePenIcon } from '@app/assets/images/icons';
import Input from '@app/components/Input';
import Radio from '@app/components/Radio';
import { GenderType } from '@app/constants';
import { motion } from 'framer-motion';

const Editable: React.FC = () => {
  const { translate } = useLocalization();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [birth, setBirth] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skinType, setSkintype] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skinPrototype, setSkinprototype] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weight, setWeight] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [height, setHeight] = useState<string | null>(null);
  const [isLbChecked, setIsLbChecked] = useState(true);

  const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBirth(event.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = React.useState('female');

  const handleSkintype = (event: ChangeEvent<HTMLInputElement>) => {
    setSkintype(event.target.value);
  };

  const handleSkinprototype = (event: ChangeEvent<HTMLInputElement>) => {
    setSkinprototype(event.target.value);
  };

  const handleWeight = (event: ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsLbChecked(!isLbChecked);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const weightOptions = isLbChecked
    ? [
        { label: '80Lb', value: '80' },
        { label: '81Lb', value: '81' },
        { label: '82Lb', value: '82' },
        { label: '83Lb', value: '83' },
        { label: '84Lb', value: '84' },
      ]
    : [
        { label: '80kg', value: '80' },
        { label: '81kg', value: '81' },
        { label: '82kg', value: '82' },
        { label: '83kg', value: '83' },
        { label: '84kg', value: '84' },
      ];

  const heightOptions = isLbChecked
    ? [
        { label: '174In', value: '174' },
        { label: '175In', value: '175' },
        { label: '176In', value: '176' },
        { label: '177In', value: '177' },
        { label: '178In', value: '178' },
      ]
    : [
        { label: '174cm', value: '174' },
        { label: '175cm', value: '175' },
        { label: '176cm', value: '176' },
        { label: '177cm', value: '177' },
        { label: '178cm', value: '178' },
      ];

  const BirthArray = [
    { label: '1990', value: '1990' },
    { label: '1991', value: '1991' },
    { label: '1992', value: '1992' },
    { label: '1993', value: '1993' },
    { label: '1994', value: '1994' },
    { label: '1995', value: '1995' },
    { label: '1996', value: '1996' },
    { label: '1997', value: '1997' },
    { label: '1998', value: '1998' },
    { label: '1999', value: '1999' },
    { label: '2000', value: '2000' },
    { label: '2001', value: '2001' },
    { label: '2002', value: '2002' },
    { label: '2003', value: '2003' },
    { label: '2004', value: '2004' },
    { label: '2005', value: '2005' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="relative">
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 pt-8 relative">
          <div className="cursor-pointer absolute">
            <div className="text-small-icon">
              <ArrowLeftIcon />
            </div>
          </div>
          <h1 className="font-inter font-semibold text-xl leading-5 text-center text-primary-color">
            {translate('editable.Profile')}
          </h1>
          <div>
            <form className="py-4">
              <div className="">
                <div className="flex flex-col justify-normal gap-1 mb-3">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Email')}
                  </label>
                  <input
                    type="email"
                    name=""
                    placeholder=""
                    value="Daniel.Fursan@gmail.com"
                    id=""
                    className="h-[40px] font-inter sm:text-base text-sm leading-[16.94px text-[#9E9E9E] outline-none bg-transparent"
                  />
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-3">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.First_Name')}
                  </label>
                  <div className="relative">
                    <Input type="text" id="fname" name="fname" value={firstName} onChange={setfirstName} />

                    <div className="absolute right-3.5 top-1 text-small-icon">
                      <SquarePenIcon />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-3">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Last_Name')}
                  </label>
                  <div className="relative">
                    <Input type="text" id="lname" name="lname" value={lastName} onChange={setlastName} />
                    <div className="absolute right-3.5 top-1 text-small-icon">
                      <SquarePenIcon />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-3">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Gender')}
                  </label>
                  <div className="flex items-center bg-[#E6F6FF] rounded-xl mb-4 sm:leading-10 leading-9">
                    <div className="w-full text-center overflow-hidden">
                      <Radio
                        label="Male"
                        value={gender === GenderType.MALE ? 'Male' : 'Female'}
                        name="gender"
                        onChange={handleGenderChange}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[16.8px] peer-checked:text-white peer-checked:cursor-default peer-checked:bg-secondary-color peer-checked:rounded-xl sm:py-2 pt-[0.7rem] pb-2 sm:px-[44%] px-[37%] rounded-xl"
                      />
                    </div>
                    <div className="w-full text-center overflow-hidden">
                      <Radio
                        label="Female"
                        value={gender === GenderType.MALE ? 'Male' : 'Female'}
                        name="gender"
                        onChange={handleGenderChange}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[16.8px] peer-checked:text-white peer-checked:cursor-default peer-checked:bg-secondary-color peer-checked:rounded-xl sm:py-2 pt-[0.7rem] pb-2 sm:px-[44%] px-[37%] rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-4">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Birth_Year')}
                  </label>
                  <div className="flex items-center gap-3 mb-4 sm:overflow-hidden overflow-scroll">
                    {BirthArray.map((option) => (
                      <div className="">
                        <Radio
                          key={option.value}
                          name="date"
                          label={option.label}
                          value={option.value}
                          onChange={handleBirthChange}
                          labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs text-[#9E9E9E] leading-[16.8px] peer-checked:text-secondary-color peer-checked:border-b peer-checked:border-secondary-color peer-checked:font-bold peer-checked:cursor-default"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-5">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Skin_Type')}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="">
                      <Radio
                        label="Combined"
                        value="Combined"
                        name="skintype"
                        onChange={handleSkintype}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[13.92px] text-[#9E9E9E] border py-1.5 px-3 border-[#9E9E9E] rounded-[5px] peer-checked:text-white peer-checked:cursor-default peer-checked:bg-secondary-color peer-checked:border-secondary-color"
                      />
                    </div>
                    <div className="">
                      <Radio
                        label="Normal"
                        value="Normal"
                        name="skintype"
                        onChange={handleSkintype}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[13.92px] text-[#9E9E9E] border py-1.5 px-3 border-[#9E9E9E] rounded-[5px] peer-checked:text-white peer-checked:cursor-default peer-checked:bg-secondary-color peer-checked:border-secondary-color"
                      />
                    </div>
                    <div className="">
                      <Radio
                        label="City"
                        value="City"
                        name="skintype"
                        onChange={handleSkintype}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[13.92px] text-[#9E9E9E] border py-1.5 px-3 border-[#9E9E9E] rounded-[5px] peer-checked:text-white peer-checked:cursor-default peer-checked:bg-secondary-color peer-checked:border-secondary-color"
                      />
                    </div>
                    <div className="">
                      <Radio
                        label="Dry"
                        value="Dry"
                        name="skintype"
                        onChange={handleSkintype}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[13.92px] text-[#9E9E9E] border py-1.5 px-3 border-[#9E9E9E] rounded-[5px] peer-checked:text-white peer-checked:cursor-default peer-checked:bg-secondary-color peer-checked:border-secondary-color"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-normal gap-3 mb-5">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Skin_Prototype')}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="">
                      <Radio
                        label="1"
                        value="1"
                        name="skinprototype"
                        onChange={handleSkinprototype}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[13.92px] text-white border py-3 px-4 border-[#FFEAD2] rounded-[5px] bg-[#FFEAD2] peer-checked:text-white peer-checked:cursor-default peer-checked:border-secondary-color peer-checked:border-[3px]"
                      />
                    </div>
                    <div className="">
                      <Radio
                        label="11"
                        value="11"
                        name="skinprototype"
                        onChange={handleSkinprototype}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[13.92px] text-white border py-3 px-4 border-[#9D7C5D] rounded-[5px] bg-[#9D7C5D] peer-checked:text-white peer-checked:cursor-default peer-checked:border-secondary-color peer-checked:border-[3px]"
                      />
                    </div>
                    <div className="">
                      <Radio
                        label="111"
                        value="111"
                        name="skinprototype"
                        onChange={handleSkinprototype}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[13.92px] text-white border py-3 px-4 border-[#6D523A] rounded-[5px] bg-[#6D523A] peer-checked:text-white peer-checked:cursor-default peer-checked:border-secondary-color peer-checked:border-[3px]"
                      />
                    </div>
                    <div className="">
                      <Radio
                        label="1v"
                        value="1v"
                        name="skinprototype"
                        onChange={handleSkinprototype}
                        labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs leading-[13.92px] text-white border py-3 px-4 border-[#3B2511] rounded-[5px] bg-[#3B2511] peer-checked:text-white peer-checked:cursor-default peer-checked:border-secondary-color peer-checked:border-[3px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-normal gap-5 mb-3">
                  <div className="flex justify-between">
                    <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                      {translate('editable.Weight')}
                    </label>
                    <div className="flex items-center">
                      <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                        {translate('editable.kg/cm')}&nbsp;
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={isLbChecked}
                          onChange={handleCheckboxChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:bg-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-secondary-color outline-none border after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary-color"></div>
                        <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                          &nbsp; {translate('editable.lb/in')};
                        </label>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center sm:justify-between justify-center gap-5 mb-4 border border-[#E4E4E4] rounded-full p-5">
                    {weightOptions.map((option) => (
                      <div className="">
                        <Radio
                          key={option.value}
                          name="weight"
                          label={option.label}
                          value={option.value}
                          onChange={handleWeight}
                          labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs text-[#9E9E9E] leading-[16.8px] peer-checked:text-secondary-color peer-checked:border-b peer-checked:border-secondary-color peer-checked:font-bold peer-checked:cursor-default"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-5 mb-3">
                  <div className="flex justify-between">
                    <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                      {translate('editable.Height')};
                    </label>
                  </div>
                  <div className="flex items-center sm:justify-between justify-center gap-5 mb-4 border border-[#E4E4E4] rounded-full p-5 relative">
                    {heightOptions.map((option) => (
                      <div className="">
                        <Radio
                          key={option.value}
                          name="height"
                          label={option.label}
                          value={option.value}
                          onChange={handleHeight}
                          labelClassName="cursor-pointer font-inter font-normal sm:text-base text-xs text-[#9E9E9E] leading-[16.8px] peer-checked:text-secondary-color peer-checked:border-b peer-checked:border-secondary-color peer-checked:font-bold peer-checked:cursor-default"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h5 className="font-inter font-bold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.BMI:')}
                    <span className="text-secondary-color"></span>
                  </h5>
                  <h5 className="font-inter font-bold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Your_Category:')}
                    <span className="text-[#E8C300]"></span>
                  </h5>
                </div>
                <button
                  type="submit"
                  className="w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300"
                >
                  {translate('editable.Save_Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Editable;
