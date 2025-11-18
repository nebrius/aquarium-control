import { Value } from "typebox/value";

import { setOverride } from "@/db/db.ts";
import { type Override, OverrideSchema } from "@aquarium/shared";

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

  const isValid = Value.Check(OverrideSchema, body);

  if (!isValid) {
    console.error(
      "Invalid override payload",
      Value.Errors(OverrideSchema, body),
    );

    return new Response(JSON.stringify({ error: "Invalid override payload" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const override = body as Override;
  setOverride(override);

  return Response.json({ message: "OK" });
}
