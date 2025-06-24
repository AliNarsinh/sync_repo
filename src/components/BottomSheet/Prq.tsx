import { leftarrow, prqRate, prqRate_rus } from '@app/assets/images';
import InputRange from '@app/components/InputRange';
import { LANGS } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { BinnahProps } from '@app/types/binahTypes';
import { prqCalculateEmoji } from '@app/utils/emojiCalculation';
import React from 'react';
import ScrollWithin from './Scroll';

const Prq: React.FC<BinnahProps> = ({ data, setIsBottomSheetOpen }) => {
  const { translate, i18n } = useLocalization();
  const [value] = React.useState(data?.value?.value);

  const ranges = [
    {
      min: 0,
      max: 3,
      color: 'orange',
    },
    {
      min: 4,
      max: 5,
      color: 'green',
    },
    {
      min: 5.1,
      max: 9,
      color: 'red',
    },
  ];

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const renderImage = () => {
    return i18n.language === LANGS.RUSSIAN ? prqRate_rus : prqRate;
  };

  return (
    <div>
      <div className="bg-white relative w-full">
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 text-center flex flex-col items-center justify-center sm:gap-4 gap-4 pt-12 pb-5">
          <div className="w-full relative">
            <div className="cursor-pointer absolute left-0">
              <img src={leftarrow} alt="leftarrow" className="" onClick={handleClose} />
            </div>
            <h1 className="font-inter font-bold sm:text-xl text-sm leading-[19.6px] text-center text-primary-color sm:w-full w-28 sm:m-0 m-auto">
              {translate('missing_general.over_all.Prq')} {translate('missing_general.is')} <br />
              {data?.value?.value ?? translate('not_data.NA')}
            </h1>
            <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
              <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                <img src={prqCalculateEmoji(data?.value?.value)} alt="fullsmile" className="w-8" />
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
                <span>{''}</span>
                <span>4</span>
                <span>5</span>
                <span>{''}</span>
              </div>
            </div>
          </div>

          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`vital_signs.${data?.title}.header`)}
            </p>

            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`vital_signs.${data?.title}.para_one`)}
            </p>
            <div className="border border-[#D6D6D6] p-3 mb-3.5">
              <img src={renderImage()} alt="waves" className="m-auto" />
            </div>

            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`vital_signs.${data?.title}.para_two`)}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`vital_signs.${data?.title}.para_three`)}
            </p>
          </ScrollWithin>
        </div>
      </div>
    </div>
  );
};

export default Prq;
