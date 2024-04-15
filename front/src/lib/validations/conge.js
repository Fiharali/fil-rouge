import { z } from "zod";

export const addConge= z.object({

    from: z.string().min(1, { message: "Please select a date from" }),
    to: z.string().min(1, { message: "Please select a date to" }),
});

export const addNewConge = z.object({
    from: z.string().min(1, { message: "Please select a date from" }),
    to: z.string().min(1, { message: "Please select a date to" }),
    status: z.string().min(1, { message: "Please select a status" }), 
    user: z.string().min(1, { message: "Please select a user" }),
});

export const changeStatus = z.object({
    status: z.string().min(1, { message: "Please select a status" }), 
});