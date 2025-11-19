import { type Static, Type } from 'typebox';

const cleaningTypeSchema = Type.Union([
  Type.Literal('none'),
  Type.Literal('clean'),
  Type.Literal('replace'),
]);

export type CleaningType = Static<typeof cleaningTypeSchema>;

export const CleaningRecordSchema = Type.Object({
  date: Type.String({ format: 'date-time' }),
  sponge: cleaningTypeSchema,
  nitrazorb: cleaningTypeSchema,
  organic: cleaningTypeSchema,
});

export type CleaningRecordEntry = Static<typeof CleaningRecordSchema>;

const LightStateSchema = Type.Union([
  Type.Literal('off'),
  Type.Literal('blue'),
  Type.Literal('white'),
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
