export declare const DATABASE_NAMES: {
    STATE: string;
    USERS: string;
    TEMPERATURE: string;
};
export declare function getEnvironmentVariable(variable: string): string;
export declare function toStringWithPadding(value: number, digits: number): string;
export declare function getStartOfToday(timezone: string): number;
