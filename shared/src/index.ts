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

export const ScheduleEntrySchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  hour: Type.Integer({ minimum: 0, maximum: 255 }),
  minute: Type.Integer({ minimum: 0, maximum: 255 }),
  fade: Type.Integer({ minimum: 0, maximum: 255 }),
  colorId: Type.Number(),
});

export type ScheduleEntry = Static<typeof ScheduleEntrySchema>;

export const ColorSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  h: Type.Integer({ minimum: 0, maximum: 360 }),
  s: Type.Integer({ minimum: 0, maximum: 100 }),
  v: Type.Integer({ minimum: 0, maximum: 100 }),
});

export type Color = Static<typeof ColorSchema>;

export const CreateColorSchema = Type.Object({
  name: Type.String(),
  h: Type.Integer({ minimum: 0, maximum: 360 }),
  s: Type.Integer({ minimum: 0, maximum: 100 }),
  v: Type.Integer({ minimum: 0, maximum: 100 }),
});

export type CreateColor = Static<typeof CreateColorSchema>;

export const UpdateColorsSchema = Type.Object({
  add: Type.Array(CreateColorSchema),
  edit: Type.Array(ColorSchema),
  delete: Type.Array(Type.Number()),
});

export type UpdateColors = Static<typeof UpdateColorsSchema>;

export const OverrideSchema = Type.Object({
  enabled: Type.Boolean(),
  colorId: Type.Number(),
});

export type Override = Static<typeof OverrideSchema>;
