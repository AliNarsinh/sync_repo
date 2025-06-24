import { leftarrow, lowYellow, normalGreen, veryHigh } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { snsZoneText, snsZoneEmoji } from '@app/utils/emojiCalculation';
import ScrollWithin from './Scroll';

const SnsZone: React.FC<any> = ({ data, setIsBottomSheetOpen }) => {
  const { translate } = useLocalization();

  const handleCLose = () => {
    setIsBottomSheetOpen(false);
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
                <h1 className="font-inter font-bold sm:text-xl text-sm leading-[19.6px] text-center text-primary-color sm:w-full w-40 sm:m-0 m-auto">
                  {translate('missing_general.over_all.stress_response')} {translate('missing_general.is')}{' '}
                  {snsZoneText(data?.value?.value, translate) ?? translate('not_data.NA')}
                </h1>
                <div className="flex justify-center items-center relative sm:bottom-12 bottom-14">
                  <div className="bg-white w-[61px] h-[61px] flex justify-center items-center rounded-full absolute bottom-0">
                    <img src={snsZoneEmoji(data?.value?.value)} alt="fullsmile" className="w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
            <ScrollWithin>
              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`fightFlight.${data?.title}.header`)}
              </p>

              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`fightFlight.${data?.title}.heading`)}
              </p>

              <div className="flex items-center justify-center gap-7 p-3 mb-3.5">
                <div className="">
                  <img src={normalGreen} alt="laughinggreen" className="m-auto" />
                  <p className="font-inter font-normal sm:text-base text-xs leading-[16.8px] text-dark-grey mt-3.5 text-center">
                    {translate('missing_general.emoji.low')}
                  </p>
                </div>
                <div className="">
                  <img src={lowYellow} alt="normal" className="m-auto" />
                  <p className="font-inter font-normal sm:text-base text-xs leading-[16.8px] text-dark-grey mt-3.5 text-center">
                    {translate('missing_general.emoji.normal')}
                  </p>
                </div>
                <div className="">
                  <img src={veryHigh} alt="sadangry" className="m-auto" />
                  <p className="font-inter font-normal sm:text-base text-xs leading-[16.8px] text-dark-grey mt-3.5 text-center">
                    {translate('missing_general.emoji.high')}
                  </p>
                </div>
              </div>

              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`fightFlight.${data?.title}.para_one`)}
              </p>
              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`fightFlight.${data?.title}.para_two`)}
              </p>
              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`fightFlight.${data?.title}.para_three`)}
              </p>
              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`fightFlight.${data?.title}.para_four`)}
              </p>
              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {translate(`fightFlight.${data?.title}.para_five`)}
              </p>
            </ScrollWithin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnsZone;
