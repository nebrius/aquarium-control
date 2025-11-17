export interface ITemperatureEntry {
    low: number;
    high: number;
    time: number;
}
export interface ITemperature {
    history: ITemperatureEntry[];
}
