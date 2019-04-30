import { IConfig } from './common/common';
export declare function init(cb: (err: Error | undefined) => void): void;
export declare function getConfig(deviceId: string, cb: (err: Error | undefined, config: IConfig | undefined, isConfigUpToDate: boolean | undefined) => void): void;
export declare function setConfig(deviceId: string, config: IConfig, cb: (err: Error | undefined) => void): void;
