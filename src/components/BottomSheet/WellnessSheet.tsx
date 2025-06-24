import { alert, leftarrow, stress_level, stress_level_rus } from '@app/assets/images';
import { LANGS } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { checkWellnessLevel } from '@app/utils/emojiCalculation';
import React, { useState } from 'react';
import InputRange from '../InputRange';
import ScrollWithin from './Scroll';

const WellnessSheet: React.FC<any> = ({ data, setIsBottomSheetOpen }) => {
  const { translate, i18n } = useLocalization();

  const [value] = useState(data?.wellnessIndex);

  const ranges = [
    {
      min: 0,
      max: 2,
      color: 'dark-red',
    },
    {
      min: 2,
      max: 4,
      color: 'orange',
    },
    {
      min: 5,
      max: 6,
      color: 'yellow',
    },
    {
      min: 7,
      max: 8,
      color: 'green',
    },
    {
      min: 9,
      max: 10,
      color: 'dark-green',
    },
  ];

  const handleCLose = () => {
    setIsBottomSheetOpen(false);
  };

  const renderImage = () => {
    return i18n.language === LANGS.RUSSIAN ? stress_level_rus : stress_level;
  };

  return (
    <div>
      <div>
        <div className="bg-white relative w-full">
          <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center sm:gap-4 gap-4 pt-12 pb-5">
            <div className="w-full relative">
              <div>
                <div className="cursor-pointer absolute left-0">
                  <img src={leftarrow} alt="leftarrow" className="" onClick={handleCLose} />
                </div>
                <h1 className="font-inter font-bold sm:text-xl text-base leading-[22px] text-center text-primary-color sm:w-full  sm:m-0 m-auto w-48">
                  {translate('wellness_index.your_welness_score')} <br />{' '}
                  {data?.wellnessIndex ?? translate('not_data.NA')}/10 |{' '}
                  {checkWellnessLevel(data?.wellnessLevel, translate)}
                </h1>
                <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                  <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                    <img src={alert} alt="fullsmile" className="w-11" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pb-5">
            <div className="input-range">
              <div className="flex flex-row gap-1">
                {ranges.map((range) => (
                  <InputRange
                    key={range.color}
                    min={range.min}
                    max={range.max}
                    value={value}
                    color={range.color}
                    title={data?.title}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs font-size-range">
                <span>0</span>
                <span>3</span>
                <span>5</span>
                <span>7</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
            <ScrollWithin>
              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`wellness_index.${data?.title}.para_one`)}
              </p>

              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`wellness_index.${data?.title}.para_two`)}
              </p>

              <p className="font-inter text-center font-bold sm:text-sm text-sm leading-[16.8px] text-dark-grey mb-3.5">
                {translate(`wellness_index.${data?.title}.question`)}
              </p>

              <p className="font-inter text-left font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey mb-3.5">
                {translate(`wellness_index.${data?.title}.para_three`)}
              </p>

              <p className="font-inter text-left font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey mb-3.5">
                {translate(`wellness_index.${data?.title}.para_four`)}
              </p>

              <p className="font-inter text-left font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey mb-3.5">
                {translate(`wellness_index.${data?.title}.para_five`)}
              </p>

              <div className="border border-[#D6D6D6] mb-3.5">
                <img src={renderImage()} alt="waves" className="m-auto" />
              </div>

              <p className="font-inter text-left font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey mb-3.5">
                {translate(`wellness_index.${data?.title}.para_six`)}
              </p>

              <p className="font-inter text-left font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey mb-3.5">
                {translate(`wellness_index.${data?.title}.para_seven`)}
              </p>
            </ScrollWithin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessSheet;
