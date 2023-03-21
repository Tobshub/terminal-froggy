import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  echo: procedure.input(z.string().optional()).query(({ input }) => {
    return "From the Server: " + input;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
