import { LogAlgoMeasurements, SdkLoggerType } from './logger.types';
import { HealthMonitorSessionMode } from '../session/session.types';
import { RRILogger } from './rri-logger';
export declare class LoggerBuilder {
    static getAlgoMeasurementLogger(mode: HealthMonitorSessionMode): Promise<LogAlgoMeasurements>;
    static getSdkLogger(mode: HealthMonitorSessionMode): Promise<SdkLoggerType>;
    static getRRILogger(): RRILogger;
}
