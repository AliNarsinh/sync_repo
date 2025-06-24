import { heart_rate, heart_rate_rus, leftarrow } from '@app/assets/images';
import InputRange from '@app/components/InputRange';
import { LANGS } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { BinnahProps } from '@app/types/binahTypes';
import { heartCalculateEmoji, heartCalculateText } from '@app/utils/emojiCalculation';
import React, { useState } from 'react';
import ScrollWithin from './Scroll';

const HeartRate: React.FC<BinnahProps> = ({ data, setIsBottomSheetOpen }) => {
  const { translate, i18n } = useLocalization();
  const [value] = useState(data?.value?.value);

  const ranges = [
    {
      min: 40,
      max: 60,
      color: 'yellow',
    },
    {
      min: 61,
      max: 100,
      color: 'green',
    },
    {
      min: 101,
      max: 240,
      color: 'red',
    },
  ];

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const renderImage = () => {
    return i18n.language === LANGS.RUSSIAN ? heart_rate_rus : heart_rate;
  };

  return (
    <div className="bg-white relative w-full h-full">
      <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center sm:gap-4 gap-4 pt-12 pb-5">
        <div className="w-full relative">
          <div>
            <div className="cursor-pointer absolute left-0">
              <img src={leftarrow} alt="leftarrow" className="w-8" onClick={handleClose} />
            </div>
            <h1 className="font-inter font-bold sm:text-xl text-sm leading-[19.6px] text-center text-primary-color sm:w-full w-48 sm:m-0 m-auto">
              {translate('missing_general.your_pulse_rate')} {data?.value?.value ?? translate('not_data.NA')}{' '}
              {data?.value?.value && 'bpm - '}
              {heartCalculateText(data?.value?.value, translate)}
            </h1>
            <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
              <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                <img src={heartCalculateEmoji(data?.value?.value)} alt="fullsmile" className="w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
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
              <span>40</span>
              <span>60</span>
              <span>100</span>
              <span>240</span>
            </div>
          </div>
        </div>

        <ScrollWithin>
          <div>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`vital_signs.${data?.title}.header`)}
            </p>

            <div className="border border-[#D6D6D6] mb-3.5">
              <img src={renderImage()} alt="waves" className="m-auto" />
            </div>
          </div>

          <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
            {translate(`vital_signs.${data?.title}.para_one`)}
          </p>
          <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
            {translate(`vital_signs.${data?.title}.para_two`)}
          </p>
          <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
            {translate(`vital_signs.${data?.title}.para_three`)}
          </p>
          <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
            {translate(`vital_signs.${data?.title}.para_four`)}
          </p>
          <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
            {translate(`vital_signs.${data?.title}.para_five`)}
          </p>
        </ScrollWithin>
      </div>
    </div>
  );
};

export default HeartRate;
