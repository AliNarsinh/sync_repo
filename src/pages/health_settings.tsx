import React from 'react';
import { useLocalization } from '@app/hooks';
import { HeartIcon } from '@app/assets/images/icons';
import BottomNavigationWrapper from '@app/components/BottomNavigationWrapper';

const HealthSettings: React.FC = () => {
  const { translate } = useLocalization();

  return (
    <BottomNavigationWrapper>
      <div className="rounded-tl-[18px] rounded-tr-[18px]">
        <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 py-8 flex flex-col gap-0">
          <div className="sm:pt-6 sm:pb-4 py-8">
            <div className="flex justify-between items-center border-t border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-small-icon">
                <HeartIcon />
                <h6 className="font-inter font-semibold text-base leading-[22.4px] text-primary-color">
                  {translate('health_settings.setting_1')}
                </h6>
              </div>
              <div>
                <p className="font-inter font-medium text-base leading-[22.4px] text-secondary-color">
                  {translate('health_settings.on')}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-small-icon">
                <HeartIcon />
                <h6 className="font-inter font-semibold text-base leading-[22.4px] text-primary-color">
                  {translate('health_settings.setting_2')}
                </h6>
              </div>
              <div>
                <p className="font-inter font-medium text-base leading-[22.4px] text-secondary-color">
                  {translate('health_settings.on')}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-[#D7D7D7] py-5 sm:px-0 px-4">
              <div className="flex items-center justify-normal gap-3 text-small-icon">
                <HeartIcon />
                <h6 className="font-inter font-semibold text-base leading-[22.4px] text-primary-color">
                  {translate('health_settings.setting_3')}
                </h6>
              </div>
              <div>
                <p className="font-inter font-medium text-base leading-[22.4px] text-secondary-color">
                  {translate('health_settings.on')}
                </p>
              </div>
            </div>
          </div>
          <h1 className="font-inter font-semibold text-base leading-[22.4px] text-primary-color sm:mb-2 mb-4">
            {translate('health_settings.permission_title')}
          </h1>
          <ol className="leading-[19.6px] font-inter font-normal sm:text-base text-sm text-dark-grey list-decimal ml-5">
            <li> {translate('health_settings.permission_1')}</li>
            <li>{translate('health_settings.permission_2')}</li>
            <li>{translate('health_settings.permission_3')}</li>
            <li>{translate('health_settings.permission_4')}</li>
          </ol>
          <div className="sm:pt-9 pt-24 pb-14">
            <button
              type="submit"
              className="w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300"
            >
              {translate('health_settings.button_title')}
            </button>
          </div>
        </div>
      </div>
    </BottomNavigationWrapper>
  );
};

export default HealthSettings;
