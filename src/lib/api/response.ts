import { NextResponse } from "next/server";

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function jsonError(message: string, status = 400, errors?: Record<string, string[]>) {
  return NextResponse.json(
    { success: false, message, errors },
    { status },
  );
}

export function zodErrorResponse(error: { flatten: () => { fieldErrors: Record<string, string[]> } }) {
  const { fieldErrors } = error.flatten();
  return jsonError("Validation failed", 422, fieldErrors);
}
