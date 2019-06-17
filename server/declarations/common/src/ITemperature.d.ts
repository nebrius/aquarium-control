export interface ITemperatureSample {
    low: number;
    high: number;
    time: number;
}
export interface ITemperature {
    temperatures: ITemperatureSample[];
}
