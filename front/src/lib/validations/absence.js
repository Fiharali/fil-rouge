import { z } from "zod";

export const addAbsence = z.object({

    date: z.string().min(1, { message: "Please select a date" }),
    type: z.string().min(1, { message: "Please select a type" }),
    file: z.instanceof(File).nullable().optional().or(z.string().min(1, { message: "Please select a file" }))
});

export const addNewAbsence = z.object({

    date: z.string().min(1, { message: "Please select a date" }),
    type: z.string().min(1, { message: "Please select a type" }),
    user: z.string().min(1, { message: "Please select a user" }),
   
});

export const changeStatus = z.object({
    status: z.string().min(1, { message: "Please select a status" }), 
});

export const addNewAbsenceWithCalendar = z.object({

    //date: z.string().min(1, { message: "Please select a date" }),
    type: z.string().min(1, { message: "Please select a type" }),
    user: z.string().min(1, { message: "Please select a user" }),

});