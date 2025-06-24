import { ImageFormat } from '@binah/wasm';
export declare enum HealthMonitorMessage {
    HEALTH_MONITOR_HEART_RATE = 1,
    HEALTH_MONITOR_BREATHING_RATE = 3,
    HEALTH_MONITOR_SDNN = 4,
    HEALTH_MONITOR_STRESS_LEVEL = 5,
    HEALTH_MONITOR_REPORT = 100
}
export declare enum ConfidenceLevel {
    UNKNOWN = 0,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}
export declare type VitalSignsResults = {
    results: VitalSigns;
    type?: VitalSignType[];
};
export declare type VitalSign<T> = {
    value?: T;
} & any;
export declare type HeartRateSign = VitalSign<number> & {
    confidenceLevel?: ConfidenceLevel;
};
export declare type OxygenSaturationSign = VitalSign<number>;
export declare type BreathingRateSign = VitalSign<number> & {
    confidenceLevel?: ConfidenceLevel;
};
export declare type SDNNSign = VitalSign<number> & {
    confidenceLevel?: ConfidenceLevel;
};
export declare type StressLevelSign = VitalSign<number>;
export declare type StressIndexSign = VitalSign<number>;
export declare type BloodPressureSign = VitalSign<BloodPressureValue>;
export declare type RRISign = VitalSign<RRIValue[]> & {
    confidenceLevel?: ConfidenceLevel;
};
export declare type MeanRRISign = VitalSign<number> & {
    confidenceLevel?: ConfidenceLevel;
};
export declare type RmssdSign = VitalSign<number>;
export declare type Sd1Sign = VitalSign<number>;
export declare type Sd2Sign = VitalSign<number>;
export declare type PRQSign = VitalSign<number> & {
    confidenceLevel?: ConfidenceLevel;
};
export declare type PnsIndexSign = VitalSign<number>;
export declare type PnsZoneSign = VitalSign<number>;
export declare type SnsIndexSign = VitalSign<number>;
export declare type SnsZoneSign = VitalSign<number>;
export declare type WellnessLevelSign = VitalSign<number>;
export declare type WellnessIndexSign = VitalSign<number>;
export declare type LfhfSign = VitalSign<number>;
export declare type HemoglobinSign = VitalSign<number>;
export declare type HemoglobinA1cSign = VitalSign<number>;
export declare type VitalSigns = {
    heartRate?: HeartRateSign;
    oxygenSaturation?: OxygenSaturationSign;
    breathingRate?: BreathingRateSign;
    sdnn?: SDNNSign;
    stressLevel?: StressLevelSign;
    stressIndex?: StressIndexSign;
    bloodPressure?: BloodPressureSign;
    rri?: RRISign;
    meanRri?: MeanRRISign;
    rmssd?: RmssdSign;
    sd1?: Sd1Sign;
    sd2?: Sd2Sign;
    prq?: PRQSign;
    pnsIndex?: PnsIndexSign;
    pnsZone?: PnsZoneSign;
    snsIndex?: SnsIndexSign;
    snsZone?: SnsZoneSign;
    wellnessLevel?: WellnessLevelSign;
    wellnessIndex?: WellnessIndexSign;
    lfhf?: LfhfSign;
    hemoglobin?: HemoglobinSign;
    hemoglobinA1c?: HemoglobinA1cSign;
};
export declare type RRIValue = {
    timestamp: number;
    interval: number;
};
export declare type BloodPressureValue = {
    systolic: number;
    diastolic: number;
};
export declare enum StressLevel {
    UNKNOWN = 0,
    LOW = 1,
    NORMAL = 2,
    MILD = 3,
    HIGH = 4,
    EXTREME = 5
}
export declare enum WellnessLevel {
    UNKNOWN = 0,
    LOW = 1,
    NORMAL = 2,
    HIGH = 3
}
export declare enum SnsZone {
    UNKNOWN = 0,
    LOW = 1,
    NORMAL = 2,
    HIGH = 3
}
export declare enum PnsZone {
    UNKNOWN = 0,
    LOW = 1,
    NORMAL = 2,
    HIGH = 3
}
export declare enum VitalSignType {
    HEART_RATE = "heartRate",
    OXYGEN_SATURATION = "oxygenSaturation",
    BREATHING_RATE = "breathingRate",
    SDNN = "sdnn",
    STRESS_LEVEL = "stressLevel",
    STRESS_INDEX = "stressIndex",
    RRI = "rri",
    MEAN_RRI = "meanRri",
    BLOOD_PRESSURE = "bloodPressure",
    RMSSD = "rmssd",
    SD1 = "sd1",
    SD2 = "sd2",
    PRQ = "prq",
    PNS_INDEX = "pnsIndex",
    PNS_ZONE = "pnsZone",
    SNS_INDEX = "snsIndex",
    SNS_ZONE = "snsZone",
    WELLNESS_INDEX = "wellnessIndex",
    WELLNESS_LEVEL = "wellnessLevel",
    LFHF = "lfhf",
    HEMOGLOBIN = "hemoglobin",
    HEMOGLOBIN_A1C = "hemoglobinA1c"
}
export interface Size {
    height: number;
    width: number;
}
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface Scale {
    width: number;
    height: number;
}
export interface FrameData {
    buffer: ArrayBufferLike;
    size: Size;
    timestamp: number;
    format: ImageFormat;
}
export declare enum AlertDomains {
    ALERT_DOMAIN_DEVICE = 0,
    ALERT_DOMAIN_CAMERA = 1000,
    ALERT_DOMAIN_LICENSE = 2000,
    ALERT_DOMAIN_MEASUREMENT = 3000,
    ALERT_DOMAIN_VITAL_SIGNS = 4000,
    ALERT_DOMAIN_RECORDER = 5000,
    ALERT_DOMAIN_SESSION = 6000,
    ALERT_DOMAIN_INITIALIZATION = 7000
}
export interface AlertData {
    code: number;
    domain?: AlertDomains;
}
export declare enum ImageValidity {
    VALID = 0,
    INVALID_DEVICE_ORIENTATION = 1,
    INVALID_ROI = 2,
    TILTED_HEAD = 3,
    FACE_TOO_FAR = 4,
    UNEVEN_LIGHT = 5
}
