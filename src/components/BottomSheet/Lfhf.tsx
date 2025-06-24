import { leftarrow } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { lfhfRatioText, lfhfRatioEmoji } from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';
import React from 'react';
import ScrollWithin from './Scroll';

const Lfhf: React.FC<any> = ({ data, setIsBottomSheetOpen }) => {
  const { translate } = useLocalization();

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
              <h1 className="font-inter font-bold sm:text-xl text-base leading-[19.6px] text-center text-primary-color sm:w-full w-36 sm:m-0 m-auto">
                {formatTitle(data?.title, translate).toUpperCase()} <br /> {data?.value?.value} -{' '}
                {lfhfRatioText(data?.value?.value, translate) ?? translate('not_data.NA')}
              </h1>
              <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                  <img src={lfhfRatioEmoji(data?.value?.value)} alt="fullsmile" className="w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`rate_variablity.${data?.title}.header`)}
            </p>

            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`rate_variablity.${data?.title}.para_one`)}
            </p>
          </ScrollWithin>
        </div>
      </div>
    </div>
  );
};

export default Lfhf;
