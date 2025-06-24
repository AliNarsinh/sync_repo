import { leftarrow, mild, normalGreen, veryHigh } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { HighHemoglobinA1CRiskEmoji, highHemoglobinA1CRiskText } from '@app/utils/emojiCalculation';
import { BinnahProps } from '@app/types/binahTypes';
import ScrollWithin from './Scroll';

const HighHemoglobinA1CRisk: React.FC<BinnahProps> = ({ data, setIsBottomSheetOpen }) => {
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
              <h1 className="font-inter font-bold sm:text-xl text-sm leading-[20.6px] text-center text-primary-color sm:w-full w-40 sm:m-0 m-auto">
                {translate('missing_general.over_all.High Hemoglobin A1CRisk')} {translate('missing_general.is')}{' '}
                {highHemoglobinA1CRiskText(data?.value?.value, translate) ?? translate('not_data.NA')}{' '}
              </h1>
              <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                  <img src={HighHemoglobinA1CRiskEmoji(data?.value?.value)} alt="fullsmile" className="w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`risks_signs.${data?.title}.intro`)}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`risks_signs.${data?.title}.para_one_point`)}
            </p>
            <div className="flex items-center justify-center gap-7 p-3 mb-3.5">
              <div className="">
                <img src={normalGreen} alt="laughinggreen" className="m-auto" />
                <p className="font-inter font-normal sm:text-base text-xs leading-[16.8px] text-dark-grey mt-3.5 text-center">
                  {translate('missing_general.emoji.low')}
                </p>
              </div>
              <div className="">
                <img src={mild} alt="pinkeww" className="m-auto" />
                <p className="font-inter font-normal sm:text-base text-xs leading-[16.8px] text-dark-grey mt-3.5 text-center">
                  {translate('missing_general.emoji.medium')}
                </p>
              </div>
              <div className="">
                <img src={veryHigh} alt="pinkeww" className="m-auto" />
                <p className="font-inter font-normal sm:text-base text-xs leading-[16.8px] text-dark-grey mt-3.5 text-center">
                  {translate('missing_general.emoji.high')}
                </p>
              </div>
            </div>

            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`risks_signs.${data?.title}.para_two`)}
            </p>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`risks_signs.${data?.title}.para_three`)}
            </p>
          </ScrollWithin>
        </div>
      </div>
    </div>
  );
};

export default HighHemoglobinA1CRisk;
