import { lowYellow, normalGreen, veryHigh, mild, sadAngry, notAvailable } from '@app/assets/images';

export const heartCalculateEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= 60) {
    return lowYellow;
  }
  if (value > 60 && value <= 100) {
    return normalGreen;
  }
  if (value > 100 && value <= 240) {
    return veryHigh;
  }
};

export const heartCalculateText = (value: number, translate: (key: string) => string) => {
  if (value <= 60) {
    return translate('missing_general.very_low');
  }
  if (value > 60 && value <= 100) {
    return translate('missing_general.normal');
  }
  if (value > 100 && value <= 240) {
    return translate('missing_general.very_high');
  }
};

export const breathCalculateEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value < 12) {
    return lowYellow;
  }
  if (value >= 12 && value <= 20) {
    return normalGreen;
  }
  if (value > 20 && value <= 40) {
    return sadAngry;
  }
};

export const breathCalculateText = (value: number, translate: (key: string) => string) => {
  if (value < 12) {
    return translate('missing_general.breath_calculate.very_low');
  }
  if (value >= 12 && value <= 20) {
    return translate('missing_general.breath_calculate.normal');
  }
  if (value > 20 && value <= 40) {
    return translate('missing_general.breath_calculate.very_high');
  }
};

export const prqCalculateEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= 4) {
    return lowYellow;
  }
  if (value > 4 && value <= 5) {
    return normalGreen;
  }
  if (value > 5) {
    return sadAngry;
  }
};

export const prqCalculateText = (value: number, translate: (key: string) => string) => {
  if (value <= 4) {
    return translate('missing_general.prq_calculate.very_low');
  }
  if (value > 4 && value <= 5) {
    return translate('missing_general.prq_calculate.normal');
  }
  if (value > 5) {
    return translate('missing_general.prq_calculate.very_high');
  }
};

export const BloodPressureCalculateEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= 100) {
    return lowYellow;
  }
  if (value > 100 && value <= 129) {
    return normalGreen;
  }
  if (value > 129) {
    return veryHigh;
  }
};

export const bloodText = (value: number, translate: (key: string) => string) => {
  if (value <= 100) {
    return translate('missing_general.blood_pressure_calculate.very_low');
  }
  if (value > 100 && value <= 129) {
    return translate('missing_general.blood_pressure_calculate.normal');
  }
  if (value > 129) {
    return translate('missing_general.blood_pressure_calculate.very_high');
  }
};

export const stressLevelCalculateEmoji = (value: number) => {
  if (value === 1) {
    return normalGreen;
  }
  if (value === 2) {
    return lowYellow;
  }
  if (value === 3) {
    return mild;
  }
  if (value === 4) {
    return sadAngry;
  }
  if (value >= 5) {
    return veryHigh;
  }
  if (value === undefined) {
    return notAvailable;
  }
};

export const normalizedStressIndexCalculateEmoji = (value: number) => {
  if (value === 1) {
    return normalGreen;
  }
  if (value === 2) {
    return lowYellow;
  }
  if (value === 3) {
    return mild;
  }
  if (value === 4) {
    return sadAngry;
  }
  if (value >= 5) {
    return veryHigh;
  }
  if (value === undefined) {
    return notAvailable;
  }
};

export const normalizedStressIndexCalculateText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.stress_level_calculate.low');
  }
  if (value === 2) {
    return translate('missing_general.stress_level_calculate.normal');
  }
  if (value === 3) {
    return translate('missing_general.stress_level_calculate.mild');
  }
  if (value === 4) {
    return translate('missing_general.stress_level_calculate.high');
  }
  if (value >= 5) {
    return translate('missing_general.stress_level_calculate.very_high');
  }
};

export const stressIndexCalculateEmoji = (value: number) => {
  if (value >= 0 && value <= 80) {
    return normalGreen; // Low
  }
  if (value >= 81 && value <= 150) {
    return lowYellow; // Normal
  }
  if (value >= 151 && value <= 300) {
    return mild; // Mild
  }
  if (value >= 301 && value <= 600) {
    return sadAngry; // High
  }
  if (value >= 601) {
    return veryHigh; // Very High
  }
  if (value === undefined || value === null) {
    return notAvailable; // Not Available
  }
};

export const stressLevelCalculateText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.stress_level_calculate.low');
  }
  if (value === 2) {
    return translate('missing_general.stress_level_calculate.normal');
  }
  if (value === 3) {
    return translate('missing_general.stress_level_calculate.mild');
  }
  if (value === 4) {
    return translate('missing_general.stress_level_calculate.high');
  }
  if (value >= 5) {
    return translate('missing_general.stress_level_calculate.very_high');
  }
};

export const getStressIndexText = (value: number, translate: (key: string) => string) => {
  if (value >= 0 && value <= 80) {
    return translate('missing_general.stress_level_calculate.low'); // Low
  }
  if (value >= 81 && value <= 150) {
    return translate('missing_general.stress_level_calculate.normal'); // Normal
  }
  if (value >= 151 && value <= 300) {
    return translate('missing_general.stress_level_calculate.mild'); // Mild
  }
  if (value >= 301 && value <= 600) {
    return translate('missing_general.stress_level_calculate.high'); // High
  }
  if (value >= 601) {
    return translate('missing_general.stress_level_calculate.very_high'); // Very High
  }
};

export const checkWellnessLevel = (wellnessLevel: number, translate: (key: string) => string) => {
  if (wellnessLevel === 1) {
    return translate('missing_general.check_wellness_level.low');
  }
  if (wellnessLevel === 2) {
    return translate('missing_general.check_wellness_level.medium');
  }
  if (wellnessLevel === 3) {
    return translate('missing_general.check_wellness_level.high');
  }
};

export const pnsLevelText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.pns_level.low');
  }
  if (value === 2) {
    return translate('missing_general.pns_level.medium');
  }
  if (value === 3) {
    return translate('missing_general.pns_level.high');
  }
};

export const pnsLevelEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value === 1) {
    return veryHigh;
  }
  if (value === 2) {
    return mild;
  }
  if (value === 3) {
    return normalGreen;
  }
};

export const pnsIndexEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= -1) {
    return sadAngry;
  }
  if (value > -1 && value <= 1) {
    return lowYellow;
  }
  if (value >= 1) {
    return normalGreen;
  }
};

export const pnsIndexText = (value: number, translate: (key: string) => string) => {
  if (value <= -1) {
    return translate('missing_general.pns_index.low');
  }
  if (value > -1 && value <= 1) {
    return translate('missing_general.pns_index.normal');
  }
  if (value >= 1) {
    return translate('missing_general.pns_index.high');
  }
};

export const rmssdEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= 25) {
    return sadAngry;
  }
  if (value > 25 && value <= 43) {
    return lowYellow;
  }
  if (value >= 43) {
    return normalGreen;
  }
};

export const rmssdText = (value: number, translate: (key: string) => string) => {
  if (value <= 25) {
    return translate('missing_general.rmssd.low');
  }
  if (value > 25 && value <= 43) {
    return translate('missing_general.rmssd.normal');
  }
  if (value >= 43) {
    return translate('missing_general.rmssd.high');
  }
};

export const meanRRiEmooji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= 600) {
    return sadAngry;
  }
  if (value > 600 && value <= 1000) {
    return lowYellow;
  }
  if (value >= 1000) {
    return normalGreen;
  }
};

export const meanRRiText = (value: number, translate: (key: string) => string) => {
  if (value <= 600) {
    return translate('missing_general.mean_rri.low');
  }
  if (value > 600 && value <= 1000) {
    return translate('missing_general.mean_rri.normal');
  }
  if (value >= 1000) {
    return translate('missing_general.mean_rri.high');
  }
};

export const sd1Emoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= 100) {
    return lowYellow;
  }
  if (value >= 100) {
    return normalGreen;
  }
};

export const sd1Text = (value: number, translate: (key: string) => string) => {
  if (value <= 100) {
    return translate('missing_general.sd1.low');
  }
  if (value >= 100) {
    return translate('missing_general.sd1.normal');
  }
};

export const snsIndexEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= -1) {
    return normalGreen;
  }
  if (value > -1 && value <= 1) {
    return lowYellow;
  }
  if (value >= 1) {
    return sadAngry;
  }
};

export const snsIndexText = (value: number, translate: (key: string) => string) => {
  if (value <= -1) {
    return translate('missing_general.sns_index.low');
  }
  if (value > -1 && value <= 1) {
    return translate('missing_general.sns_index.normal');
  }
  if (value >= 1) {
    return translate('missing_general.sns_index.high');
  }
};

export const snsZoneText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.sns_zone.low');
  }
  if (value === 2) {
    return translate('missing_general.sns_zone.medium');
  }
  if (value === 3) {
    return translate('missing_general.sns_zone.high');
  }
};

export const snsZoneEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value === 1) {
    return normalGreen;
  }
  if (value === 2) {
    return lowYellow;
  }
  if (value === 3) {
    return veryHigh;
  }
};

export const sdnnEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value <= 50) {
    return lowYellow;
  }
  if (value > 50) {
    return normalGreen;
  }
};

export const sdnnText = (value: number, translate: (key: string) => string) => {
  if (value <= 50) {
    return translate('missing_general.sdnn.low');
  }
  if (value > 50) {
    return translate('missing_general.sdnn.normal');
  }
};

export const hemoglobinEmoji = (value: number | undefined, gender: 'male' | 'female' | null) => {
  if (value === undefined) {
    return notAvailable;
  }

  if (gender === 'male') {
    if (value >= 14 && value <= 18) {
      return normalGreen;
    }
    if (value < 14) {
      return sadAngry;
    }
  } else if (gender === 'female') {
    if (value >= 12 && value <= 16) {
      return normalGreen;
    }
    if (value < 12) {
      return sadAngry;
    }
  }

  return sadAngry;
};

export const hemoglobinText = (value: number, translate: (key: string) => string, gender: 'male' | 'female' | null) => {
  if (gender === 'male') {
    if (value >= 14 && value <= 18) {
      return translate('missing_general.hemoglobin.normal');
    }
    if (value < 14) {
      return translate('missing_general.hemoglobin.low');
    }
  } else if (gender === 'female') {
    if (value >= 12 && value <= 16) {
      return translate('missing_general.hemoglobin.normal');
    }
    if (value < 12) {
      return translate('missing_general.hemoglobin.low');
    }
  }
};

export const lowHemoglobinEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value === 1) {
    return normalGreen;
  }

  if (value === 2) {
    return mild;
  }

  if (value === 3) {
    return veryHigh;
  }
};

export const lowHemoglobinRiskText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.lowHemoglobinRisk.low');
  }

  if (value === 3) {
    return translate('missing_general.lowHemoglobinRisk.high');
  }
};

export const HighTotalCholesterolRiskEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value === 1) {
    return normalGreen;
  }

  if (value === 2) {
    return mild;
  }

  if (value === 3) {
    return veryHigh;
  }
};

export const HighTotalCholesterolRiskText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.highTotalCholesterolRisk.low');
  }

  if (value === 2) {
    return translate('missing_general.highTotalCholesterolRisk.medium');
  }

  if (value === 3) {
    return translate('missing_general.highTotalCholesterolRisk.high');
  }
};

export const HighHemoglobinA1CRiskEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }

  if (value === 1) {
    return normalGreen;
  }

  if (value === 2) {
    return mild;
  }

  if (value === 3) {
    return veryHigh;
  }
};

export const highHemoglobinA1CRiskText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.highHemoglobinA1CRisk.low');
  }

  if (value === 2) {
    return translate('missing_general.highHemoglobinA1CRisk.medium');
  }

  if (value === 3) {
    return translate('missing_general.highHemoglobinA1CRisk.high');
  }
};
export const highGlucoseRiskEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value === 1) {
    return normalGreen;
  }

  if (value === 3) {
    return veryHigh;
  }
};

export const highGlucoseRiskText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.highFastingGlucoseRisk.low');
  }

  if (value === 3) {
    return translate('missing_general.highFastingGlucoseRisk.high');
  }
};

export const highBloodPressureRiskEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }

  if (value === 1) {
    return normalGreen;
  }
  if (value === 2) {
    return veryHigh;
  }
};

export const highBloodPressureRiskText = (value: number, translate: (key: string) => string) => {
  if (value === 2) {
    return translate('missing_general.highBloodPressureRisk.high');
  }

  if (value === 1) {
    return translate('missing_general.highBloodPressureRisk.low');
  }
};

export const hypertensionRiskText = (value: number, translate: (key: string) => string) => {
  if (value === 2) {
    return translate('missing_general.hypertensionRisk.high');
  }

  if (value === 1) {
    return translate('missing_general.hypertensionRisk.low');
  }
};

export const hypertensionRiskEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }

  if (value === 1) {
    return normalGreen;
  }
  if (value === 2) {
    return veryHigh;
  }
};

export const diabetesRiskEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }

  if (value === 1) {
    return normalGreen;
  }

  if (value === 2) {
    return mild;
  }

  if (value === 3) {
    return veryHigh;
  }
};

export const diabetesRiskText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.diabetesRisk.low');
  }

  if (value === 2) {
    return translate('missing_general.diabetesRisk.medium');
  }

  if (value === 3) {
    return translate('missing_general.diabetesRisk.high');
  }
};

export const hba1cEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  if (value === 1) {
    return normalGreen;
  }

  if (value === 2) {
    return mild;
  }

  if (value === 3) {
    return veryHigh;
  }
};

export const hba1cText = (value: number, translate: (key: string) => string) => {
  if (value === 1) {
    return translate('missing_general.hba1c.low');
  }

  if (value === 2) {
    return translate('missing_general.hba1c.medium');
  }

  if (value === 3) {
    return translate('missing_general.hba1c.high');
  }
};

export const lfhfRatioEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }
  const valueFixed = parseFloat(value?.toFixed(2));

  if (valueFixed >= 0.27 && valueFixed <= 0.38) {
    return normalGreen;
  }

  if (valueFixed < 0.27) {
    return sadAngry;
  }

  if (valueFixed > 0.38) {
    return veryHigh;
  }
};

export const lfhfRatioText = (value: number, translate: (key: string) => string) => {
  const valueFixed = parseFloat(value?.toFixed(2));

  if (valueFixed >= 0.27 && valueFixed <= 0.38) {
    return translate('missing_general.lfhf.normal');
  }

  if (valueFixed < 0.27) {
    return translate('missing_general.lfhf.low');
  }

  if (valueFixed > 0.38) {
    return translate('missing_general.lfhf.high');
  }
};

export const respirationEmoji = (value: number) => {
  if (value === undefined) {
    return notAvailable;
  }

  if (value >= 95 && value <= 100) {
    return normalGreen;
  }

  if (value < 95) {
    return sadAngry;
  }
};

export const respirationText = (value: number, translate: (key: string) => string) => {
  if (value >= 95 && value <= 100) {
    return translate('missing_general.respiration.normal');
  }

  if (value < 95) {
    return translate('missing_general.respiration.low');
  }
};

export const getConfidenceColor = (value: number) => {
  if (value === 0) {
    return 'bg-gray-200';
  }

  if (value === 1) {
    return 'bg-red-300';
  }
  if (value === 2) {
    return 'bg-orange-300';
  }
  if (value === 3) return 'bg-[#a7e96a]';
};

export const getConfidenceText = (value: number, translate: (key: string) => string) => {
  if (value === 0) {
    translate('not_data.NA');
  }
  if (value === 1) {
    return translate('missing_general.confidence.low');
  }

  if (value === 2) {
    return translate('missing_general.confidence.medium');
  }

  if (value === 3) {
    return translate('missing_general.confidence.high');
  }
};
