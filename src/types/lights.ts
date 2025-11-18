import { type Static, Type } from "typebox";

const LightStateSchema = Type.Union([
  Type.Literal("off"),
  Type.Literal("blue"),
  Type.Literal("white"),
]);

export type LightState = Static<typeof LightStateSchema>;

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
  state: LightStateSchema,
});

export type Override = Static<typeof OverrideSchema>;
