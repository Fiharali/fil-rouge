import { z } from "zod";

export const addLevel = z.object({
    name: z.string().min(4),

});