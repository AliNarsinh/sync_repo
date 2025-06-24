import React, { useEffect, useState } from 'react';
import diseaseTranslatedData from '@app/config/i18n/en.json';
import { isArray, isEmpty } from 'lodash';
import { useLocalization } from '@app/hooks';

interface IStaticScreenComponent {
  diseaseName?: string;
}

const generateJSXFromArray = (inputArray: Array<string>, translate: any, diseaseName: string) => {
  let jsxOutput = '';
  let isPreviousLi = false;
  let isNextLi = false;

  for (let currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
    const currentKey = inputArray[currentIndex];
    const translatedValue = translate(`skinive_diseases.${diseaseName}.${currentKey}`);
    if (currentKey.includes('heading') || currentKey.includes('title')) {
      jsxOutput += `<h2>${translatedValue}</h2>`;
    } else if (currentKey.includes('desc')) {
      jsxOutput += `<p>${translatedValue}</p>`;
    } else if (currentKey.includes('li')) {
      if (currentIndex === 0 || !isPreviousLi) {
        jsxOutput += '<ul>';
      }

      jsxOutput += `<li>${translatedValue}</li>`;

      if (currentIndex === inputArray.length - 1 || !isNextLi) {
        jsxOutput += '</ul>';
      }

      isPreviousLi = true;
      isNextLi = currentIndex < inputArray.length - 1 && inputArray[currentIndex + 1].includes('li');
    }
  }

  return jsxOutput;
};

const extractDiseaseData = (diseaseName: string) => {
  const diseases = diseaseTranslatedData['skinive_diseases'];
  const jsonDataArray = Object.keys(diseases);
  let diseasesDataJson: any = {};
  if (isArray(jsonDataArray) && !isEmpty(jsonDataArray)) {
    jsonDataArray?.map((eachKey) => {
      if (eachKey === diseaseName) {
        diseasesDataJson = (diseases as any)[eachKey as any];
      }
      return eachKey;
    });
  }
  const diseaseDataTranslationKeys: any = [];
  const diseaseDataJsonKey = Object.keys(diseasesDataJson);
  if (isArray(diseaseDataJsonKey) && !isEmpty(diseaseDataJsonKey)) {
    diseaseDataJsonKey?.map((eachKey) => {
      diseaseDataTranslationKeys.push(eachKey);
      return eachKey;
    });
  }
  return diseaseDataTranslationKeys;
};

const StaticScreenComponent = (props: IStaticScreenComponent) => {
  const { diseaseName } = props;
  const { translate } = useLocalization();
  const [staticScreenJsx, setStaticScreenJsx] = useState('');
  useEffect(() => {
    if (translate) {
      const diseaseDataKey = extractDiseaseData(diseaseName as any);
      const jsxData = generateJSXFromArray(diseaseDataKey, translate, diseaseName as any);
      setStaticScreenJsx(jsxData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translate]);

  if (!staticScreenJsx.length) {
    return <></>;
  }

  return <div className="content-page" dangerouslySetInnerHTML={{ __html: staticScreenJsx }}></div>;
};

export default StaticScreenComponent;
