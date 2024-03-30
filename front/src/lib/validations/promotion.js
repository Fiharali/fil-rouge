import { z } from "zod";

export const addPromotion = z.object({
    name: z.string().min(4),

});