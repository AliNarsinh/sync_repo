import { leftarrow } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { normalizedStressIndexCalculateEmoji, normalizedStressIndexCalculateText } from '@app/utils/emojiCalculation';
import ScrollWithin from './Scroll';

const NormalizedStressIndex: React.FC<any> = ({ data, setIsBottomSheetOpen }) => {
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
              <h1 className="font-inter font-bold sm:text-xl text-sm leading-[20.6px] text-center text-primary-color sm:w-full w-32 sm:m-0 m-auto">
                {translate('missing_general.over_all.Normalized Stress Index')} {translate('missing_general.is')}{' '}
                {normalizedStressIndexCalculateText(data?.value?.value, translate) ?? translate('not_data.NA')}
              </h1>
              <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                  <img src={normalizedStressIndexCalculateEmoji(data?.value?.value)} alt="fullsmile" className="w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`stress.${data?.title}.para_one`)}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`stress.${data?.title}.para_two`)}
            </p>
          </ScrollWithin>
        </div>
      </div>
    </div>
  );
};

export default NormalizedStressIndex;
