import React, { useState, ChangeEvent, useEffect } from 'react';
import { useLocalization } from '@app/hooks';
import { SquarePenIcon } from '@app/assets/images/icons';
import Input from '@app/components/Input';
import TabSelection from '@app/components/TabSelection';
import {
  APP_ROUTES,
  HeightUnit,
  SmokingStatus,
  WeightUnit,
  heightRange,
  skinTypes,
  smokingOptions,
  weightRange,
  yearRange,
} from '@app/constants';
import { GetUser, UpdateUser } from '@app/services/ProfileServices';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile } from '@app/store/actions/ProfileAction';
import { IStateReducers } from '@app/store/type';
import { IProfile } from '@app/types/ProfileTypes';
import { ToastType, showToast } from '@app/utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import Processing from './processing';
import BottomNavigationWrapper from '@app/components/BottomNavigationWrapper';

const colorOptions = [
  { value: '1', label: 'I', color: '#EAC4A3' },
  { value: '2', label: 'II', color: '#D1A17A' },
  { value: '3', label: 'III', color: '#A67A58' },
  { value: '4', label: 'IV', color: '#8C6244' },
  { value: '5', label: 'V', color: '#5C3B2A' },
  { value: '6', label: 'VI', color: '#3B2511' },
];

const Profile: React.FC = () => {
  const { translate } = useLocalization();
  let [email, setEmail] = useState('');
  let [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [gender, setGender] = useState<string>('');
  const [birthYear, setbirthYear] = useState<number | any>(null);
  const [skinType, setSkintype] = useState<string | any>(null);
  const [skinTone, setskinTone] = useState<string | any>(null);
  const [weight, setWeight] = useState<number | any>(null);
  const [height, setHeight] = useState<number | any>(null);
  const [isLbInChecked, setIsLbInChecked] = useState(false);
  const [weightUnit, setWeightUnit] = useState<string | null>(null);
  const [heightUnit, setHeightUnit] = useState<string | null>(null);
  const [smokingStatus, setSmokingStatus] = useState<SmokingStatus | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData = useSelector((state: IStateReducers) => state.profile);
  const [loading, setLoading] = useState(true);

  const handleSmokingStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    setSmokingStatus(parseInt(event.target.value) as SmokingStatus);
  };

  const handleBirthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const numericValue = parseInt(value, 10);
    setbirthYear(numericValue);
  };

  const handleSkintype = (event: any) => {
    setSkintype(event.target.value);
  };

  const handleSkinprototype = (value: string) => {
    setskinTone(value);
  };

  const handleWeight = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const numericValue = parseInt(value, 10);
    setWeight(numericValue);
  };

  const handleHeight = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const numericValue = parseInt(value, 10);
    setHeight(numericValue);
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUnitChange = () => {
    setIsLbInChecked(!isLbInChecked);

    if (!isLbInChecked) {
      setWeightUnit(WeightUnit.LB);
      setHeightUnit(HeightUnit.INCH);
    } else {
      setWeightUnit(WeightUnit.KG);
      setHeightUnit(HeightUnit.CM);
    }
  };

  const updateProfile = () => {
    const payload: Partial<IProfile> = {
      ...profileData,
      firstName,
      lastName,
      gender,
      birthYear,
      skinType,
      skinTone,
      weight,
      weightUnit,
      height,
      heightUnit,
      smokingStatus,
    };
    UpdateUser(payload).then((response) => {
      const Profilefetch = response.data;
      dispatch(saveProfile(Profilefetch));
      showToast(ToastType.Success, 'Profile updated successfully!');
      navigate(APP_ROUTES.vital_signs);
    });
  };

  const genders = ['male', 'female'];

  useEffect(() => {
    GetUser()
      .then((response) => {
        const Profilefetch = response.data;
        setEmail(Profilefetch.email);
        setfirstName(Profilefetch.firstName);
        setlastName(Profilefetch.lastName);
        setGender(Profilefetch.gender);
        setbirthYear(Profilefetch.birthYear);
        setSkintype(Profilefetch.skinType);
        setskinTone(Profilefetch.skinTone);
        setWeight(Profilefetch.weight);
        setWeightUnit(Profilefetch.weightUnit);
        setHeight(Profilefetch.height);
        setHeightUnit(Profilefetch.heightUnit);
        if (profileData?.smokingStatus !== undefined && profileData?.smokingStatus !== null) {
          setSmokingStatus(profileData.smokingStatus as SmokingStatus);
        }
        setIsLbInChecked(Profilefetch.weightUnit === WeightUnit.LB);
        dispatch(saveProfile(Profilefetch));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BottomNavigationWrapper>
      <>
        {loading ? (
          <Processing customText={translate('general.loading')} />
        ) : (
          <div className="container lg:w-3/5 sm:w-4/5 w-full mx-auto sm:px-0 px-3 pt-8 relative ">
            <div className="py-4">
              <div className="overflow-y-auto h-auto">
                <div className="flex flex-col justify-normal gap-1 mb-3">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Email')}
                  </label>
                  <Input type="text" id="email" name="email" value={email} onChange={handleEmail} isDisabled={true} />
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-3">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.First_Name')}
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      value={firstName}
                      onChange={setfirstName}
                      isDisabled={false}
                    />

                    <div className="absolute right-3.5 top-1 text-small-icon">
                      <SquarePenIcon />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-3">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Last_Name')}
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      value={lastName}
                      onChange={setlastName}
                      isDisabled={false}
                    />
                    <div className="absolute right-3.5 top-1 text-small-icon">
                      <SquarePenIcon />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-6">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Gender')}
                  </label>
                  <TabSelection
                    tabs={genders.map((gender, index) => ({
                      key: index,
                      label: translate(`gender.${gender}`),
                      value: gender.toUpperCase(),
                    }))}
                    onChange={(selected) => setGender(selected)}
                    value={gender}
                  />
                </div>
                <div className="flex flex-col justify-normal gap-3">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Birth_Year')}
                  </label>

                  <div className="flex items-center gap-3 mb-4 sm:overflow-hidden overflow-scroll" id="radio_scroll_x">
                    <select
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 text-base font-inter font-normal text-[#9E9E9E] leading-[16.8px] focus:outline-none focus:ring-1 focus:ring-[#E8C300] focus:border-[#E8C300] sm:text-sm"
                      name="birthYear"
                      id="birthYear"
                      onChange={handleBirthChange}
                      value={birthYear}
                    >
                      {yearRange.map((option, index) => (
                        <option key={index} value={option?.toString()}>
                          {option?.toString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-5 pb-5">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Skin_Type')}
                  </label>

                  <div className="flex items-center gap-3">
                    <select
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 text-base font-inter font-normal text-[#9E9E9E] leading-[16.8px] focus:outline-none focus:ring-1 focus:ring-[#E8C300] focus:border-[#E8C300] sm:text-sm"
                      name="skinType"
                      id="skinType"
                      onChange={handleSkintype}
                      value={skinType}
                    >
                      {skinTypes.map((skinTypeOption, index) => (
                        <option key={index} value={skinTypeOption.value}>
                          {translate(`skinTypes.${skinTypeOption.label}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-5 pb-5">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Smoking_Status')}
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 text-base font-inter font-normal text-[#9E9E9E] leading-[16.8px] focus:outline-none focus:ring-1 focus:ring-[#E8C300] focus:border-[#E8C300] sm:text-sm"
                      name="smokingStatus"
                      id="smokingStatus"
                      onChange={handleSmokingStatus}
                      value={smokingStatus !== null ? smokingStatus : ''}
                    >
                      <option value="" disabled>
                        Select Smoking Status
                      </option>
                      {smokingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col justify-normal gap-3 mb-5 pb-5">
                  <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Skin_Prototype')}
                  </label>
                  <div className="flex items-center gap-2 leading-[41px]">
                    {colorOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer border py-2 px-3 rounded-[5px] w-14 text-center ${
                          skinTone === option.value ? 'text-white peer-checked:cursor-default' : 'text-[#9E9E9E]'
                        }`}
                        style={{ backgroundColor: `${option.color}` }}
                        onClick={() => handleSkinprototype(option.value)}
                      >
                        <p>{option.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-normal gap-3 mb-3">
                  <div className="flex justify-between items-end">
                    <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                      {translate('editable.Weight')}
                    </label>
                    <div className="flex items-center">
                      <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                        {translate('editable.kg/cm')}&nbsp;
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={isLbInChecked}
                          onChange={handleUnitChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:bg-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-secondary-color outline-none border after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary-color"></div>
                        <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                          &nbsp; {translate('editable.lb/in')};
                        </label>
                      </label>
                    </div>
                  </div>

                  <div className="">
                    <select
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 text-base font-inter font-normal text-[#9E9E9E] leading-[16.8px] focus:outline-none focus:ring-1 focus:ring-[#E8C300] focus:border-[#E8C300] sm:text-sm"
                      name="weight"
                      id="weight"
                      onChange={handleWeight}
                      value={weight}
                    >
                      {weightRange.map((option, index) => (
                        <option key={index} value={option?.toString()}>
                          {option + (isLbInChecked ? WeightUnit.LB : WeightUnit.KG)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col justify-normal gap-3 mb-3">
                  <div className="flex justify-between">
                    <label className="font-inter font-semibold sm:text-base text-sm text-[#7F7F7F]">
                      {translate('editable.Height')};
                    </label>
                  </div>

                  <div className="">
                    <select
                      className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 text-base font-inter font-normal text-[#9E9E9E] leading-[16.8px] focus:outline-none focus:ring-1 focus:ring-[#E8C300] focus:border-[#E8C300] sm:text-sm"
                      name="height"
                      id="height"
                      onChange={handleHeight}
                      value={height}
                    >
                      {heightRange.map((option, index) => (
                        <option key={index} value={option?.toString()}>
                          {option + (isLbInChecked ? HeightUnit.INCH : HeightUnit.CM)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h5 className="font-inter font-bold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.BMI:')}
                    <span className="text-secondary-color"></span>
                  </h5>
                  <h5 className="font-inter font-bold sm:text-base text-sm text-[#7F7F7F]">
                    {translate('editable.Your_Category:')}
                    <span className="text-[#E8C300]"></span>
                  </h5>
                </div>
                <div className="pb-20">
                  <button
                    className="w-full bg-secondary-color border border-secondary-color text-white py-3 px-4 rounded-full font-inter font-semibold text-base leading-6 -tracking-[0.25px] hover:bg-white hover:text-secondary-color hover:border-secondary-color hover:border transition duration-300"
                    onClick={updateProfile}
                  >
                    {translate('editable.Save_Changes')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </BottomNavigationWrapper>
  );
};

export default Profile;
