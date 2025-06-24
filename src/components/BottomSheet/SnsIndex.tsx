import { leftarrow, sns, sns_rus } from '@app/assets/images';
import InputRange from '@app/components/InputRange';
import { LANGS } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { pnsIndexText, snsIndexEmoji } from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';
import React, { useState } from 'react';
import ScrollWithin from './Scroll';

const SnsIndex: React.FC<any> = ({ data, setIsBottomSheetOpen }) => {
  const { translate, i18n } = useLocalization();
  const [value] = useState(data?.value?.value);

  const ranges = [
    {
      min: -50,
      max: -0,
      color: 'green',
    },
    {
      min: 0,
      max: 10,
      color: 'yellow',
    },
    {
      min: 11,
      max: 100,
      color: 'orange',
    },
  ];

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const renderImage = () => {
    return i18n.language === LANGS.RUSSIAN ? sns_rus : sns;
  };

  return (
    <div>
      <div className="bg-white relative w-full">
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center sm:gap-4 gap-4 pt-12 pb-5">
          <div className="w-full relative">
            <div>
              <div className="cursor-pointer absolute left-0">
                <img src={leftarrow} alt="leftarrow" className="" onClick={handleClose} />
              </div>
              <h1 className="font-inter font-bold sm:text-xl text-sm leading-[19.6px] text-center text-primary-color sm:w-full w-56 sm:m-0 m-auto">
                {formatTitle(data?.title, translate).toUpperCase()} {data?.value?.value} -{' '}
                {pnsIndexText(data?.value?.value, translate) ?? translate('not_data.NA')}
              </h1>
              <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                  <img src={snsIndexEmoji(data?.value?.value)} alt="fullsmile" className="w-8" />
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
                    value={value * 10}
                    color={range.color}
                    title={data?.title}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs font-size-range">
                <span>{''}</span>
                <span>-1</span>
                <span>1</span>
                <span>{''}</span>
              </div>
            </div>
          </div>

          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`fightFlight.${data?.title}.header`)}
            </p>

            <div className="border border-[#D6D6D6] mb-3.5">
              <img src={renderImage()} alt="example" className="m-auto" />
            </div>
          </ScrollWithin>
        </div>
      </div>
    </div>
  );
};

export default SnsIndex;
