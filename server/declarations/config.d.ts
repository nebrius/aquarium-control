export interface IServerConfig {
    latitude: number;
    longitude: number;
    timezone: string;
    dayPin: number | string;
    nightPin: number | string;
}
export declare const APP_DIR = "/home/pi/.aquarium-control";
export declare function init(): Promise<void>;
export declare function getServerConfig(): IServerConfig;
