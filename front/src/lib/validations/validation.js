import { z } from "zod";


export  const userEditProfile = z.object({
    first_name: z.string().min(4),
    last_name: z.string().min(4),
    email: z.string().email(),
    number: z.string().refine(value => /^\d{10,}$/.test(value), {
        message: 'Number must be an integer with  length of 10 digits'
    }),

});



export const addUser = z.object({

    first_name: z.string().min(4),
    last_name: z.string().min(4),
    email: z.string().email(),
    number: z.string().refine(value => /^\d{10,}$/.test(value), {
        message: 'Number must be an integer with  length of 10 digits'
    }),
    password: z.string().min(8),
    level_id: z.string()
        .min(1, { message: "Please select a level" }),
    class_name_id: z.string()
        .min(1, { message: "Please select a class name" }),
    promotion_id: z.string()
        .min(1, { message: "Please select a promotion" }),
    campus_id: z.string()
        .min(1, { message: "Please select a campus" }),
    city_id: z.string()
        .min(1, { message: "Please select a city" }),
    role: z.array(z.string())
        .min(1, { message: "Please select at least one role" }),

});


