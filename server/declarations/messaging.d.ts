import { IConfig } from './common/common';
export declare function init(cb: (err: Error | undefined) => void): void;
export declare function getConfig(cb: (err: Error | undefined, config: IConfig | undefined, isConfigUpToDate: boolean | undefined) => void): void;
export declare function setConfig(config: IConfig, cb: (err: Error | undefined) => void): void;
