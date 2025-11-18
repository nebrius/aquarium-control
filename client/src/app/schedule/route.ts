import { type Schedule, ScheduleSchema } from "@aquarium/shared";
import { Value } from "typebox/value";

import { setSchedule } from "@/db/db.ts";

export async function PUT(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const isValid = Value.Check(ScheduleSchema, body);

  if (!isValid) {
    console.error(
      "Invalid schedule payload",
      Value.Errors(ScheduleSchema, body),
    );

    return new Response(JSON.stringify({ error: "Invalid schedule payload" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const schedule = body as Schedule;
  setSchedule(schedule);

  return Response.json({ message: "OK" });
}
