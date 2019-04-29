export interface IScheduleEntry {
    id?: string;
    name: string;
    type: 'dynamic' | 'manual';
    state: 'day' | 'night' | 'off';
    details: IDynamicScheduleEntry | IManualScheduleEntry;
}
export interface IDynamicScheduleEntry {
    event: 'sunrise' | 'sunset';
}
export interface IManualScheduleEntry {
    hour: number;
    minute: number;
}
export interface IConfig {
    mode: 'program' | 'override';
    overrideState: 'day' | 'night' | 'off';
    schedule: IScheduleEntry[];
}
export declare const configValidationSchema: any;
