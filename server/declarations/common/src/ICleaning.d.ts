export interface ICleaningEntry {
    time: number;
    bioFilterReplaced: boolean;
    mechanicalFilterReplaced: boolean;
    spongeReplaced: boolean;
}
export interface ICleaning {
    history: ICleaningEntry[];
}
