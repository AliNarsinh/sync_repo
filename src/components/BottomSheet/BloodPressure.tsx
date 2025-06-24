import { useState } from 'react';
import { bloodpressure, leftarrow } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { BloodPressureCalculateEmoji, bloodText } from '@app/utils/emojiCalculation';
import InputRange from '@app/components/InputRange';
import { BinnahProps } from '@app/types/binahTypes';
import ScrollWithin from './Scroll';

const BloodPressure: React.FC<BinnahProps> = ({ data, setIsBottomSheetOpen }) => {
  const { translate } = useLocalization();
  const [value] = useState(data?.value?.value?.systolic);

  const ranges = [
    {
      min: 1,
      max: 100,
      color: 'yellow',
    },
    {
      min: 101,
      max: 129,
      color: 'green',
    },
    {
      min: 130,
      max: 300,
      color: 'red',
    },
  ];

  const handleClose = () => {
    setIsBottomSheetOpen(false);
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
              <h1
                className={`${data?.value?.value?.systolic && data?.value?.value?.diastolic ? `w-52` : `w-44`}  font-inter font-bold sm:text-xl text-sm leading-[20.6px] text-center text-primary-color sm:w-full  sm:m-0 m-auto`}
              >
                {translate('missing_general.over_all.Blood Pressure')} {translate('missing_general.is')}{' '}
                {data?.value?.value?.systolic && data?.value?.value?.diastolic ? (
                  <>
                    {data?.value?.value?.systolic}/{data?.value?.value?.diastolic} mmHg -{' '}
                    {bloodText(data?.value?.value?.systolic, translate)}
                  </>
                ) : (
                  translate('not_data.NA')
                )}
              </h1>
              <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                  <img
                    src={BloodPressureCalculateEmoji(data?.value?.value?.systolic)}
                    alt="fullsmile"
                    className="w-8"
                  />
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
                <span>{''}</span>
                <span>100</span>
                <span>129</span>
                <span>{''}</span>
              </div>
            </div>
          </div>

          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`blood.${data?.title}.header`)}
            </p>

            <div className="border border-[#D6D6D6] p-3 mb-3.5">
              <img src={bloodpressure} alt="waves" className="m-auto" />
            </div>

            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`blood.${data?.title}.para_one`)}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`blood.${data?.title}.para_two`)}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`blood.${data?.title}.para_three`)}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`blood.${data?.title}.para_four`)}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`blood.${data?.title}.para_five`)}
            </p>
          </ScrollWithin>
        </div>
      </div>
    </div>
  );
};

export default BloodPressure;
