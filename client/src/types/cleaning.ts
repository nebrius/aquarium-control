import { type Static, Type } from "typebox";

const cleaningTypeSchema = Type.Union([
  Type.Literal("none"),
  Type.Literal("clean"),
  Type.Literal("replace"),
]);

export type CleaningType = Static<typeof cleaningTypeSchema>;

export const CleaningRecordSchema = Type.Object({
  date: Type.String({ format: "date-time" }),
  sponge: cleaningTypeSchema,
  nitrazorb: cleaningTypeSchema,
  organic: cleaningTypeSchema,
});

export type CleaningRecordEntry = Static<typeof CleaningRecordSchema>;
