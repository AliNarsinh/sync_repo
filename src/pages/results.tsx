import { arrow } from '@app/assets/images';
import { ArrowLeftIcon } from '@app/assets/images/icons';
import { APP_ROUTES } from '@app/constants';
import { useLocalization } from '@app/hooks';
import { useTypedSelector } from '@app/store';
import { TopnItem } from '@app/store/type';
import { formatDateTime, getDateLanguage } from '@app/utils/dateFormatter';
import { convertProbablityIntoPercentage } from '@app/utils/probablityCalculate';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { translate, i18n } = useLocalization();
  const { skinive } = useTypedSelector((state) => state);
  const { check_datetime, image_url } = skinive;

  const { desease } = useTypedSelector((state) => state.skiniveDetail);
  const { risk, description, class: skinClass, prob } = useTypedSelector((state) => state.skiniveDetail) as TopnItem;
  const currentLanguage = getDateLanguage(i18n.language);
  const formattedDate = formatDateTime(check_datetime, currentLanguage);

  const handleRedirect = () => {
    navigate(APP_ROUTES.skin);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-custom-gradient h-full ">
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 py-8 relative">
          <div className="cursor-pointer absolute">
            <ArrowLeftIcon onClick={() => navigate(-1)} />
          </div>
          <h1 className="font-inter font-semibold text-xl leading-5 text-center text-primary-color">
            {translate('results.title')}
          </h1>
        </div>
        <div className="bg-white rounded-tl-[18px] rounded-tr-[18px] ">
          <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 sm:py-8 py-4 flex flex-col gap-0">
            <h6 className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-[#646464CC] mb-3">
              {formattedDate}
            </h6>
            <div className="bg-[#D9D9D9] sm:h-80 h-[291px] rounded-lg w-full">
              <img
                crossOrigin="anonymous"
                // src={image_url?.replace('https://cdn.skiniver.com/', imageUrlPrefix)}
                src={image_url}
                alt={translate('results.image_preview')}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center border-[2px]  border-secondary-color rounded-lg py-2 px-4">
                <div className="flex flex-col justify-normal gap-0">
                  <h6 className="font-inter font-bold text-lg leading-[25.4px] text-secondary-color ">{risk}</h6>
                  <p className="font-inter font-medium sm:text-base text-xs leading-[16.8px] text-primary-color">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center  border-b border-[#D7D7D7] py-5 sm:px-0 px-2">
              <div>
                <h6 className="font-inter font-bold text-lg leading-[25.4px] text-primary-color">{skinClass}</h6>
              </div>
              <div className="flex items-center justify-normal gap-5">
                <p className="font-inter font-bold text-lg leading-[25.2px] text-secondary-color ">
                  {convertProbablityIntoPercentage(prob)}%
                </p>

                {desease === 'No Pathologies' || desease === 'Нет патологий' ? (
                  <></>
                ) : (
                  <img src={arrow} alt="arrow" className="" onClick={handleRedirect} />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center border-[#D7D7D7] py-5 sm:px-0 px-2">
              <div>
                {/* <h6 className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-primary-color">
                  {translate('results.desc_one')}
                </h6> */}
                {/* <p className="font-inter font-normal sm:text-sm text-xs leading-[16.8px] text-primary-color underline">
                  {translate('results.read_more')}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Results;
