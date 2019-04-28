export interface ITemperatureSample {
    deviceId: string;
    low: number;
    high: number;
    time: number;
}
export interface ITemperature {
    temperatures: ITemperatureSample[];
}
