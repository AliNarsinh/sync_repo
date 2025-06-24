import { leftarrow } from '@app/assets/images';
import { useLocalization } from '@app/hooks';
import { BinnahProps } from '@app/types/binahTypes';
import ScrollWithin from './Scroll';
import { splitNumberedParagraph } from '@app/utils/helper';

const HeartAge: React.FC<BinnahProps> = ({ data, setIsBottomSheetOpen }) => {
  const { translate } = useLocalization();

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const paraTwoText = translate(`risks_signs.${data?.title}.para_two`) || '';

  const { beforeList: paraTwoIntro, listItems: paraTwoList } = splitNumberedParagraph(paraTwoText);

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
                {translate('missing_general.over_all.Heart Age')} {translate('missing_general.is')}{' '}
                {data?.value?.value ?? translate('not_data.NA')} {translate('missing_general.years')}
              </h1>
            </div>
          </div>
        </div>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 ">
          <ScrollWithin>
            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`risks_signs.${data?.title}.intro`)}
            </p>

            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`risks_signs.${data?.title}.para_one`)}
            </p>

            {paraTwoIntro && (
              <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
                {paraTwoIntro}
              </p>
            )}

            {paraTwoList.length > 0 && (
              <ol className="list-decimal pl-5 mb-3.5 text-sm text-dark-grey font-inter">
                {paraTwoList.map((item, index) => (
                  <li key={`paraTwo-${index}`}>{item}</li>
                ))}
              </ol>
            )}

            <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-dark-grey text-left mb-3.5">
              {translate(`risks_signs.${data?.title}.para_three`)}
            </p>
          </ScrollWithin>
        </div>
      </div>
    </div>
  );
};

export default HeartAge;
