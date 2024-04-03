import { z } from "zod";

export const addAbsence = z.object({

    date: z.string(),
    type: z.string()
        .min(1, { message: "Please select a type" }),
    // file: z.string()
    //     .min(1, { message: "Please select a file" }),


});