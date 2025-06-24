import { useEffect, useState } from 'react';
import RecommandList from '@app/components/RecommadList';
import { useLocalization } from '@app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@app/assets/images/icons';
import { SkiniveResponse, TopnItem } from '@app/store/type';
import { motion } from 'framer-motion';
import { getSkinive } from '@app/services';
import { convertProbablityIntoPercentage } from '@app/utils/probablityCalculate';
import ReactSpeedometer from 'react-d3-speedometer';
import { APP_ROUTES } from '@app/constants';

export const Recommand: React.FC = () => {
  const { translate } = useLocalization();
  const navigate = useNavigate();
  const { id }: any = useParams();

  const [topnData, setTopnData] = useState<TopnItem[]>([]);
  const [skiniveDetailsData, setSkiniveDetailsData] = useState({});
  const [probability, setprobability] = useState<number>(0);

  useEffect(() => {
    const getSkiniveData = async () => {
      try {
        const response = await getSkinive(id);

        const skiniveData: SkiniveResponse | undefined = response?.data?.sessionData;

        if (skiniveData) {
          setTopnData(skiniveData?.topn ?? []);
          setSkiniveDetailsData(skiniveData);
          const probData = parseInt(skiniveData?.prob);
          const probability =
            skiniveData?.class === 'Skin Without Pathology' || skiniveData?.class === 'Кожа без патологии'
              ? 100 - probData
              : probData;

          setprobability(probability);
        }
      } catch (error: any) {
        console.error('Error:', error);
      }
    };

    getSkiniveData();
  }, [id]);

  const handleRedirect = () => {
    navigate(APP_ROUTES.vital_signs);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <section className="bg-white " style={{ height: '100vh', overflow: 'auto' }}>
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 relative ">
          <div className="text-left py-5 cursor-pointer">
            <ArrowLeftIcon onClick={() => navigate(-1)} />
          </div>
          <div className="flex flex-col items-center justify-center gap-6 pt-4 mb-6">
            <div className="relative text-center reactSpeedometer">
              {/* <p className="absolute top-[83%] left-4 font-inter font-semibold  text-sm leading-[19.6px] text-dark-grey transform -translate-y-1/2">
                {translate('speedometer.low')}
              </p> */}
              <ReactSpeedometer
                maxValue={100}
                value={probability}
                startColor="#00FF00"
                segments={5}
                endColor="#FF0000"
                textColor="#646464"
                needleTransitionDuration={4000}
                needleHeightRatio={0.7}
                ringWidth={20}
                height={200}
                width={300}
                needleColor="#a7ff83"
              />
              <p className="absolute top-[50%] right-[50%] translate-y-[0] translate-x-1/2 text-dark-grey font-bold">
                {translate('speedometer.risk')}
              </p>
              {/* <p className="absolute top-[83%] right-4 font-inter font-semibold  text-sm leading-[19.6px] text-dark-grey transform -translate-y-1/2">
                {translate('speedometer.high')}
              </p> */}
            </div>
            <p className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-dark-grey">
              {translate('recommand.title')}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center sm:gap-1 gap-1.5 text-center">
            <h6 className="font-inter font-semibold sm:text-base text-[15px] leading-5 text-dark-grey">
              {(skiniveDetailsData as any)?.short_recommendation}
            </h6>
            <p className="font-inter font-normal sm:text-base text-sm leading-[19.6px] text-dark-grey">
              {translate('recommand.desc_two')}
            </p>
          </div>
          <div className="mt-6">
            {topnData?.length > 0 && (
              <RecommandList skiniveDetailsData={skiniveDetailsData} key={topnData[0]?.prob} item={topnData[0]} />
            )}
            {topnData
              ?.slice(1, 2)
              ?.filter((item: TopnItem) => convertProbablityIntoPercentage(item.prob) > 5)
              ?.map((item: TopnItem) => (
                <RecommandList skiniveDetailsData={skiniveDetailsData} key={item?.prob} item={item} />
              ))}
          </div>
          <p
            onClick={handleRedirect}
            className="text-center font-inter font-bold text-primary-color sm:text-base text-sm leading-[19.6px] my-5"
          >
            {translate('recommand.new_check')}
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default Recommand;
