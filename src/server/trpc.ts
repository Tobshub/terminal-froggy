import { initTRPC } from "@trpc/server";

// Avoid exporting the entire t-object
const t = initTRPC.create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
