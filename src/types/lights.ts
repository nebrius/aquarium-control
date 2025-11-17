export type LightState = "off" | "blue" | "white";

export type ScheduleEntry = {
  hour: number;
  minute: number;
  fade: number;
};

export type Schedule = {
  offToBlue: ScheduleEntry;
  blueToWhite: ScheduleEntry;
  whiteToBlue: ScheduleEntry;
  blueToOff: ScheduleEntry;
};

export type Override = {
  enabled: boolean;
  state: LightState;
};
