import { z } from "zod";

export const addAbsence = z.object({

    // date: z.string()
    //     .min(1, { message: "Please select a date" }),
    type: z.string()
        .min(1, { message: "Please select a type" }),
    // file: z.string()
    //     .min(1, { message: "Please select a file" }),


});