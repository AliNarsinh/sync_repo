import { leftarrow } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { BinnahProps } from '@app/types/binahTypes';
import { hba1cEmoji, hba1cText } from '@app/utils/emojiCalculation';
import { formatTitle } from '@app/utils/formatTitle';

import ScrollWithin from './Scroll';

const HemoglobinA1cSheet: React.FC<BinnahProps> = ({ data, setIsBottomSheetOpen }) => {
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
              <h1 className="font-inter font-bold sm:text-xl text-sm leading-[20.6px] text-center text-primary-color sm:w-full w-48 sm:m-0 m-auto">
                {formatTitle(data?.title, translate)} {translate('missing_general.is')}{' '}
                {data?.value?.value ? `${data?.value?.value}%` : translate('not_data.NA')}
                &nbsp;
                {hba1cText(data?.value?.value, translate)}
              </h1>
              <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                  <img src={hba1cEmoji(data?.value?.value)} alt="fullsmile" className="w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`hemoglobinA1c_main.${data?.title}.para_one`)}
            </p>
          </ScrollWithin>
        </div>
      </div>
    </div>
  );
};

export default HemoglobinA1cSheet;
