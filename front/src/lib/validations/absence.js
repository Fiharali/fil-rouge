import { z } from "zod";

export const addAbsence = z.object({

    date: z.string().min(1, { message: "Please select a date" }),
    type: z.string().min(1, { message: "Please select a type" }),
    file: z.instanceof(File).nullable().optional().or(z.string().min(1, { message: "Please select a file" }))



});