import { type Static, Type } from "typebox";

export type LightState = "off" | "blue" | "white";

const ScheduleEntrySchema = Type.Object({
  hour: Type.Integer({ minimum: 0, maximum: 255 }),
  minute: Type.Integer({ minimum: 0, maximum: 255 }),
  fade: Type.Integer({ minimum: 0, maximum: 255 }),
});

export type ScheduleEntry = Static<typeof ScheduleEntrySchema>;

export const ScheduleSchema = Type.Object({
  offToBlue: ScheduleEntrySchema,
  blueToWhite: ScheduleEntrySchema,
  whiteToBlue: ScheduleEntrySchema,
  blueToOff: ScheduleEntrySchema,
});

export type Schedule = Static<typeof ScheduleSchema>;

export const OverrideSchema = Type.Object({
  enabled: Type.Boolean(),
  state: Type.Union([
    Type.Literal("off"),
    Type.Literal("blue"),
    Type.Literal("white"),
  ]),
});

export type Override = Static<typeof OverrideSchema>;

export const CleaningRecordSchema = Type.Object({
  date: Type.String({ format: "date-time" }),
  sponge: Type.Boolean(),
  nitrazorb: Type.Boolean(),
  organic: Type.Boolean(),
});

export type CleaningRecordEntry = Static<typeof CleaningRecordSchema>;
