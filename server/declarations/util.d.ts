export declare const DATABASE_NAMES: {
    STATE: string;
    TEMPERATURE: string;
    CLEANING: string;
    TESTING: string;
    CONFIG: string;
};
export declare function getEnvironmentVariable(variable: string): string;
export declare function toStringWithPadding(value: number, digits: number): string;
export declare function getStartOfToday(timezone: string): number;
