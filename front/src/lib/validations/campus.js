import { z } from "zod";

export const addCampus = z.object({

    name: z.string().min(4),

});