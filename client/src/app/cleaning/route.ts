import {
  type CleaningRecordEntry,
  CleaningRecordSchema,
} from "@aquarium/shared";
import { Value } from "typebox/value";

import { addCleaningRecord } from "@/db/db.ts";

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const isValid = Value.Check(CleaningRecordSchema, body);

  if (!isValid) {
    console.error(
      "Invalid cleaning record payload",
      Value.Errors(CleaningRecordSchema, body),
    );

    return new Response(
      JSON.stringify({ error: "Invalid cleaning record payload" }),
      {
        status: 400,
        headers: { "content-type": "application/json" },
      },
    );
  }

  const record = body as CleaningRecordEntry;
  addCleaningRecord(record);

  return Response.json({ message: "OK" });
}
