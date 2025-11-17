export interface ITestingEntry {
    time: number;
    ph: number;
    ammonia: number;
    nitrites: number;
    nitrates: number;
}
export interface ITesting {
    history: ITestingEntry[];
}
export declare const testingValidationSchema: any;
