import { leftarrow, sd1, sd1_rus } from '@app/assets/images';
import { LANGS } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { sd1Emoji, sd1Text } from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';
import React from 'react';
import ScrollWithin from './Scroll';

const SdoneSheet: React.FC<any> = ({ data, setIsBottomSheetOpen }) => {
  const { translate, i18n } = useLocalization();

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const renderImage = () => {
    return i18n.language === LANGS.RUSSIAN ? sd1_rus : sd1;
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
              <h1 className="font-inter font-bold sm:text-xl text-base leading-[19.6px] text-center text-primary-color sm:w-full w-32 sm:m-0 m-auto">
                {formatTitle(data?.title, translate).toUpperCase()} {data?.value?.value} -{' '}
                {sd1Text(data?.value?.value, translate) ?? translate('not_data.NA')}
              </h1>
              <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                  <img src={sd1Emoji(data?.value?.value)} alt="fullsmile" className="w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`energy.${data?.title}.header`)}
            </p>

            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`energy.${data?.title}.para_one`)}
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

export default SdoneSheet;
