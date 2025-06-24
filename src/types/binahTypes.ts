export enum AppErrorCode {
  MEASUREMENT_CODE_FACE_UNDETECTED_ERROR = 80001,
}

export enum InfoType {
  NONE,
  INSTRUCTION,
  SUCCESS,
}

export interface InfoData {
  type: InfoType;
  message?: string;
}

export enum VideoReadyState {
  HAVE_ENOUGH_DATA = 4,
}

export enum BinnahTypes {
  HEART_RATE = 'pulseRate',
  HEART_AGE = 'heartAge',
  PRQ = 'prq',
  BREATHING_RATE = 'respirationRate',
  BLOOD_PRESSURE = 'bloodPressure',
  HEMOGLOBIN = 'hemoglobin',
  HYPERTENSION_RISK = 'hypertensionRisk',
  HEMOGLOBINALC = 'hemoglobinA1c',
  CONFIDENCE_LEVEL = 'ConfidenceLevel',
  HIGH_BLOOD_PRESSURE_RISK = 'highBloodPressureRisk',
  ASCVD_RISK = 'ascvdRisk',
  HIGH_FASTING_GLUCOSE_RISK = 'highFastingGlucoseRisk',
  HIGH_HEMOGLOBIN_A1C_RISK = 'highHemoglobinA1CRisk',
  HIGH_TOTAL_CHOLESTEROL_RISK = 'highTotalCholesterolRisk',
  LOW_HEMOGLOBIN_RISK = 'lowHemoglobinRisk',
  NORMALIZED_STRESS_INDEX = 'normalizedStressIndex',
  STRESS_LEVEL = 'stressLevel',
}

export interface BinnahProps {
  data: {
    title: string;
    value: {
      value: any;
      confidenceLevel: any;
    };
  };
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
