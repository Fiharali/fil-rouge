import { z } from "zod";

export const addClassName = z.object({
    name: z.string().min(4),

});